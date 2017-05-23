import React, {Component} from 'react';
import {connect} from 'react-redux';
import {} from '../styles';

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
          <p key={turn.turn}>
            Turn {turn.turn}: You hit! You rolled a {turn.roll} and did {turn.damage} damage. 
          </p>
      );
    } else {
      return (
          <p key={turn.turn}>
            Turn {turn.turn}: You rolled a {turn.roll}. You missed
          </p>
      );
    }
  }

  // rollResult() {
  //   let turns = this.props.turns;
  //   let currentTurn = turns[turns.length - 1];
  //   if (currentTurn.whoTurn === 'Stan') {
  //     return this.playerHitOrMiss(currentTurn);
  //   } else {
  //     return this.enemyHitOrMiss(currentTurn);
  //   }
  // }
  
  compare(a, b) {
    return b.turn - a.turn;
  }

  render() {
    
    return (
      <div className='col-1-3'>
        {this.props.turns.sort(this.compare).map(t => {
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
