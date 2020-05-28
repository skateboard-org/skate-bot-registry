import {
  BOT_CREATION_FAILED, BOT_CREATION_SUCCESSFUL, BOT_CREATION_INITIATED, BOT_CREATION_RESET,
} from '../actions/types';

export default (state = { success: null, loading: false }, action) => {
  switch (action.type) {
    case BOT_CREATION_SUCCESSFUL:
      return { success: true, loading: false };
    case BOT_CREATION_FAILED:
      return { success: false, loading: false };
    case BOT_CREATION_INITIATED:
      return { success: null, loading: true };
    case BOT_CREATION_RESET:
      return { success: null, loading: false };
    default:
      return state;
  }
};
