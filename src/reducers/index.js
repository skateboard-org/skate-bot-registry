import { combineReducers } from 'redux';

import auth from './authReducer';
import signUpModal from './signUpModalReducer';
import subscription from './subscriptionReducer';
import allBots from './allBotsReducer';
import bot from './botReducer';
import newBot from './newBotReducer';

export default combineReducers({
  auth,
  signUpModal,
  subscription,
  allBots,
  bot,
  newBot,
});
