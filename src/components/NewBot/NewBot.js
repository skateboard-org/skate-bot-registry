import "./NewBot.css";

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
  Form,
  Checkbox,
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

  componentDidMount() {
    ReactGA.pageview("/new-bot");
  }

  addNewBot(botName) {
    this.context.router.history.push(`/bot/${botName}`);
  }

  isNameUnique(botName) {}

  render() {
    const AddNewBotButton = (botName) => (
      <Button
        color="black"
        size="medium"
        onClick={() => this.addNewBot(botName)}
      >
        {"Add New Bot"}
      </Button>
    );

    const AddNewBotForm = (
      <Form>
        <Form.Field>
          <label>BotName</label>
          <input placeholder="@botname" />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder="Last Name" />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );

    return (
      <Layout>
        <Container className="new-bot-page-container">
          <SuccessModal />
          <Header as="h1" content="Add New Bot" className="page-title" />
          <Grid>
            <Grid.Row>
              <Grid.Column computer={10} tablet={16} mobile={16}>
                {AddNewBotForm}
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
