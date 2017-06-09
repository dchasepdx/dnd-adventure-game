import React, { Component } from 'react';
import {connect} from 'react-redux';

import {divStyleFlex} from '../styles';

const mapStateToProps = state => ({
  orcDead: state.orcDead,
  currentRoom: state.currentRoom,
});

class CurrentRoom extends Component {

  render() {
    const alive = <p>{this.props.currentRoom.init}. {this.props.currentRoom.aliveEnemy}</p>;
    const dead = <p>{this.props.currentRoom.init}. {this.props.currentRoom.deadEnemy}</p>;
    return (
      <div style={divStyleFlex}>
        {this.props.orcDead && dead}
        {!this.props.orcDead && alive}
      </div>
    );
  }
}

export default connect(mapStateToProps)(CurrentRoom);
