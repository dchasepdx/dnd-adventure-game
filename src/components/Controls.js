import React from 'react';
import {connect} from 'react-redux';

const mapstateToProps = state => ({
  orcsTurn: state.orcsTurn
});


function Controls(props) {
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
export default connect(mapstateToProps)(Controls);
