import "./NewBot.css";

import React, { Component } from "react";
import {
  Container,
  Grid,
  Header,
  Button,
  Icon,
  Form,
  Select,
  Input,
  TextArea,
  Radio,
  Dropdown,
  Message
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
  createNewBotAction
} from "../../actions";
import PropTypes from "prop-types";
import SuccessModal from "../SuccessModal/SuccessModal";

class Channel extends Component {
  state = {
    parameterOptionsDropdown: [],
    parameterOptions: [],
    didBotGetAddedSuccessfully: false,
    didBotAddingFailed: false,
    isLoading: false,
    responseType: null,
    parameterEnabled: false
  };

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

  handleAddParameterOption(event, { value }){
    this.setState((prevState) => ({
        parameterOptionsDropdown: [{ text: value, value }, ...prevState.parameterOptionsDropdown]
    }))
    this.setState((prevState) => ({
        parameterOptions: [value, ...prevState.parameterOptions]
    }))
  }

  handleResponseTypeSelection(event, {value}){
    this.setState({responseType: value})
  }

  handleParameterEnabledRadio(event, {value}){
    this.setState((prevState) => {
      return {parameterEnabled: !prevState.parameterEnabled}
    });
  }

  isValidString(str){
    if((typeof str === 'string') && str.length > 0){
      return true;
    }
  }

  handleInvalidStrings(field, value){
    if(!this.isValidString(value)){
      alert(field + " is required.")
      return false;
    } else {
      return true;
    }
  }


  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    let submitableObj = {}
    let isDataValid = true;
    for (var value of data.entries()) {
      if(isDataValid){
        if(value[0] === 'name'){
          isDataValid = this.handleInvalidStrings('Bot Name', value[1])
        }
        if(value[0] === 'title'){
          isDataValid = this.handleInvalidStrings('Bot Title', value[1])
        }
        if(value[0] === 'desc'){
          isDataValid = this.handleInvalidStrings('Bot Description', value[1])
        }
        if(value[0] === 'url'){
          isDataValid = this.handleInvalidStrings('URL', value[1])
        }
        if(value[0] === 'icon'){
          isDataValid = this.handleInvalidStrings('Bot Icon', value[1])
        }
      }
    }

    if(isDataValid){
      isDataValid = this.handleInvalidStrings('Response Type', this.state.responseType)
    }

    if(isDataValid){
      for (var formFields of data.entries()) {
          submitableObj[formFields[0]] = formFields[1]
      }
      submitableObj.name = '@' + submitableObj.name;
      submitableObj.responseType = this.state.responseType;
      submitableObj.parameterEnabled = this.state.parameterEnabled;
      submitableObj.parameterOptions = this.state.parameterOptions;
      submitableObj.author = 'eOU7JfTHYdPRxEV7ynsib9K09EH3';

      this.props.createNewBotAction(submitableObj);
    }
  }

  render() {

    const ResponseTypeOptions = [
      { key: 'ListOfText', text: 'List Of Text', value: 'ListOfText' },
      { key: 'ListOfImages', text: 'List Of Images', value: 'ListOfImages' },
      { key: 'ListOfGifs', text: 'List Of Gifs', value: 'ListOfGifs' },
      { key: 'ListOfLinks', text: 'List Of Links', value: 'ListOfLinks' },
      { key: 'Command', text: 'Command', value: 'Command' }
    ]

      console.log(this.props.newBot)


    const AddNewBotForm = (
      <Form success={this.props.newBot.success} error={this.props.newBot.success === false} loading={this.props.newBot.loading} onSubmit={(event) => this.handleSubmit(event)}>
        <Form.Field>
          <label>Bot Name</label>
          <Input iconPosition='left' placeholder='define'>
            <Icon name='at' />
            <input
              name="name"
            />
          </Input>
            <p className="form-tip">
              Enter botname without '@' symbol.
            </p>
        </Form.Field>
        <Form.Field>
          <label>Bot Title</label>
          <input placeholder="Dictionary Bot"
            name="title"
          />
        </Form.Field>
        <Form.Field>
          <label>Icon</label>
          <input placeholder="fas fa-spell-check"
            name="icon"
          />
          <p className="form-tip">
            Only Font Awesome identifier strings allowed.
          </p>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <TextArea
            name="desc"
          placeholder='Finds meaning of any word from the English language' />
        </Form.Field>
        <Form.Field>
          <label>URL</label>
          <input placeholder="https://cloudbot.com/endpoint"
            name="url"
          />
        </Form.Field>
        <Form.Field>
          <label>Respone Type</label>
          <Select placeholder='Response Type' options={ResponseTypeOptions}
          onChange={(event, data) => this.handleResponseTypeSelection(event, data)}
          />
        </Form.Field>
        <Form.Field>
          <label>Parameter</label>
          <Radio toggle
            name="parameterEnabled"
            onChange={(event, data) => this.handleParameterEnabledRadio(event, data)}
          />
          <p className="form-tip">
            Does the bot requires a parameter?s
          </p>
        </Form.Field>
        <Form.Field>
          <label>Parameter Options</label>
          <Dropdown
            placeholder='Select Friend'
            fluid
            search
            selection
            multiple
            allowAdditions
            onAddItem={(event, data) => this.handleAddParameterOption(event, data)}
            options={this.state.parameterOptionsDropdown}
            name="parameterOptions"
          />
          <p className="form-tip">
            Only enter if the bot requires a parameter?
          </p>
        </Form.Field>
          <Message
            success
            header='Bot Added'
            content="You've successfully added the bot. It will be added to the repository if approved."
          />
          <Message
            error
            header='Bot could not be added'
            content='This error occured while trying to add the bot.'
          />
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

const mapStateToProps = ({ auth, newBot }) => ({
  auth,
  newBot
});

export default connect(mapStateToProps, {
  openSignUpModal,
  subscribeChannel,
  unSubscribeChannel,
  getChannelState,
  getAllBotsAction,
  createNewBotAction
})(Channel);
