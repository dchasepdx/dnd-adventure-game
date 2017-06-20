import React, {Component} from 'react';
import diceRoller from '../data/diceRoller';
import Controls from './Controls';
import {connect} from 'react-redux';

import {
        setEnemyHealth, 
        setPlayerHealth, 
        updateTurns, 
        playerTurn,
        changeFighting,

       } from '../actions';

const mapStateToProps = state => ({
  enemyHealth: 1000,
  youHealth: state.youHealth,
  turns: state.turns,
  chars: state.chars,
  playerTurn: state.playerTurn,
  deathCheck: state.deathCheck,
  combatOver: state.combatOver,
  currentRoom: state.currentRoom,
  fighting: state.fighting,

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

  componentDidMount() {
    if (!this.props.deathCheck) {
      this.props.dispatch(changeFighting());
      this.props.dispatch(playerTurn());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && !nextProps.fighting) {
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
        this.props.dispatch(setEnemyHealth(charHealth, {orcDead: true, deathCheck: true, playerTurn: false, fighting: false}));
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
        this.props.dispatch(setPlayerHealth(charHealth, {playerDead: true, deathCheck: true, playerTurn: false, fighting: false}));
      }
    }
  }

  fight(char, enemy) {

    // const {stan, orc} = this.props.chars;
    // let turn = stan.attack(orc.ac);
    // turn.whoTurn = 'Stan';
    // if (turn.hit) {
    //   let charHealth = this.props.enemyHealth;
    //   turn.damage = stan.damage();
    //   charHealth -= turn.damage;
    //   turn.enemyHealth = charHealth;
    //   if (turn.enemyHealth > 0) {
    //     this.props.dispatch(setEnemyHealth(charHealth));
    //   } else {
    //     this.props.dispatch(setEnemyHealth(charHealth, {orcDead: true, deathCheck: true, playerTurn: false, fighting: false}));
    //   }
    // }

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

  combatRound(attacker, defender) {
    console.log(attacker, defender);
    let turn = attacker.attack(defender.ac);
    turn.whoTurn = attacker.id;
    if (turn.hit) {
      let charHealth = attacker.health;
      turn.damage = attacker.damage();
      charHealth -= turn.damage;
      turn.enemyHealth = charHealth;
      if (turn.enemyHealth > 0) {
        this.props.dispatch(setEnemyHealth(charHealth, defender));
      } else {
        this.props.dispatch(setEnemyHealth(charHealth, defender, {orcDead: true, deathCheck: true, playerTurn: false, fighting: false}));
      }
    }
    turn.turn = (this.props.turns.length + 1).toString();
    this.props.dispatch(updateTurns(turn));
    this.props.dispatch(playerTurn());
  };

  render() {
    return (
      <div> 
        {/*<Turns  />*/}

          <Controls 
            prevRoom={this.props.prevRoom}
            backToPrevRoom={this.props.backToPrevRoom}
            combatRound={this.combatRound} 
            updateCurrentRoom={this.props.updateCurrentRoom}
          />
      </div>
    );
  }
}
export default connect(mapStateToProps)(BuildCombat);
