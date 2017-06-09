import {
  SET_CURRENT_ROOM,
  BACK_TO_PREV_ROOM,
  ROOM_NAV_ERROR,
  SET_ENEMY_HEALTH,
  SET_PLAYER_HEALTH,
  UPDATE_TURNS,
  ORCS_TURN,
  RESET_STATE,
  CHANGE_FIGHTING,
  
} from './constants';

export const resetState = () => ({
  type: RESET_STATE
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

export const changeFighting = () => ({
  type: CHANGE_FIGHTING,
});
