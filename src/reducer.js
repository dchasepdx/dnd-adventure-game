import adventureZones from './components/adventureZones';

const initialState = {
  currentRoom: adventureZones[1],
  prevRoom: null,
  navError: null
};

const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';
const BACK_TO_PREV_ROOM = 'BACK_TO_PREV_ROOM';

export const setCurrentRoom = (room) => {
  console.log('reducing', room);
  return {
    type: SET_CURRENT_ROOM,
    payload: room
  };
};

export const backToPrevRoom = (room) => {
  return {
    type: BACK_TO_PREV_ROOM,
    payload: room
  };
};

export default function adventureReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ROOM: 
      console.log('setting room', action.payload);
      return {
        ...state,
        currentRoom: adventureZones[action.payload],
        prevRoom: state.currentRoom,
      };
    case BACK_TO_PREV_ROOM:
      return {
        ...state,
        currentRoom: state.prevRoom
      };
    default:
      return state;
  }
}
