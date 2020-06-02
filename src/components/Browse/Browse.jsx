import "./Browse.css";

import React, { Component } from "react";
import {
  Container,
  Grid,
  Button,
  Card,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import Layout from "../Layout/Layout";
import {
  openSignUpModal,
  subscribeChannel,
  unSubscribeChannel,
  getChannelState,
  getAllBotsAction,
} from "../../actions";
import PropTypes from "prop-types";
import SuccessModal from "../SuccessModal/SuccessModal";

class Channel extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.getAllBotsAction();
  }

  componentDidMount() {
    ReactGA.pageview("/browse");
  }

  openBot(botName) {
    this.context.router.history.push(`/bot/${botName}`);
  }

  render() {
    const ButtonText = "View";

    const OpenBotButton = (botName) => (
      <Button color="black" size="tiny" onClick={() => this.openBot(botName)}>
        {ButtonText}
      </Button>
    );

    const botCards = () => {
      return this.props.bots.map((bot) => {
        return (
          <Grid.Column key={bot.name} computer={4} tablet={8} mobile={8}>
            <Card className="bot-card">
              <Card.Content>
                <i className={"bot-icon " + bot.icon + " fa-lg"}></i>
                <Card.Header>
                  {bot.name}
                </Card.Header>
                <Card.Meta>
                </Card.Meta>
                <Card.Description>
                  {bot.desc}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                {OpenBotButton(bot.name)}
              </Card.Content>
            </Card>
          </Grid.Column>
        );
      });
    };

    return (
      <Layout>
        <Container className="browse-page-container">
          <SuccessModal />
           <div className="channel-content">
            <Grid>
                {botCards()}
            </Grid>
          </div>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = ({ auth, subscription, bots }) => ({
  auth,
  subscription,
  bots,
});

export default connect(mapStateToProps, {
  openSignUpModal,
  subscribeChannel,
  unSubscribeChannel,
  getChannelState,
  getAllBotsAction,
})(Channel);
