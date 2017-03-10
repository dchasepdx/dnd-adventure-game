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
    this.combatRound = this.combatRound.bind(this);
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

  combatRound() {
    this.fight('You', 'Orc');
    this.setState({orcsTurn: true});
    setTimeout(() => {
      this.fight('Orc', 'You');
      console.log('orc turn', this.state.turns);
      this.setState({orcsTurn: false});
    }, 2000);
  };

  render() {
    let orcsTurn;
    if(this.state.orcsTurn) {
      orcsTurn = <h1>Orc's Turn</h1>;
    }
    return (
      <div>
        {orcsTurn}
        <Turns turns={this.state.turns} />
        <Controls playerTurn={this.state.playerTurn} combatRound={this.combatRound} />
      </div>
    );
  }
}
