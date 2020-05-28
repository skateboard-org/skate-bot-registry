import { combineReducers } from 'redux';

import auth from './authReducer';
import signUpModal from './signUpModalReducer';
import subscription from './subscriptionReducer';
import bots from './botsReducer';
import newBot from './newBotReducer';

export default combineReducers({
  auth,
  signUpModal,
  subscription,
  bots,
  newBot,
});
