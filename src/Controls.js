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
      playerTurn: 'init'
    };
    this.fight = this.fight.bind(this);
    this.damage = this.damage.bind(this);
  }

//keep ternary operator in mind when refactoring

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

  fight(char, enemy) {
    let roll = diceRoller(20, 1) + this.props.chars[char].atk;
    console.log(roll, this.props.chars[enemy].ac);
    if(roll >= this.props.chars[enemy].ac) {
      this.setState({hit: true, roll: roll});
      this.damage(char);
      
    } else {
      this.setState({roll: roll, hit: false});
    }
    this.setState({playerTurn: !this.state.playerTurn});
  }

  render() {
    let hitNotification = null;
    let deadNotification = null;
    let orcNotification = null;
    let button = null;
    let turnNotification = null;

    if(this.state.playerTurn === 'init') {
      hitNotification = <p>A giant Orc is charging at you</p>;
      button = <button onClick={() => this.fight('stan', 'orc')}>fight!</button>;
      turnNotification = <span>what do you do?</span>;
    } else if(this.state.playerTurn === false) {
      if(this.state.roll) {
        if(this.state.hit) {
          hitNotification = <p>Hit! You rolled: {this.state.roll}. You did {this.state.damage} damage</p>;
          if(this.state.enemyHealth <= 0) {
            deadNotification = <p>The orc is dead!</p>;
          }
        } else {
          hitNotification = <p>Miss. You rolled: {this.state.roll} </p>;
        }
      }
      turnNotification = <span>enemy turn next</span>;
      button = <button onClick={() => this.fight('orc', 'stan')}>click for enemy turn!</button>;
    } else {
      if(this.state.hit) {
        hitNotification = <p>The Orc smacks you and does {this.state.damage} damage</p>;
        if(this.state.stanHealth <= 0) {
          deadNotification = <p>You die</p>;
        }
      } else {
        hitNotification = <p>The orc misses</p>;
      }
      button = <button onClick={() => this.fight('stan', 'orc')}>fight!</button>;
      turnNotification = <span>what do you do?</span>;
    }

    return (
      <div>
        {hitNotification}
        {deadNotification}
        {orcNotification}
        {turnNotification}
        {button}
      </div>
    );
  }
}
