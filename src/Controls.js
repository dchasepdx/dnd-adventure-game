import React, {Component} from 'react';
import diceRoller from './diceRoller';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hit: false,
      roll: null,
      dead: false,
      stanHealth: this.props.chars.stan.health,
      enemyHealth: this.props.chars.orc.health,
      damage: null,
      playerTurn: false
    };
    this.fight = this.fight.bind(this);
    this.damage = this.damage.bind(this);
  }

  damage(char) {
    let charHealth;
    if(char === 'stan') {
      charHealth = this.state.enemyHealth;
      let roll = diceRoller(6, 1) + this.props.chars[char].atk;
      charHealth -= roll;
      this.setState({enemyHealth: charHealth, damage: roll});
    } else {
      charHealth = this.state.stanHealth;
      let roll = diceRoller(6, 1) + this.props.chars[char].atk;
      charHealth -= roll;
      this.setState({stanHealth: charHealth, damage: roll});
    }
  }

  fight(char) {
    
    let roll = diceRoller(20, 1) + this.props.chars[char].atk;
    if(roll >= this.props.chars[char].ac) {
      this.setState({hit: true, roll: roll});
      this.damage(char);
    } else {
      this.setState({roll: roll, hit: false});
      this.setState({hit: false});
    }
    this.setState({playerTurn: !this.state.playerTurn});
  }

  render() {
    let hitNotification = null;
    let deadNotification = null;
    let orcNotification = null;
    let button = null;
    if(this.state.playerTurn) {
      if(this.state.roll) {
        if(this.state.hit) {
          hitNotification = <p>Hit! You rolled: {this.state.roll}. You did {this.state.damage} damage</p>
          if(this.state.enemyHealth <= 0) {
            deadNotification = <p>The orc is dead!</p>;
          }
        } else {
          hitNotification = <p>Miss. You rolled: {this.state.roll} </p>;
        }
      }
      button = <button onClick={() => this.fight('orc')}>enemy's turn</button>;
    } else {
      button = <button onClick={() => this.fight('stan')}>stan's turn</button>;
      hitNotification = <p>The orc smacks you</p>;
    }

    return (
      <div>
        {hitNotification}
        {deadNotification}
        {orcNotification}
        {button}
      </div>
    );
  }
}
