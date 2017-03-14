import React, { Component } from 'react';

class RoomNavigation extends Component {
  render() {
    return (
      <div>
        <button value={this.props.currentRoom.n} onClick={this.props.updateCurrentRoom}>North</button>
        <button value={this.props.currentRoom.s} onClick={this.props.updateCurrentRoom}>South</button>
      </div>
    );
  }
}

export default RoomNavigation;
