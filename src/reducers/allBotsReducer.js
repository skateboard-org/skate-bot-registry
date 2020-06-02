import { LOAD_BOTS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_BOTS:
      return action.payload;
    default:
      return state;
  }
};
