import { LOAD_BOT, BOT_NOT_FOUND } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case LOAD_BOT:
      return action.payload;
    case BOT_NOT_FOUND:
      return null;
    default:
      return state;
  }
};
