import React, { Component } from 'react';
import {connect} from 'react-redux';

const MapStateToProps = state => ({
  chars: state.chars,
  youHealth: state.youHealth
});

class CharStats extends Component {
  render() {
    const player = this.props.chars.stan;

    return (
      <div className='col-1-3'>
        <h2>Character info</h2>
        <p>name: {player.id}</p>
        <p>ac: {player.ac}</p>
        <p>attack: {player.atk}</p>
        <p>health: {this.props.youHealth}</p>
      </div>
    );
  }
}

export default connect(MapStateToProps)(CharStats);
