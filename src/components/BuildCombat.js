import React, {Component} from 'react';
import diceRoller from './diceRoller';
import Controls from './Controls';
import Turns from './Turns';
import DeathCheck from './DeathCheck';
import {connect} from 'react-redux';

import {
        setEnemyHealth, 
        setPlayerHealth, 
        updateTurns, 
        orcsTurn,

       } from '../actions';

const mapStateToProps = state => ({
  enemyHealth: state.enemyHealth,
  youHealth: state.youHealth,
  turns: state.turns,
  chars: state.chars,
  orcsTurn: state.orcsTurn,
  deathCheck: state.deathCheck,
  combatOver: state.combatOver,
  currentRoom: state.currentRoom

});

class BuildCombat extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.fight = this.fight.bind(this);
    this.damage = this.damage.bind(this);
    this.combatRound = this.combatRound.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && nextProps.combatOver) {
      clearTimeout(this.enemyTimer);
      clearTimeout(this.enemyTurnTimer);
    }
  }

  damage(char, turn) {
    let charHealth;
    if (char === 'Stan') {
      charHealth = this.props.enemyHealth;
      let roll = diceRoller(6, 1) + this.props.chars[char].atk;
      charHealth -= roll;
      turn.enemyHealth = charHealth;
      turn.damage = roll;
      if (turn.enemyHealth > 0) {
        this.props.dispatch(setEnemyHealth(charHealth));
      } else {
        this.props.dispatch(setEnemyHealth(charHealth, {orcDead: true, deathCheck: true, orcsTurn: false, combatOver: true}));
      }

    } else {
      charHealth = this.props.youHealth;
      let roll = diceRoller(6, 1) + this.props.chars[char].atk;
      charHealth -= roll;
      turn.youHealth = charHealth;
      turn.damage = roll;
      if (turn.youHealth > 0) {
        this.props.dispatch(setPlayerHealth(charHealth));
      } else {
        this.props.dispatch(setPlayerHealth(charHealth, {playerDead: true, deathCheck: true, orcsTurn: false, combatOver: true}));
      }
    }
  }

  fight(char, enemy) {
    let turn = {whoTurn: char};
    let roll = diceRoller(20, 1) + this.props.chars[char].atk;
    if (roll >= this.props.chars[enemy].ac) {
      turn.hit = true;
      turn.roll = roll;
      this.damage(char, turn);
    } else {
      turn.hit = false;
      turn.roll = roll;
    }
    turn.turn = (this.props.turns.length + 1).toString();
    this.props.dispatch(updateTurns(turn));
  }

  combatRound() {
    this.fight('Stan', 'Orc');
    this.enemyTurnTimer = setTimeout(() => {
      this.props.dispatch(orcsTurn());
    }, 500);
    this.enemyTimer = setTimeout(() => {
      this.props.dispatch(orcsTurn());
      this.fight('Orc', 'Stan');
    }, 2000);
  };

  render() {
    return (
      <div> 
        <Turns  />

        {this.props.deathCheck && 
          <DeathCheck />
        }

        {this.props.orcsTurn && 
          <p>Enemy's turn</p>
        }

          <Controls 
            prevRoom={this.props.prevRoom}
            backToPrevRoom={this.props.backToPrevRoom}
            orcsTurn={this.props.orcsTurn} 
            combatRound={this.combatRound} 
            updateCurrentRoom={this.props.updateCurrentRoom}
          />
      </div>
    );
  }
}
export default connect(mapStateToProps)(BuildCombat);
