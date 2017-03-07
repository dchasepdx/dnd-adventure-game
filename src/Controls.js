import React, {Component} from 'react';
import diceRoller from './diceRoller';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hit: false,
      roll: null,
      dead: false,
      enemyHealth: this.props.chars.orc.health,
      stanHealth: this.props.chars.stan.health,
      damage: null
    }
    this.fight = this.fight.bind(this);
    this.damage = this.damage.bind(this);
  }

  enemyTurn() {
    
  }

  damage(char) {
    let health;
    if(char === 'stan') {
      health = this.state.enemyHealth;
    } else {
      health = this.state.stanHealth;
    }

    let roll = diceRoller(6, 1) + this.props.chars[char].atk;
    health -= roll;
    this.setState({health: health, damage: roll});
    console.log('state', this.state.enemyHealth);
    console.log('local health', health);
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
    
  }

  render() {
    let hitNotification = null;
    let deadNotification = null;
    if(this.state.roll) {
      if(this.state.hit) {
        hitNotification = <p>Hit! You rolled: {this.state.roll}. You did {this.state.damage} damage</p>
        if(this.state.enemyHealth <= 0) {
          deadNotification = <p>The orc is dead!</p>;
        }
      } else {
        hitNotification = <p>Miss. You rolled: {this.state.roll} </p>
      }
    }

    return (
      <div>
        {hitNotification}
        {deadNotification}
        <button onClick={() => this.fight('stan')}>fight</button>
      </div>
    );
  }
}
