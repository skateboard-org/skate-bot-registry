import React, { Component } from "react";
import { Button, Header, Modal, Image } from "semantic-ui-react";
import { connect } from "react-redux";

class SuccessModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalState: false,
  };

  componentWillUpdate(nextProps) {
    if (
      nextProps.subscription === "successful" &&
      this.state.modalState === false
    ) {
      console.log(this.state.modalState);
      this.openModal();
    }
  }

  openModal = () => this.setState({ modalState: true });
  closeModal = () => this.setState({ modalState: false });

  render() {
    const { modalState } = this.state;
    return (
      <Modal open={modalState} onClose={this.closeModal}>
        <Header content="Success" basic="true" />
        <Modal.Content image>
          <Image
            wrapped
            size="small"
            src="/img/cherry-success.png"
            centered
            rounded
          />
          <Modal.Description>
            <Header>Successfully added Bot!</Header>
            <p>
              Open Skateboard App and click on 'update' to get your latest bots!
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="pink" size="medium" onClick={() => this.closeModal()}>
            {" "}
            Okay
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ subscription }) => ({ subscription });

export default connect(mapStateToProps, {}, null)(SuccessModal);
