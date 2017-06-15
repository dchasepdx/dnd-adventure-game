import adventureZones from './data/adventureZones';
import * as chars from './data/chars';
import {
  SET_CURRENT_ROOM,
  BACK_TO_PREV_ROOM,
  ROOM_NAV_ERROR,
  SET_ENEMY_HEALTH,
  SET_PLAYER_HEALTH,
  UPDATE_TURNS,
  PLAYER_TURN,
  RESET_STATE,
  CHANGE_FIGHTING,
  CHANGE_TARGET,
  
} from './constants';

const initialState = {
  currentRoom: adventureZones[1],
  prevRoom: null,
  navError: null,
  chars: chars,
  youHealth: chars.stan.health,
  enemyHealth: null,
  playerTurn: false,
  deathCheck: false,
  orcDead: false,
  playerDead: false,
  fighting: false,
  turns: [],
  initiativeOrder: [chars.stan, chars.orc],
  enemies: [chars.orc, chars.targetDummy],
  goodGuys: [chars.stan, chars.targetDummy],
  target: null
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

    case PLAYER_TURN:
      return {
        ...state,
        playerTurn: !state.playerTurn
      };

    case CHANGE_FIGHTING:
      return {
        ...state,
        fighting: true
      };

    case RESET_STATE:
      return {
        ...state,
        currentRoom: adventureZones[1],
        prevRoom: null,
        navError: null,
        chars: chars,
        youHealth: chars.stan.health,
        enemyHealth: chars.orc.health,
        orcsTurn: false,
        deathCheck: false,
        orcDead: false,
        playerDead: false,
        fighting: false,
        turns: [],
        initiativeOrder: [chars.stan, chars.orc],
        enemies: [chars.orc, chars.targetDummy],
        target: null
      };

    case CHANGE_TARGET:
      return {
        ...state,
        target: action.payload
      };

    default:
      return state;
  }
}
