import React from 'react';
import {connect} from 'react-redux';
import {resetState} from '../reducer';

const mapstateToProps = state => ({
  orcsTurn: state.orcsTurn,
  combatOver: state.combatOver,
  currentRoom: state.currentRoom,
  orcDead: state.orcDead,
  playerDead: state.playerDead,
});


function Controls(props) {
  return (
  <div>
    {(!props.orcsTurn && !props.combatOver) &&
      <button onClick={props.combatRound}>fight!</button>
    }

    {(!props.orcsTurn && !props.combatOver) &&
      <button onClick={props.backToPrevRoom}>Run Away!</button>
    }

    {(props.combatOver && props.orcDead) &&
      <button value={props.currentRoom.win} onClick={props.updateCurrentRoom}>next</button>
    }

    {(props.combatOver && props.playerDead) && 
      <button onClick={() => props.dispatch(resetState())}>Restart</button>
    }
  </div>
  );
}
export default connect(mapstateToProps)(Controls);
