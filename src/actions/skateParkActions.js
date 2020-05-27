import ReactGA from "react-ga";
import Noty from "noty";
import notyConfig from "../config/noty.config";

import {
  subscribeTo,
  unSubscribeTo,
  getSubscriptionData,
  getAllBots,
} from "../config/firebase";
import {
  ALREADY_SUBSCRIBED,
  SUCCESSFUL_SUBSCRIPTION,
  WAIT_SUBSCRIPTION,
  REPORT_ERROR_SUBSCRIPTION,
  NOT_SUBSCRIBED,
  LOAD_BOTS,
} from "./types";

export const getChannelState = (channelId, isUserAuthenticated = null) => (
  dispatch
) => {
  dispatch({
    type: WAIT_SUBSCRIPTION,
    payload: "loading",
  });

  if (isUserAuthenticated) {
    getSubscriptionData({
      channelId,
    }).then((result) => {
      if (!result.data.error && result.data.message === "subscribed") {
        dispatch({
          type: ALREADY_SUBSCRIBED,
          payload: "already",
        });
      } else if (
        !result.data.error &&
        result.data.message === "not subscribed"
      ) {
        dispatch({
          type: NOT_SUBSCRIBED,
          payload: "ready",
        });
      } else {
        dispatch({
          type: REPORT_ERROR_SUBSCRIPTION,
          payload: "failed",
        });
      }
    });
  } else {
    dispatch({
      type: NOT_SUBSCRIBED,
      payload: "ready",
    });
  }
};

export const getAllBotsAction = () => (dispatch) => {
  getAllBots().then((result) => {
    if (!result.data.error) {
      dispatch({
        type: LOAD_BOTS,
        payload: result.data.data,
      });
    }
  });
};

export const subscribeChannel = (channelId) => async (dispatch) => {
  dispatch({
    type: WAIT_SUBSCRIPTION,
    payload: "loading",
  });
  subscribeTo({
    channelId,
  }).then((result) => {
    if (!result.error && result !== null) {
      dispatch({
        type: SUCCESSFUL_SUBSCRIPTION,
        payload: "successful",
      });
      ReactGA.event({
        category: "subscription",
        action: "subscribe-successful",
        label: "channel",
      });
    } else {
      new Noty({
        ...notyConfig,
        text: "Some Error Occured",
        type: "error",
      }).show();
      ReactGA.event({
        category: "subscription",
        action: "subscribe-unsuccessful",
        label: "channel",
      });
      dispatch({
        type: REPORT_ERROR_SUBSCRIPTION,
        payload: "failed",
      });
    }
  });
};

export const unSubscribeChannel = (channelId) => async (dispatch) => {
  dispatch({
    type: WAIT_SUBSCRIPTION,
    payload: "loading",
  });
  unSubscribeTo({
    channelId,
  }).then((result) => {
    if (!result.error && result !== null) {
      dispatch({
        type: NOT_SUBSCRIBED,
        payload: "ready",
      });
      ReactGA.event({
        category: "subscription",
        action: "unsubscribe-successful",
        label: "channel",
      });
      new Noty({
        ...notyConfig,
        text: "Channel Unsubscribed",
        type: "information",
      }).show();
    } else {
      new Noty({
        ...notyConfig,
        text: "Some Error Occured",
        type: "error",
      }).show();
      ReactGA.event({
        category: "subscription",
        action: "unsubscribe-unsuccessful",
        label: "channel",
      });
      dispatch({
        type: REPORT_ERROR_SUBSCRIPTION,
        payload: "failed",
      });
    }
  });
};
