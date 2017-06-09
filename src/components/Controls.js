import React from 'react';
import {connect} from 'react-redux';
import {resetState} from '../actions';
import {buttonStyles, divStyleFlex} from '../styles';

const mapstateToProps = state => ({
  orcsTurn: state.orcsTurn,
  fighting: state.fighting,
  currentRoom: state.currentRoom,
  orcDead: state.orcDead,
  playerDead: state.playerDead,
});

function Controls(props) {
  return (
  <div className='col-1-3' style={divStyleFlex}>
    {(!props.orcsTurn && props.fighting) &&
      <div>
        <button style={buttonStyles} onClick={props.combatRound}>fight!</button>
        <button style={buttonStyles} onClick={props.backToPrevRoom}>Run Away!</button>
      </div>
    }

    {(!props.fighting && props.orcDead) &&
      <button style={buttonStyles} value={props.currentRoom.win} onClick={props.updateCurrentRoom}>next</button>
    }
    {(!props.fighting && props.playerDead) && 
      <button style={buttonStyles} onClick={() => props.dispatch(resetState())}>Restart</button>
    }

  </div>
  );
}
export default connect(mapstateToProps)(Controls);
