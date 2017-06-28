// app.js

import React, { Component } from 'react';
import Client from "./Client";
import Entrie from "./Entrie";

class Swiper extends Component {

    constructor(props) {
      super(props);
      this.state = {
        entries: [],
        filter: props.filter
      };

      this.handleSearchChange(this.props.filter);
    }

    handleSearchChange = (filter) => {
      if (filter === "") {
        console.log('empty');
      } else {
        Client.fetchEntries(filter, entries => {
          this.setState({
            entries: entries,
            current: 0
          });
        });
      }
    }

    animation = (current, rotateLeft, rotateRight) => {
      this.setState({ current, rotateLeft, rotateRight });
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

    render() {
        return (
          <div id="container">
            {this.state.entries.map((img, idx) =>
               <Entrie key={idx}
                       className={this.className(idx)}
                       prevEntrie={this.prevEntrie}
                       nextEntrie={this.nextEntrie}
                       imageUrl={img.image_url} />
            )}
          </div>
        );
    }
}

export default Swiper;