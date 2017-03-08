import React, {Component} from 'react';

export default class BuildCombat extends Component() {
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

  render() {
    let hitNotification = null;
    let deadNotification = null;
    let orcNotification = null;
    let button = null;
    let turnNotification = null;
    if(this.state.playerTurn === 'init') {
      hitNotification = <p>A giant Orc is charging at you</p>;
      button = <button onClick={() => this.fight('stan', 'orc')}>fight!</button>;
      turnNotification = <span>stan's turn</span>;
    } else if(this.state.playerTurn === true) {
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
      turnNotification = <span>enemy's turn</span>;
      button = <button onClick={() => this.fight('orc', 'stan')}>fight!</button>;
    } else {
      button = <button onClick={() => this.fight('stan', 'orc')}>fight!</button>;
      hitNotification = <p>The orc smacks you</p>;
      turnNotification = <span>stan's turn</span>;
    }
    return {hitNotification, deadNotification, orcNotification, button, turnNotification};
  }
};