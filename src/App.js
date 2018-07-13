import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
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

const FieldGroupAdapter = ({ id, label, help, input, meta, type, ...rest }) => {
  console.log(id, label, help, input, meta, type, rest);
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...input} {...rest} />
      {help && <HelpBlock>{help}</HelpBlock>}
      {meta && meta.touched && meta.error && <span>{meta.error}</span>}
    </FormGroup>
  );
};

FieldGroupAdapter.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number"])
};

const typesEnum = Object.freeze({
  Text: "text",
  Number: "number"
});

const TextGroupAdapter = ({ id, label, help, input, meta, type, ...rest }) => {
  console.log(id, label, help, input, meta, type, rest);
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass="textarea" {...input} {...rest} />
      {help && <HelpBlock>{help}</HelpBlock>}
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </FormGroup>
  );
};

TextGroupAdapter.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["textarea"]).isRequired
};

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
      <Fragment>
        <h3>Outside Final Form</h3>
        <FieldGroupAdapter
          id="fName"
          name="firstName"
          type={typesEnum.Text}
          label="First Name"
          onChange={e => console.log(e.target.value)}
        />
        <Form
          onSubmit={onSubmit}
          initialValues={this.state.data}
          render={({ handleSubmit, pristine, invalid, values }) => (
            <form onSubmit={handleSubmit}>
              <h3>Inside Final Form</h3>
              <Field
                id="fName"
                name="firstName"
                type="text"
                label="First Name"
                component={FieldGroupAdapter}
                placeholder="First Name"
                required={true}
              />
              <Field
                id="lName"
                name="lastName"
                type="text"
                label="Last Name"
                component={FieldGroupAdapter}
                placeholder="Last Name"
              />
              <Field
                id="bio"
                name="bio"
                type="textarea"
                label="Bio"
                component={TextGroupAdapter}
                placeholder="Bio"
              />
              <Field
                id="phone"
                name="phone"
                type="text"
                label="Phone"
                component={FieldGroupAdapter}
                placeholder="Phone"
              />

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
      </Fragment>
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
