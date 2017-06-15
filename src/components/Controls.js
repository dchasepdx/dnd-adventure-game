import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  resetState,
  changeTarget,
} from '../actions';
import {buttonStyles, divStyleFlex} from '../styles';

const mapstateToProps = state => ({
  playerTurn: state.playerTurn,
  fighting: state.fighting,
  currentRoom: state.currentRoom,
  orcDead: state.orcDead,
  playerDead: state.playerDead,
  initiativeOrder: state.initiativeOrder,
  enemies: state.enemies,
  target: state.target,
});

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  incrementIndex() {
    let index = this.state.index;
    index++;

    if (index >= this.props.initiativeOrder.length) {
      this.setState({index: 0});
    } else {
      this.setState({index});
    }
  }

  whosTurn() {
    const {initiativeOrder} = this.props;
    const {index} = this.state;
    return initiativeOrder[index];
  }

  render() {
    const currentCharTurn = this.whosTurn();

    return (
    <div className='col-1-3' style={divStyleFlex}>
      {(this.props.playerTurn && this.props.fighting) &&
        <div>
          <button style={buttonStyles} onClick={() => {
            this.props.combatRound(currentCharTurn, this.props.target);
            this.incrementIndex();
          }}
            >fight!
          </button>
          <button style={buttonStyles} onClick={this.props.backToPrevRoom}>Run Away!</button>
          {this.props.enemies.map(enemy => {
            return (<button onClick={() => {
              this.props.dispatch(changeTarget(enemy));
            }}
              value={enemy.id} 
              style={buttonStyles} 
              key={enemy.id}>{enemy.id}
            </button>
            );
          })}
        </div>
      }

      {(!this.props.playerTurn && this.props.fighting) &&
        <button style={buttonStyles} onClick={() => {
          this.props.combatRound(currentCharTurn, this.props.target);
          this.incrementIndex();
        }}
          >Enemy Turn
        </button>
      }

      {(!this.props.fighting && this.props.orcDead) &&
        <button style={buttonStyles} value={this.props.currentRoom.win} onClick={this.props.updateCurrentRoom}>next</button>
      }
      {(!this.props.fighting && this.props.playerDead) && 
        <button style={buttonStyles} onClick={() => this.props.dispatch(resetState())}>Restart</button>
      }

    </div>
    );
  }
}
export default connect(mapstateToProps)(Controls);
