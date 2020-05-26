import './Home.css'
import React, {Component} from "react";
import {Container, Header, Button, Icon, Segment} from 'semantic-ui-react'
import Layout from './Layout'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga';

class HomePage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  getStarted() {
    this
      .context
      .router
      .history
      .push('/channel/exhibitions-in-delhi-ncr')
  }

  componentDidMount(){
    ReactGA.pageview('/');
  }

  render() {

    return (
      <Layout>
        <Segment
          textAlign='center'
           vertical
          className={'home-image'}>
          <Container text>
            <Header
              as='h1'
              content='PingMe'
              inverted
              className={'home-heading'}
              />
            <Header
              as='h2'
              content='connect with your industry'
              inverted
              className={'home-subheading'}
             />
            <Button primary size='huge' className={'home-get-started-button'} onClick={() => this.getStarted()}>
              Get Started
              <Icon name='right arrow'/>
            </Button>
          </Container>

        </Segment>
      </Layout>
    )
  }
}

export default HomePage