import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  Grid,
  Navbar,
  Jumbotron,
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";
import { Form, Field } from "react-final-form";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./App.css";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const FieldGroupAdapter = ({ id, label, help, input, meta, ...rest }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} {...rest} />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

class MyForm extends Component {
  state = {
    data: {
      firstName: "Pero",
      lastName: "Perić"
    }
  };

  render() {
    return (
      <Form
        onSubmit={onSubmit}
        initialValues={this.state.data}
        render={({ handleSubmit, pristine, invalid, values }) => (
          <form onSubmit={handleSubmit}>
            <h3>Simple Default Input</h3>
            <Field
              name="firstName"
              type="text"
              label="First Name"
              component={FieldGroupAdapter}
              placeholder="First Name"
            />
            <Field
              name="lastName"
              type="text"
              label="Last Name"
              component={FieldGroupAdapter}
              placeholder="Last Name"
            />

            <h3>Render Function</h3>
            <Field
              name="bio"
              render={({ input, meta }) => (
                <div className="form-group">
                  <label>Bio</label>
                  <FormControl componentClass="textarea" {...input} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />

            <h3>Render Function as Children</h3>
            <Field name="phone">
              {({ input, meta }) => (
                <div className="form-group">
                  <label>Phone</label>
                  <FormControl type="text" {...input} placeholder="Phone" />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <div className="form-group">
              <Button
                bsStyle="success"
                bsSize="lg"
                type="submit"
                disabled={pristine || invalid}
              >
                Submit
              </Button>
              <Link to="/about" className="btn btn-lg btn-primary">
                About
              </Link>
            </div>

            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <Router>
              <Switch>
                <Route exact path="/" component={MyForm} />
                <Route path="/about" component={About} />
              </Switch>
            </Router>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
