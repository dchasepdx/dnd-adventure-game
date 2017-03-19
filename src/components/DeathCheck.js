import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  turns: state.turns
});

class DeathCheck extends Component {
  render() {
    let lastTurn;
    let deathNotice;
    if (this.props.turns.length) {
      lastTurn = this.props.turns[this.props.turns.length - 1];
      deathNotice = <p>Turn {lastTurn.turn}: {lastTurn.whoTurn} is victorious!</p>;
    }
    return (
      <div>
        {deathNotice}
      </div>
    );
  }
}

export default connect(mapStateToProps)(DeathCheck);
