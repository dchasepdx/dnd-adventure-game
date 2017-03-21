import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  turns: state.turns
});

class Turns extends Component {

  enemyHitOrMiss(turn) {
    if (turn.hit) {
      return (
        <div key={turn.turn}>
          <p>
            Turn {turn.turn}: The orc smacks you and does {turn.damage} damage. 
          </p>
        </div>
      );
    } else {
      return (
        <div key={turn.turn}>
          <p>
            Turn {turn.turn}: The orc misses
          </p>
        </div>
      );
    }
  }
  
  playerHitOrMiss(turn) {
    if (turn.hit) {
      return (
        <div key={turn.turn}>
          <p>
            Turn {turn.turn}: You hit! You rolled a {turn.roll} and did {turn.damage} damage. 
          </p>
        </div>
      );
    } else {
      return (
        <div key={turn.turn}>
          <p>
            Turn {turn.turn}: You missed
          </p>
        </div>
      );
    }
  }

  rollResult() {
    let turns = this.props.turns;
    let currentTurn = turns[turns.length - 1];
    if (currentTurn.whoTurn === 'Stan') {
      return this.playerHitOrMiss(currentTurn);
    } else {
      return this.enemyHitOrMiss(currentTurn);
    }
  }

  render() {
    return (
      <div>
        {this.props.turns.map(t => {
          if (t.whoTurn === 'Stan') {
            return this.playerHitOrMiss(t);
          } else {
            return this.enemyHitOrMiss(t);
          }
        })}
      </div>
    );  
  }
}

export default connect(mapStateToProps)(Turns);
