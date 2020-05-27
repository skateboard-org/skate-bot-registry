import ReactGA from "react-ga";
import Noty from "noty";
import notyConfig from "../config/noty.config";

import { authRef, provider } from "../config/firebase";
import { FETCH_USER, OPEN_SIGN_UP_MODAL, CLOSE_SIGN_UP_MODAL } from "./types";

export const fetchUser = () => (dispatch) => {
  authRef.onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user,
      });
      ReactGA.set({ userId: user.uid });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null,
      });
    }
  });
};

export const signIn = () => () => {
  authRef
    .signInWithPopup(provider)
    .then(() => {
      new Noty({
        ...notyConfig,
        text: "Hello, there!",
        type: "success",
      }).show();
      ReactGA.event({
        category: "auth",
        action: "sign-in",
        label: "account",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signOut = () => () => {
  authRef
    .signOut()
    .then(() => {
      new Noty({
        ...notyConfig,
        text: "Succesfully logged out",
        type: "alert",
      }).show();
      ReactGA.event({
        category: "auth",
        action: "sign-out",
        label: "account",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const openSignUpModal = () => (dispatch) => {
  dispatch({
    type: OPEN_SIGN_UP_MODAL,
    payload: true,
  });
  ReactGA.event({
    category: "auth",
    action: "open-sign-up-modal",
    label: "account",
  });
};

export const closeSignUpModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_SIGN_UP_MODAL,
    payload: false,
  });
};
