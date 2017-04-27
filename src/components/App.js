import React, { Component } from 'react';
import BuildCombat from './BuildCombat.js';
// import adventureZones from './adventureZones';
import CurrentRoom from './CurrentRoom';
import RoomNavigation from './RoomNavigation';
import CharStats from './CharStats';
import DeathCheck from './DeathCheck';
// import SomeContent from './SomeContent';
import Turns from './Turns';

import { connect } from 'react-redux';
import {
  setCurrentRoom,
  backToPrevRoom,
  roomNavError,
  resetState
} from '../actions';
import { divStyleFlex, oneThird } from '../styles';

const mapStateToProps = state => {
  return {
    currentRoom: state.currentRoom,
    prevRoom: state.prevRoom,
    navError: state.navError
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.updateCurrentRoom = this.updateCurrentRoom.bind(this);
    this.backToPrevRoom = this.backToPrevRoom.bind(this);
  }

  backToPrevRoom(e) {
    e.preventDefault();
    this.props.dispatch(backToPrevRoom());
  }

  updateCurrentRoom(e) {
    e.preventDefault();
    if (!e.target.value) {
      this.props.dispatch(roomNavError());
      // this.setState({navError: true});
    } else if (e.target.value === 'win') {
      console.log(e.target.value);
      this.props.dispatch(resetState());
    } else {
      this.props.dispatch(setCurrentRoom(e.target.value));
    }
  }

  render() {
    return (
      <div style={{ maxWidth: 940, margin: '0 auto' }}>
        {this.props.navError &&
          <div style={divStyleFlex}><p>You can't go that way</p></div>}
        <CurrentRoom currentRoom={this.props.currentRoom} />

        <div className="grid grid-pad">
          <CharStats style={oneThird} />
          <Turns />
          {this.props.deathCheck && <DeathCheck />}
          {!this.props.currentRoom.enemy &&
            <RoomNavigation
              currentRoom={this.props.currentRoom}
              updateCurrentRoom={this.updateCurrentRoom}
            />}
          {this.props.currentRoom.enemy &&
            <BuildCombat
              prevRoom={this.props.prevRoom}
              backToPrevRoom={this.backToPrevRoom}
              updateCurrentRoom={this.updateCurrentRoom}
            />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
