import React from 'react';

export default function Controls(props) {
  let fight;
  fight = <button onClick={() => props.fight('You', 'Orc')}>fight!</button>;
  return (
  <div>
    {fight}
  </div>
  );
}
