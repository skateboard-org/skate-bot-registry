import { CLOSE_SIGN_UP_MODAL, OPEN_SIGN_UP_MODAL } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case OPEN_SIGN_UP_MODAL:
      return action.payload;
    case CLOSE_SIGN_UP_MODAL:
      return action.payload;
    default:
      return state;
  }
};
