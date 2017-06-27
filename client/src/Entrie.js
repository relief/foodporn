import React, { Component } from 'react';
import Swipe from 'react-swipe-component';

class Entrie extends Component {

    constructor(props) {
      super(props);

      this.onSwipeLeftListener = this._onSwipeLeftListener.bind(this);
      this.onSwipeRightListener = this._onSwipeRightListener.bind(this);
      this.onSwipeDownListener = this._onSwipeUpListener.bind(this);
      this.onSwipeUpListener = this._onSwipeDownListener.bind(this);
      this.onSwipeListener = this._onSwipeListener.bind(this);
    }

    _onSwipeLeftListener(){
      console.log("Swiped left");
      this.props.prevEntrie();
    }
    _onSwipeRightListener(){
      console.log("Swiped right");
      this.props.nextEntrie();
    }
    _onSwipeUpListener(){
      console.log("Swiped Up");
    }
    _onSwipeDownListener() {
      console.log("Swiped down");
    }
    _onSwipeListener(e){
        // if (e[1]===0) console.log("Swipe x: "+e[0]);
        // else if (e[0]===0) console.log("Swipe y: "+e[1]);
    }

    render() {
      const imageStyle = {
        backgroundImage: 'url(' + this.props.imageUrl + ')'
      }
      return (
        <Swipe 
          nodeName="div"
          className={this.props.className}
          mouseSwipe={false}
          onSwipedLeft={this.onSwipeLeftListener} 
          onSwipedRight={this.onSwipeRightListener} 
          onSwipedDown={this.onSwipeDownListener} 
          onSwipedUp={this.onSwipeUpListener}
          onSwipe={this.onSwipeListener}>
            
            <div className="avatar" style={imageStyle} >
            </div>
        </Swipe>
      );
    }
}

export default Entrie;