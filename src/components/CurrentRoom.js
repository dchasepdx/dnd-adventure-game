import React, { Component } from 'react';

class CurrentRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <div>
        <p>{this.props.currentRoom.init}</p>
      </div>
    );
  }
}

export default CurrentRoom;
