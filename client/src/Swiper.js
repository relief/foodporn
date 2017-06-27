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

    prevEntrie = () => {
      const current = this.state.current;
      if (current === 0)
        this.setState({ current: this.state.entries.length - 1 });
      else
        this.setState({ current: current - 1 })
    }

    nextEntrie = () => {
      const current = this.state.current;
      if (current === this.state.entries.length - 1)
        this.setState({ current: 0 });
      else
        this.setState({ current: current + 1 })
    }

    render() {
        const images = this.state.entries.map((img, idx) => {
            return <Entrie key={idx}
                           className={"buddy " + (idx === this.state.current ? "on" : "")}
                           prevEntrie={this.prevEntrie}
                           nextEntrie={this.nextEntrie}
                           imageUrl={img.image_url} />
        });

        console.log(images);

        return (
          <div id="container">
            {images}
          </div>
        );
    }
}

export default Swiper;