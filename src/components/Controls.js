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
  return (
  <div style={divStyleFlex}>
    {(!props.orcsTurn && !props.combatOver) &&
      <button style={buttonStyles} onClick={props.combatRound}>fight!</button>
    }

    {(!props.orcsTurn && !props.combatOver) &&
      <button style={buttonStyles} onClick={props.backToPrevRoom}>Run Away!</button>
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
