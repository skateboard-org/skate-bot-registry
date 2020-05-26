import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Channel from "./components/Channel/Channel";
import Home from "./components/Home/Home";
import { fetchUser } from "./actions";

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
          <Route
            path="/channel/exhibitions-in-delhi-ncr"
            component={() => <Channel />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
