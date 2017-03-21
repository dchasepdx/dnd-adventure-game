import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  orcDead: state.orcDead
});

class RoomNavigation extends Component {
  render() {
    let win = <button value={'win'} onClick={this.props.updateCurrentRoom}>You Win! Reset Game</button>;
    let nav = (
              <div>
                <button value={this.props.currentRoom.n} onClick={this.props.updateCurrentRoom}>North</button>
                <button value={this.props.currentRoom.s} onClick={this.props.updateCurrentRoom}>South</button>
              </div>
              );
    return (
      <div>
        {this.props.currentRoom.treasure ? win : nav}
      </div>
    );
  }
}

export default connect(mapStateToProps)(RoomNavigation);
