// import * as firebase from 'firebase';

import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/functions";

import FirebaseConfig from "./keys";

firebase.initializeApp(FirebaseConfig);

export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export const subscribeTo = firebase.functions().httpsCallable("subscribeTo");
export const unSubscribeTo = firebase
  .functions()
  .httpsCallable("unSubscribeTo");
export const getSubscriptionData = firebase
  .functions()
  .httpsCallable("getSubscriptionData");

export const getAllBots = firebase.functions().httpsCallable("getAllBots");
