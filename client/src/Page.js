import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import ReactMixin from 'react-mixin';
import Swiper from "./Swiper";
import Feedback from "./Feedback";
//import styles
import 'weui';
import 'react-weui/lib/react-weui.min.css';

class Page extends Component {
    mixins: [TimerMixin]

    state = {
        location: 'Vancouver',
        showFeedback: false
    }

    componentDidMount() {
        this.setTimeout(
          () => {
            this.setState({ showFeedback: true })
          },
          60000
        );
    }

    hideFeedback = () => {
        this.setState({ showFeedback: false })
    }

    changeLocation = (location) => {
        this.setState({ location })
    }
    
    render() {
        return (
          <div className="full-page">
{/*             <LocationPicker location={this.state.location} 
                            changeLocation={this.changeLocation} /> */}
            <Feedback show={this.state.showFeedback}
                      hideFeedback={this.hideFeedback} />
            <Swiper filter={0} />
          </div>
        );
    }
}

ReactMixin(Page.prototype, TimerMixin);
export default Page;