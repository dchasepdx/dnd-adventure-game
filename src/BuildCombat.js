import React, {Component} from 'react';
import diceRoller from './diceRoller';
import Controls from './Controls';
import Turns from './Turns';
import DeathCheck from './DeathCheck';
import chars from './chars';

export default class BuildCombat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: chars,
      hit: false,
      roll: null,
      youHealth: chars.Stan.health,
      enemyHealth: chars.Orc.health,
      damage: null,
      playerTurn: 'init',
      deathCheck: false,
      turns: []
    };
    this.fight = this.fight.bind(this);
    this.damage = this.damage.bind(this);
    this.combatRound = this.combatRound.bind(this);
  }

  damage(char, turn) {
    let charHealth;
    if(char === 'Stan') {
      charHealth = this.state.enemyHealth;
      let roll = diceRoller(6, 1) + this.state.chars[char].atk;
      charHealth -= roll;
      turn.enemyHealth = charHealth;
      turn.damage = roll;
      if(turn.enemyHealth > 0) {
        this.setState({enemyHealth: charHealth});
      } else {
        this.setState({enemyHealth: charHealth, deathCheck: true});
      }

    } else {
      charHealth = this.state.youHealth;
      let roll = diceRoller(6, 1) + this.state.chars[char].atk;
      charHealth -= roll;
      turn.youHealth = charHealth;
      turn.damage = roll;
      if(turn.youHealth > 0) {
        this.setState({youHealth: charHealth});
      } else {
        this.setState({youHealth: charHealth, deathCheck: true});
      }
    }
  }

  fight(char, enemy) {
    let turn = {whoTurn: char};
    let roll = diceRoller(20, 1) + this.state.chars[char].atk;
    if(roll >= this.state.chars[enemy].ac) {
      turn.hit = true;
      turn.roll = roll;
      this.damage(char, turn);
    } else {
      turn.hit = false;
      turn.roll = roll;
    }
    turn.turn = (this.state.turns.length + 1).toString();
    this.setState({turns: this.state.turns.concat(turn)});
  }

  combatRound() {
    this.fight('Stan', 'Orc');
    // this.setState({orcsTurn: true});
    setTimeout(() => {
      if(this.state.deathCheck) {
        return;
      }
      this.fight('Orc', 'Stan');
      // this.setState({orcsTurn: false});
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
        {/*!this.state.deathCheck &&*/ 
          <Turns turns={this.state.turns} />
        }
        {this.state.deathCheck &&
          <DeathCheck turns={this.state.turns} />
        }
        <Controls playerTurn={this.state.playerTurn} combatRound={this.combatRound} />
      </div>
    );
  }
}
