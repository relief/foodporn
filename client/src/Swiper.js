// app.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const data = [
  {
    url: 'https://1.bp.blogspot.com/_qEbjiFbQWGM/TCBVlN3mkYI/AAAAAAAADCM/7CjYqUHwbgY/s1600/workshop_modell_0126.jpg',
  }, {
    url: 'http://static.stylemagazin.hu/medias/29280/Nem-ehezik-a-Women-of-the-Year-legjobb-modell-dijara-eselyes-szepseg_32fc7c86954a8847610499a0fc7261e2.jpg',    
  }, {
    url: 'http://w1nd.cc/promo/347.jpg'
  }, {
    url: 'http://hircsarda.hu/wp-content/uploads/2016/03/orban1.jpeg'
  }
];

class Swiper extends Component {
    render() {

        const images = data.map((img, idx) => {
          const buddyStyle = idx == 0 ? { display: 'block' } : {};
          const imageStyle = {
            display: 'block',
            backgroundImage: 'url(' + img.url + ')'
          } 
          return (
            <div key={idx} className="buddy" style={buddyStyle}>
              <div className="avatar" style={imageStyle} >
              </div>    
            </div>
          )
        });

        console.log(data);
        console.log(images);

        const divStyle = {
          display: 'block',
        };

        return (
            <div id="container">
              {images}              
            </div>
        );
    }
}

export default Swiper;