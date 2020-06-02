// import * as firebase from 'firebase';

import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/functions';

import FirebaseConfig from './keys';

firebase.initializeApp(FirebaseConfig);

export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

// firebase.functions().useFunctionsEmulator('http://localhost:5001');

export const subscribeBot = firebase.functions().httpsCallable('addBot');
export const unsubscribeBot = firebase
  .functions()
  .httpsCallable('removeBot');

export const getBotSubscriptionStatus = firebase
  .functions()
  .httpsCallable('getBotSubscriptionStatus');

export const getAllBots = firebase.functions().httpsCallable('getAllBots');
export const createNewBot = firebase.functions().httpsCallable('createNewBot');

export const getBot = firebase.functions().httpsCallable('getBot');
