import React, { Component } from 'react';
import BuildCombat from './BuildCombat.js';
import adventureZones from './adventureZones';
import CurrentRoom from './CurrentRoom';
import RoomNavigation from './RoomNavigation';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoom: adventureZones[1],
    };
    this.updateCurrentRoom = this.updateCurrentRoom.bind(this);
  }

  updateCurrentRoom(e) {
    e.preventDefault();
    if(!e.target.value) {
      this.setState({navError: true});
    } else {
      this.setState({currentRoom: adventureZones[e.target.value], navError: false});
    }
  }

  render() {
    return (
      <div>
        {this.state.navError && 
          <p>You can't go that way</p>
        }
        <CurrentRoom 
          currentRoom={this.state.currentRoom}
        />
    
        {this.state.currentRoom.enemy &&
          <BuildCombat />
        }
        {!this.state.currentRoom.enemy &&
          <RoomNavigation 
          currentRoom={this.state.currentRoom}
          updateCurrentRoom={this.updateCurrentRoom}
        />
        }
      </div>
    );

  }
}

export default App;
