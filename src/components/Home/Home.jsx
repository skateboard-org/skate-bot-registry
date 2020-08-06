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
            <Header
              as="h1"
              content="an arsenal of bots to supercharge how you work"
              className={"home-subheading"}
            />
            <Image src="/img/cover.jpg"></Image>

            {/* <Button
              primary
              size="huge"
              className={"home-get-started-button"}
              onClick={() => this.getStarted()}
            >
              Sign Up For Beta&nbsp;&nbsp;<Icon name="down arrow" />
            </Button> */}
            {/* <p className="home-sign-up-text">first 100 People to sign up will get the app for free</p> */}
          </Container>
        </Segment>
        <Container text className="subheads">
            <Header as="h2">
              option key + spacebar = skateboard
            </Header>
            <p className="subheads-para">
            get skateboard on top whatever you're doing – emailing, researching, chatting, thinking, writing – stay in the zone, and let skateboard do stuff for you
            </p>

        </Container>
        <Container text className="subheads">
            <Header as="h2">
              make bots fetch things for you
            </Header>
            <p className="subheads-para">
            grab gifs, images, articles, snippets, quotes, lyrics, links by one click copy
            </p>
        </Container>
        <Container text className="subheads">
            <Header as="h2">
              discover new bots people everyday
            </Header>
            <p className="subheads-para">
            as making bots for skateboard is super easy, see what people make for you and themselves to use
            </p>
        </Container>
      </Layout>
    );
  }
}

export default HomePage;
