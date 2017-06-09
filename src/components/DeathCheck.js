import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  turns: state.turns
});

class DeathCheck extends Component {
  render() {
    let lastTurn;
    let deathNotice = null;
    if (this.props.turns.length) {
      lastTurn = this.props.turns[0];
      deathNotice = `Turn ${lastTurn.turn}: ${lastTurn.whoTurn} is victorious!`;
    }
    return (
      <p>{deathNotice}</p>
    );
  }
}

export default connect(mapStateToProps)(DeathCheck);
