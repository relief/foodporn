import React, { Component } from 'react';
import Swiper from "./Swiper";
import LocationPicker from "./LocationPicker";
//import styles
import 'weui';
import 'react-weui/lib/react-weui.min.css';

class Page extends Component {

    state = {
        location: 'Vancouver',
    }

    changeLocation = (location) => {
        this.setState({ location })
    }
    
    render() {
        return (
          <div>
            <LocationPicker location={this.state.location} 
                            changeLocation={this.changeLocation} />
            <Swiper filter={0} />
          </div>
        );
    }
}

export default Page;