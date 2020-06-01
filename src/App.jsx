import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/Home/Home';
import Browse from './components/Browse/Browse';
import NewBot from './components/NewBot/NewBot';
import Bot from './components/BotPage/BotPage';
import { fetchUser } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={() => <Home />} />
          <Route path="/browse" component={() => <Browse />} />
          <Route path="/new-bot" component={() => <NewBot />} />
          <Route
            path="/channel/exhibitions-in-delhi-ncr"
            component={() => <Bot />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
