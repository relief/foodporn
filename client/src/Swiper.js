// app.js

import React, { Component } from 'react';
import Client from "./Client";

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
            entries: entries
          });
        });
      }
    };

    render() {

        const images = this.state.entries.map((img, idx) => {
          const buddyStyle = idx === 0 ? { display: 'block' } : {};
          const imageStyle = {
            display: 'block',
            backgroundImage: 'url(' + img.image_url + ')'
          } 
          return (
            <div key={idx} className="buddy" style={buddyStyle}>
              <div className="avatar" style={imageStyle} >
              </div>    
            </div>
          )
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