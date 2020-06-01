import 'semantic-ui-css/semantic.min.css';
import 'noty/lib/noty.css';
// import "noty/lib/themes/semanticui.css";
import 'noty/lib/themes/sunset.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Sentry from './config/sentry';

Sentry.init();

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
