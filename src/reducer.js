import adventureZones from './data/adventureZones';
import chars from './data/chars';

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

const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';
const BACK_TO_PREV_ROOM = 'BACK_TO_PREV_ROOM';
const ROOM_NAV_ERROR = 'ROOM NAV ROOM_NAV_ERROR';
const SET_ENEMY_HEALTH = 'SET_ENEMY_HEALTH';
const SET_PLAYER_HEALTH = 'SET_PLAYER_HEALTH';
const UPDATE_TURNS = 'UPDATE_TURNS';
const ORCS_TURN = 'ORCS_TURN';
const DEATH_CHECK = 'DEATH_CHECK';
const RESET_STATE = 'RESET_STATE';

export const resetState = () => ({
  type: RESET_STATE
});

export const deathCheck = () => ({
  type: DEATH_CHECK
});

export const orcsTurn = () => ({
  type: ORCS_TURN
});

export const updateTurns = (turn) => ({
  type: UPDATE_TURNS,
  payload: turn
});

export const setPlayerHealth = (charHealth, optionalValues = null) => ({
  type: SET_PLAYER_HEALTH,
  payload: charHealth,
  options: optionalValues
});

export const setEnemyHealth = (charHealth, optionalValues = null) => ({
  type: SET_ENEMY_HEALTH,
  payload: charHealth,
  options: optionalValues
});

export const roomNavError = () => ({
  type: ROOM_NAV_ERROR
});

export const setCurrentRoom = (room) => ({
  type: SET_CURRENT_ROOM,
  payload: room,
});

export const backToPrevRoom = () => ({
  type: BACK_TO_PREV_ROOM
});

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
