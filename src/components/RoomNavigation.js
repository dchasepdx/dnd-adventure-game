import React, { Component } from 'react';
import {connect} from 'react-redux';
import {buttonStyles, divStyleFlex} from '../styles';

const mapStateToProps = state => ({
  orcDead: state.orcDead
});

class RoomNavigation extends Component {
  render() {
    
    let win = <button style={buttonStyles} value={'win'} onClick={this.props.updateCurrentRoom}>You Win! Reset Game</button>;
    let nav = (
              <div>
                <button style={buttonStyles} value={this.props.currentRoom.n} onClick={this.props.updateCurrentRoom}>North</button>
                <button style={buttonStyles} value={this.props.currentRoom.s} onClick={this.props.updateCurrentRoom}>South</button>
              </div>
              );
    return (
      <div className='col-1-3' style={divStyleFlex}>
        {this.props.currentRoom.treasure ? win : nav}
      </div>
    );
  }
}

export default connect(mapStateToProps)(RoomNavigation);
