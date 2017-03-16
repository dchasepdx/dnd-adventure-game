import React, { Component } from 'react';

class DeathCheck extends Component {
  render() {
    let lastTurn;
    let deathNotice;
    if(this.props.turns) {
      lastTurn = this.props.turns[this.props.turns.length - 1];
      deathNotice = <p>Turn {lastTurn.turn}: {lastTurn.whoTurn} is victorious!</p>;
    }
    return (
      <div>
        {deathNotice}
      </div>
    );
  }
}

export default DeathCheck;
