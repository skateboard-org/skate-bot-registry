import "./Browse.css";

import React, { Component } from "react";
import {
  Container,
  Grid,
  Header,
  Button,
  List,
  Accordion,
  Icon,
  Statistic,
  Responsive,
  Card,
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
          <Card key={bot.name}>
            <Card.Content header={bot.name} />
            <Card.Content description={bot.desc} />
            <Card.Content extra>{OpenBotButton(bot.name)}</Card.Content>
          </Card>
        );
      });
    };

    return (
      <Layout>
        <Container className="browse-page-container">
          <SuccessModal />
          <Grid>
            <Grid.Row>
              <Grid.Column computer={10} tablet={16} mobile={16}>
                <div className="channel-content">{botCards()}</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
