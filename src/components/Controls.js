import React from 'react';

export default function Controls(props) {
  return (
  <div>
    {!props.orcsTurn && 
      <button onClick={props.combatRound}>fight!</button>
    }
    {!props.orcsTurn && 
      <button onClick={props.backToPrevRoom}>Run Away!</button>
    }
  </div>
  );
}
