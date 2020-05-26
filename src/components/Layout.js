import './Layout.css'
import React, { Component } from "react";
import TopBar from './TopBar'
import Footer from './Footer'
import SignInModal from './SignInModal'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import GA from '../config/ga';

class Layout extends Component {

  state = {}

  componentDidMount(){
    GA.init();
  }

  render() {
    const { children } = this.props

    return (
        <div className={'site'}>
        <div className={'site-content'}>
          <TopBar />
          <SignInModal />
          {children}
        </div>
        <Footer />
        </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node,
}

function mapStateToProps({ auth, signUpModal }) {
  return { 
    auth
  };
}


export default connect(mapStateToProps, null)(Layout);
