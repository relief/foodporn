// app.js

import React, { Component } from 'react';
import Client from "./Client";
import Entrie from "./Entrie";
import DetailPage from "./DetailPage";
import { Toast } from 'react-weui';
import "./stylesheets/swiper.css";

const NUM_PRELOAD_IMG = 3;
class Swiper extends Component {
    state = {
      showLoading: true,
      showDetailPage: false,
      entries: [],
      loadList: [],
      likeList: []
    }

    constructor(props) {
      super(props);

      this.handleSearchChange(this.props.filter);
    }

    handleSearchChange = (filter) => {
      if (filter === "") {
        console.log('empty');
      } else {
        Client.fetchEntries(filter, entries => {
          this.setState({
            entries: entries,
            current: 0,
            showLoading: false,
            loadList: [0, 1, 2, entries.length - 1, entries.length - 2],
          });
        });
      }
    }

    animation = (current, rotateLeft, rotateRight) => {
      this.setState({ current, rotateLeft, rotateRight });
      this.expandLoadList();
    }

    prevEntrie = () => {
      const current = this.state.current;
      if (current === 0)
        this.animation(this.state.entries.length - 1, -1, current)
      else
        this.animation(current - 1, -1, current)
    }

    nextEntrie = () => {
      const current = this.state.current;
      if (current === this.state.entries.length - 1)
        this.animation(0, current, -1)
      else
        this.animation(current + 1, current, -1)
    }

    className = (idx) => {
      switch (idx) {
        case this.state.current:
          return "buddy on"
        case this.state.rotateLeft:
          return "buddy rotate-left";
        case this.state.rotateRight:
          return "buddy rotate-right"
        default:
          return "buddy"
      }
    }

    showDetailPage = () => {
      this.setState({ showDetailPage: true })
    }

    hideDetailPage = () => {
      this.setState({ showDetailPage: false })
    }

    expandLoadList = () => {
      const current = this.state.current;
      const length = this.state.entries.length;
      const loadList = this.state.loadList;

      let left = current - NUM_PRELOAD_IMG;
      if (left < 0) left += length;
      let right = current + NUM_PRELOAD_IMG;
      if (right >= length) right -= length;

      if (!loadList.includes(left))
        loadList.push(left);
      if (!loadList.includes(right))
        loadList.push(right);
    }

    onLikeEntrie = (entrie_id) => {
      const likeList = this.state.likeList;
      likeList.push(entrie_id);
      this.setState({ likeList });
    }

    render() {
        const currentEntrie = this.state.entries[this.state.current]
        if (currentEntrie) {
          currentEntrie.restaurant_name = currentEntrie.restaurant_name.replace(/ &amp;.*/, '')
        } 

        return (
            <div className="swiper">
                <Toast icon="loading" show={this.state.showLoading}>
                  Loading...
                </Toast>
                {currentEntrie &&
                  <h3
                    className="title"
                    onClick={this.showDetailPage}
                  >
                    {currentEntrie.restaurant_name}
                  </h3>
                }
                {this.state.loadList.map((idx) => 
                    <Entrie key={idx}
                            className={this.className(idx)}
                            prevEntrie={this.prevEntrie}
                            nextEntrie={this.nextEntrie}
                            imageUrl={this.state.entries[idx].url + 'o.jpg'}
                            onTap={this.showDetailPage} />
                )}
                <DetailPage img={currentEntrie}
                            show={this.state.showDetailPage}
                            hideDetailPage={this.hideDetailPage}
                            onLike={this.onLikeEntrie}
                            likeList={this.state.likeList} />
            </div>
            
        );
    }
}

export default Swiper;