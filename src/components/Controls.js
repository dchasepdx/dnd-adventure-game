import React from 'react';
import {connect} from 'react-redux';
import {resetState} from '../actions';
import {buttonStyles, divStyleFlex} from '../styles';

const mapstateToProps = state => ({
  orcsTurn: state.orcsTurn,
  combatOver: state.combatOver,
  currentRoom: state.currentRoom,
  orcDead: state.orcDead,
  playerDead: state.playerDead,
});


function Controls(props) {
  /*let win = <button style={buttonStyles} value={'win'} onClick={this.props.updateCurrentRoom}>You Win! Reset Game</button>;
  let nav = (
            <div>
              <button style={buttonStyles} value={this.props.currentRoom.n} onClick={this.props.updateCurrentRoom}>North</button>
              <button style={buttonStyles} value={this.props.currentRoom.s} onClick={this.props.updateCurrentRoom}>South</button>
            </div>
            );*/
  return (
  <div className='col-1-3' style={divStyleFlex}>
    {(!props.orcsTurn && !props.combatOver) &&
      <div>
        <button style={buttonStyles} onClick={props.combatRound}>fight!</button>
        <button style={buttonStyles} onClick={props.backToPrevRoom}>Run Away!</button>
      </div>
    }

    {(props.combatOver && props.orcDead) &&
        <button style={buttonStyles} value={props.currentRoom.win} onClick={props.updateCurrentRoom}>next</button>
    }
    {(props.combatOver && props.playerDead) && 
      <button style={buttonStyles} onClick={() => props.dispatch(resetState())}>Restart</button>
    }

  </div>
  );
}
export default connect(mapstateToProps)(Controls);
