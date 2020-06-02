import "./Home.css";
import React, { Component } from "react";
import { Container, Header, Button, Icon, Segment, Image } from "semantic-ui-react";
import Layout from "../Layout/Layout";
import PropTypes from "prop-types";
import ReactGA from "react-ga";

class HomePage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  getStarted() {
    this.context.router.history.push("/browse");
  }

  componentDidMount() {
    ReactGA.pageview("/");
  }

  render() {
    return (
      <Layout>
        <Segment textAlign="center" vertical className={"home-image"}>
          <Container text>
            <Header as="h1" content="skateboard" className={"home-heading"} />
            <Image src="/img/cover.jpg"></Image>
            {/* <Header
              as="h2"
              content="connect with your industry"
              className={"home-subheading"}
            /> */}
            <Button
              primary
              size="huge"
              className={"home-get-started-button"}
              onClick={() => this.getStarted()}
            >
              Sign Up For Beta&nbsp;&nbsp;<Icon name="down arrow" />
            </Button>
            <p className="home-sign-up-text">first 100 People to sign up will get the app for free</p>
          </Container>
        </Segment>
      </Layout>
    );
  }
}

export default HomePage;
