import React from 'react';

export default function Controls(props) {
  let fight;
  fight = <button onClick={props.combatRound}>fight!</button>;
  return (
  <div>
    {fight}
  </div>
  );
}
