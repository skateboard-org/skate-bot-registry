import React, { Component } from "react";
import { Menu, Container, Dropdown } from "semantic-ui-react";

import PropTypes from "prop-types";
import SignInModal from "./Auth/SignInModal";
import { connect } from "react-redux";
import { openSignUpModal, signOut } from "../actions";

class TopBar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleTopBarSignIn = this.handleTopBarSignIn.bind(this);
  }

  handleTopBarSignIn() {
    if (this.props.auth) {
      alert("already signed in");
    } else {
      this.props.openSignUpModal();
    }
  }

  goToHome() {
    this.context.router.history.push("/");
  }

  render() {
    let AccountButton;
    if (this.props.auth) {
      AccountButton = (
        <Dropdown item simple text={this.props.auth.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.props.signOut}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      AccountButton = (
        <Menu.Item name={"Sign In"} onClick={this.handleTopBarSignIn} />
      );
    }

    const newBoTPageLink = (
      <Menu.Item
        name={"Add New Bot"}
        onClick={() => {
          this.context.router.history.push("/new-bot");
        }}
      />
    );

    return (
      <Menu fixed="top">
        <Container>
          <Menu.Item as="a" header onClick={() => this.goToHome()}>
            <span role="img" aria-label="circus">
              🎪
            </span>
            &nbsp;&nbsp;skateboard
          </Menu.Item>
          <Menu.Menu position="right">
            {newBoTPageLink}
            {AccountButton}
          </Menu.Menu>
        </Container>
        <SignInModal />
      </Menu>
    );
  }
}

const mapStateToProps = ({ auth, signUpModal }) => {
  return {
    auth,
    signUpModal,
  };
};

export default connect(mapStateToProps, { openSignUpModal, signOut }, null, {
  forwardRef: true,
})(TopBar);
