import adventureZones from './data/adventureZones';
import chars from './data/chars';
import {
  SET_CURRENT_ROOM,
  BACK_TO_PREV_ROOM,
  ROOM_NAV_ERROR,
  SET_ENEMY_HEALTH,
  SET_PLAYER_HEALTH,
  UPDATE_TURNS,
  ORCS_TURN,
  RESET_STATE,
  
} from './constants';

const initialState = {
  currentRoom: adventureZones[1],
  prevRoom: null,
  navError: null,
  chars: chars,
  youHealth: chars.Stan.health,
  enemyHealth: chars.Orc.health,
  orcsTurn: false,
  deathCheck: false,
  orcDead: false,
  playerDead: false,
  combatOver: false,
  turns: []
};

function updateObject(state, newValues, optionalValues = null) {
  return {
    ...state,
    ...newValues,
    ...optionalValues
  };
}

export default function adventureReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ROOM:
      console.log(action.payload);
      return updateObject(
        state, 
        {
          currentRoom: adventureZones[action.payload],
          prevRoom: state.currentRoom,
          navError: false
        }
    ); 
    case BACK_TO_PREV_ROOM:
      return updateObject(state, {currentRoom: state.prevRoom});

    case ROOM_NAV_ERROR:
      return updateObject(state, {navError: true});

    case SET_ENEMY_HEALTH:
      return updateObject(state, {enemyHealth: action.payload}, action.options);

    case SET_PLAYER_HEALTH:
      return updateObject(state, {youHealth: action.payload}, action.options);

    case UPDATE_TURNS:
      return {
        ...state,
        turns: state.turns.concat(action.payload)
      };

    case ORCS_TURN:
      return {
        ...state,
        orcsTurn: !state.orcsTurn
      };

    case RESET_STATE:
      return {
        ...state,
        currentRoom: adventureZones[1],
        prevRoom: null,
        navError: null,
        chars: chars,
        youHealth: chars.Stan.health,
        enemyHealth: chars.Orc.health,
        orcsTurn: false,
        deathCheck: false,
        orcDead: false,
        playerDead: false,
        combatOver: false,
        turns: []
      };

    default:
      return state;
  }
}
