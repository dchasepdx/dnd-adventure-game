import React, { Component } from 'react';
import {connect} from 'react-redux';

import CurrentRoom from './CurrentRoom';
import DeathCheck from './DeathCheck';

const mapStateToProps = state => ({
  turns: state.turns,
  deathCheck: state.deathCheck,
});

class ViewBox extends Component {
  render() {


    return (
      <div style={{fontSize: '4em'}}>
        <CurrentRoom />
        
      </div>
    );
  }
}

export default connect(mapStateToProps)(ViewBox);
