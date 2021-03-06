import React, { Component } from 'react';
import Swipeable from 'react-swipeable'

class Entrie extends Component {

    constructor(props) {
      super(props);

      this.onSwipeLeftListener = this._onSwipeLeftListener.bind(this);
      this.onSwipeRightListener = this._onSwipeRightListener.bind(this);
      this.onSwipeDownListener = this._onSwipeUpListener.bind(this);
      this.onSwipeUpListener = this._onSwipeDownListener.bind(this);
      this.onTapListener = this._onTapListener.bind(this);
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
    _onTapListener(e){
      console.log("tap");
      this.props.onTap();
    }

    render() {
      return (
        <Swipeable 
          nodeName="div"
          className={this.props.className}
          trackMouse={true}
          style={{touchAction: 'none'}}
          onSwipedLeft={this.onSwipeLeftListener} 
          onSwipedRight={this.onSwipeRightListener} 
          onSwipedDown={this.onSwipeDownListener} 
          onSwipedUp={this.onSwipeUpListener}
          onTap={this.onTapListener}>
            <img className="avatar" src={this.props.imageUrl} role="presentation" />
        </Swipeable>
      );
    }
}

export default Entrie;