import React, {Component} from 'react';
import diceRoller from './diceRoller';
import Controls from './Controls';
import Turns from './Turns';
import chars from './chars';

export default class BuildCombat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: chars,
      hit: false,
      roll: null,
      dead: false,
      youHealth: chars.You.health,
      enemyHealth: chars.Orc.health,
      damage: null,
      playerTurn: 'init',
      turns: []
    };
    this.fight = this.fight.bind(this);
    this.damage = this.damage.bind(this);
  }

//keep ternary operator in mind when refactoring


  damage(char, turn) {
    let charHealth;
    if(char === 'You') {
      charHealth = this.state.enemyHealth;
      let roll = diceRoller(6, 1) + this.state.chars[char].atk;
      charHealth -= roll;
      turn.enemyHealth = charHealth;
      turn.damage = roll;
    } else {
      charHealth = this.state.youHealth;
      let roll = diceRoller(6, 1) + this.state.chars[char].atk;
      charHealth -= roll;
      turn.youHealth = charHealth;
      turn.damage = roll;
    }
  }

  fight(char, enemy) {
    let count = 1;
    let turn = {turn: count, whoTurn: char};
    let roll = diceRoller(20, 1) + this.state.chars[char].atk;
    if(roll >= this.state.chars[enemy].ac) {
      turn.hit = true;
      turn.roll = roll;
      this.damage(char, turn);
    } else {
      turn.hit = false;
      turn.roll = roll;
    }
    this.setState({turns: this.state.turns.concat(turn)});

  }

  render() {
    return (
      <div>
        <Turns turns={this.state.turns} />
        <Controls playerTurn={this.state.playerTurn} fight={this.fight} />
      </div>
    );
  }
}
