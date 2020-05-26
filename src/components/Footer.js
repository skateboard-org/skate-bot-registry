import React from "react";
import { Container, Grid, List, Header, Segment } from "semantic-ui-react";

const Footer = () => (
  <Container className="footer">
    <Segment vertical>
      <Grid divided stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header as="h4" content="Support" />
            <List link>
              <List.Item as="a" href="mailto:support@skateboard.rocks">
                Mail Us
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4">&copy; 2019 Skateboard</Header>
            <p>connect with your industry</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Container>
);

export default Footer;
