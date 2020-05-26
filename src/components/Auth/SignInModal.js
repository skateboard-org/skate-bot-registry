import { Button, Header, Icon, Modal } from "semantic-ui-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, closeSignUpModal } from "../../actions";

class SignInModal extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.props.closeSignUpModal();
    }
  }

  render() {
    const { signUpModal, closeSignUpModal, signIn } = this.props;

    return (
      <Modal open={signUpModal} onClose={closeSignUpModal} size="small">
        <Header
          icon="sign in"
          content="Sign Up for Skateboard"
          textAlign="center"
        />
        <Modal.Content image>
          <p>
            Not using Skateboard? Sign up, get alerts about things you&apos;d
            love to hear about.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" size="big" onClick={signIn}>
            <Icon name="google" /> Log In with Google
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps({ auth, signUpModal }) {
  return { auth, signUpModal };
}

export default connect(
  mapStateToProps,
  {
    signIn,
    closeSignUpModal,
  },
  null,
  { forwardRef: true }
)(SignInModal);
