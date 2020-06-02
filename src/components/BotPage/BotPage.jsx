import './BotPage.css';

import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  Button,
  Statistic,
  Responsive,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import Layout from '../Layout/Layout';
import {
  getBotAction,
  openSignUpModal,
  subscribeBotAction,
  unsubscribeBotAction,
  getBotStatusAction,
} from '../../actions';
import SuccessModal from '../SuccessModal/SuccessModal';

class Channel extends Component {
  constructor(props) {
    super(props);

    const {
      match: { params }, getBotAction, getBotStatusAction, auth,
    } = props;

    if (params.botName !== undefined && params.botName !== '') {
      if (auth) {
        getBotStatusAction(params.botName, auth);
      }
      getBotAction(params.botName);
    } else {
      this.context.router.history.push('/browse');
    }


    this.state = {
      activeIndex: -1,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    ReactGA.pageview(`/bot/${params.botName}`);
  }

  componentWillUpdate(nextProps) {
    const { match: { params } } = this.props;
    if (this.props.auth !== nextProps.auth) {
      this.props.getBotStatusAction(params.botName, nextProps.auth);
    }
  }

  handleRegister() {
    if (this.props.auth) {
      const {
        match: { params }, subscription, subscribeBotAction, unsubscribeBotAction,
      } = this.props;
      if (subscription === 'ready' || !subscription) {
        subscribeBotAction(params.botName);
      } else if (
        subscription === 'successful'
        || subscription === 'already'
      ) {
        unsubscribeBotAction(params.botName);
      }
    } else {
      this.props.openSignUpModal();
    }
  }

  render() {
    const { activeIndex } = this.state;
    const { bot, subscription, match: { params } } = this.props;

    const loadingScreen = (
      <Container>
        <Dimmer active inverted className="botpage-dimmer">
          <Loader inverted />
        </Dimmer>
      </Container>
    );


    if (bot === null || bot === undefined) {
      return (
        <Layout>
          {loadingScreen}
        </Layout>
      );
    }

    if (params.botName !== bot.name) {
      return (
        <Layout>
          {loadingScreen}
        </Layout>
      );
    }


    let ButtonText;
    let ButtonColor;
    let ButtonLoading;
    if (subscription === 'already') {
      ButtonText = 'Remove Bot';
      ButtonColor = 'pink';
      ButtonLoading = false;
    } else if (subscription === 'successful') {
      ButtonText = 'Remove Bot';
      ButtonColor = 'pink';
      ButtonLoading = false;
    } else if (subscription === 'loading') {
      ButtonText = 'Please Wait...';
      ButtonColor = 'grey';
      ButtonLoading = true;
    } else if (subscription === 'error' || subscription === 'failed') {
      ButtonText = 'Something went wrong. Retry!';
      ButtonColor = 'red';
      ButtonLoading = false;
    } else if (
      subscription === 'ready'
      || !subscription) {
      ButtonText = 'Click to Add Bot';
      ButtonColor = 'teal';
      ButtonLoading = false;
    }


    // eslint-disable-next-line no-unused-vars
    const relevantNumbers = (
      <Grid columns="equal" centered className="relevant-numbers">
        <Grid.Column textAlign="center">
          <Statistic horizontal size="small">
            <Statistic.Value>1.4k</Statistic.Value>
            <Statistic.Label>Number of Subscibers</Statistic.Label>
          </Statistic>
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Statistic horizontal size="small">
            <Statistic.Value>2</Statistic.Value>
            <Statistic.Label>Emails Per Month</Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid>
    );

    const subscribeChannelButton = () => {
      if (subscription === null) {
        return null;
      }
      return (
        <Button
          loading={ButtonLoading}
          color={ButtonColor}
          size="big"
          fluid
          onClick={() => this.handleRegister()}
        >
          {ButtonText}
        </Button>
      );
    };


    return (
      <Layout>
        <Container>
          <SuccessModal />
          <Grid className="bot-page">
            <Grid.Row>
              <Grid.Column computer={10} tablet={16} mobile={16}>
                <Header size="medium" className="channel-title">
                  {bot.title}
                  <i className={`bot-page-icon ${bot.icon}`} />
                </Header>
                <Header size="huge" className="channel-subtitle">
                  {bot.name}
                </Header>
                <Responsive minWidth={320} maxWidth={991}>
                  {subscribeChannelButton()}
                </Responsive>
                <div className="channel-content">
                  <div className="channel-discription">
                    <Header as="h4">Description</Header>
                    <p className="channel-discription-para">
                      {bot.desc}
                    </p>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column computer={6} tablet={16} mobile={16}>
                <Responsive minWidth={992}>
                  {subscribeChannelButton()}
                </Responsive>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid stackable>
            <Grid.Column computer={10} tablet={16} mobile={16}>
              {subscribeChannelButton}
            </Grid.Column>
          </Grid>
        </Container>
        ;
      </Layout>
    );
  }
}

const mapStateToProps = ({ auth, subscription, bot }) => ({ auth, subscription, bot });

export default connect(mapStateToProps, {
  openSignUpModal,
  subscribeBotAction,
  unsubscribeBotAction,
  getBotStatusAction,
  getBotAction,
})(Channel);
