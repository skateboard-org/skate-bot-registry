import ReactGA from 'react-ga';
import Noty from 'noty';
import notyConfig from '../config/noty.config';

import {
  subscribeBot,
  unsubscribeBot,
  getBotSubscriptionStatus,
  getBot,
  getAllBots,
  createNewBot,
} from '../config/firebase';
import {
  ALREADY_SUBSCRIBED,
  SUCCESSFUL_SUBSCRIPTION,
  WAIT_SUBSCRIPTION,
  REPORT_ERROR_SUBSCRIPTION,
  NOT_SUBSCRIBED,
  LOAD_BOTS,
  LOAD_BOT,
  BOT_NOT_FOUND,
  BOT_CREATION_SUCCESSFUL,
  BOT_CREATION_FAILED,
  BOT_CREATION_INITIATED,
  BOT_CREATION_RESET,
} from './types';


export const getBotAction = botName => async (dispatch) => {
  getBot({
    botName,
  }).then((result) => {
    if (result.data.success) {
      dispatch({
        type: LOAD_BOT,
        payload: result.data.data,
      });
    } else {
      dispatch({
        type: BOT_NOT_FOUND,
        payload: {},
      });
    }
  });
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

export const createNewBotAction = bot => async (dispatch) => {
  dispatch({
    type: BOT_CREATION_INITIATED,
  });
  createNewBot({
    bot,
  }).then((result) => {
    if (!result.error) {
      dispatch({
        type: BOT_CREATION_SUCCESSFUL,
      });
    } else {
      dispatch({
        type: BOT_CREATION_FAILED,
      });
    }
    setTimeout(() => {
      dispatch({
        type: BOT_CREATION_RESET,
      });
    }, 15 * 1000);
  });
};

export const getBotStatusAction = (botName, isUserAuthenticated = null) => (
  dispatch,
) => {
  dispatch({
    type: WAIT_SUBSCRIPTION,
    payload: 'loading',
  });

  if (isUserAuthenticated) {
    getBotSubscriptionStatus({
      botName,
    }).then((result) => {
      if (result.data.success && result.data.message === 'subscribed') {
        dispatch({
          type: ALREADY_SUBSCRIBED,
          payload: 'already',
        });
      } else if (
        result.data.success
        && result.data.message === 'not subscribed'
      ) {
        dispatch({
          type: NOT_SUBSCRIBED,
          payload: 'ready',
        });
      } else {
        dispatch({
          type: REPORT_ERROR_SUBSCRIPTION,
          payload: 'failed',
        });
      }
    });
  } else {
    dispatch({
      type: NOT_SUBSCRIBED,
      payload: 'ready',
    });
  }
};

export const subscribeBotAction = botName => async (dispatch) => {
  dispatch({
    type: WAIT_SUBSCRIPTION,
    payload: 'loading',
  });
  subscribeBot({
    botName,
  }).then((result) => {
    if (!result.error && result !== null) {
      dispatch({
        type: SUCCESSFUL_SUBSCRIPTION,
        payload: 'successful',
      });
      ReactGA.event({
        category: 'subscription',
        action: 'subscribe-successful',
        label: 'bot',
      });
    } else {
      new Noty({
        ...notyConfig,
        text: 'Some Error Occured',
        type: 'error',
      }).show();
      ReactGA.event({
        category: 'subscription',
        action: 'subscribe-unsuccessful',
        label: 'bot',
      });
      dispatch({
        type: REPORT_ERROR_SUBSCRIPTION,
        payload: 'failed',
      });
    }
  });
};

export const unsubscribeBotAction = botName => async (dispatch) => {
  dispatch({
    type: WAIT_SUBSCRIPTION,
    payload: 'loading',
  });
  unsubscribeBot({
    botName,
  }).then((result) => {
    if (!result.error && result !== null) {
      dispatch({
        type: NOT_SUBSCRIBED,
        payload: 'ready',
      });
      ReactGA.event({
        category: 'subscription',
        action: 'unsubscribe-successful',
        label: 'bot',
      });
      new Noty({
        ...notyConfig,
        text: 'Bot Removed',
        type: 'information',
      }).show();
    } else {
      new Noty({
        ...notyConfig,
        text: 'Some Error Occured',
        type: 'error',
      }).show();
      ReactGA.event({
        category: 'subscription',
        action: 'unsubscribe-unsuccessful',
        label: 'bot',
      });
      dispatch({
        type: REPORT_ERROR_SUBSCRIPTION,
        payload: 'failed',
      });
    }
  });
};
