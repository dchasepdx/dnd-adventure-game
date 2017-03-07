import React from 'react';
import chars from './chars';
import Controls from './Controls.js';

function App(props) {
  let charArray = [];
  for (let key in props.chars) {
    if(props.chars.hasOwnProperty(key)) {
      charArray.push(props.chars[key]);
    }
  };
  const stats = charArray.map(char => {
    return <li key={char.id}>{char.id} has {char.ac} AC and +{char.atk} to hit</li>
  });
  return (
    <div>
      <ul>
        {stats}
      </ul>
      
      <Controls chars={chars} />
    </div>
    );
}

export default App;