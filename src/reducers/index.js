import { combineReducers } from 'redux';

import auth from './authReducer';
import signUpModal from './signUpModalReducer';
import subscription from './subscriptionReducer';

export default combineReducers({
  auth,
  signUpModal,
  subscription,
});
