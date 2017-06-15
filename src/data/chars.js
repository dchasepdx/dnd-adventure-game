export default {
  Stan: {
    id: 'stan',
    ac: 13,
    atk: 2,
    health: 10
  },

  Orc: {
    id: 'orc',
    ac: 10,
    atk: 1,
    health: 10
  }
};
import diceRoller from './diceRoller';

class Character {
  constructor(id, ac, atk, health) {
    this.id = id;
    this.ac = ac;
    this.atk = atk;
    this.health = health;
  }

  attack(enemyAc) {
    let roll = diceRoller(20, 1);
    roll += this.atk;
    const hit = (roll >= enemyAc);
    return {
      hit,
      roll
    };
  }

  damage() {
    let damageDone = diceRoller(6, 1);
    damageDone += this.atk;
    return damageDone;
  }
}

export const stan = new Character('stan', 13, 2, 10);
export const orc = new Character('orc', 10, 1, 10);
export const targetDummy = new Character('dummy', 10, 0, 1000);



