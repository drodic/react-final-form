import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button, FormControl } from 'react-bootstrap';
import { Form, Field } from 'react-final-form'
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <FormControl
    {...input}
    {...rest}
  />
)

const MyForm = () => (
  <Form
    onSubmit={onSubmit}
    initialValues={{ firstName: 'Pero' }}
    render={({ handleSubmit, pristine, invalid, values }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        <div>
          <label>First Name</label>
          <Field name="firstName" type="text" component={TextFieldAdapter} placeholder="First Name" />
        </div>

        <h2>Render Function</h2>
        <Field
          name="bio"
          render={({ input, meta }) => (
            <div>
              <label>Bio</label>
              <FormControl componentClass="textarea" {...input} />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        />

        <h2>Render Function as Children</h2>
        <Field name="phone">
          {({ input, meta }) => (
            <div>
              <label>Phone</label>
              <FormControl type="text" {...input} placeholder="Phone" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>

        <Button
          bsStyle="success"
          bsSize="lg"
          type="submit"
          disabled={pristine || invalid}>
          Submit
        </Button>

        <pre>{JSON.stringify(values, 0, 2)}</pre>
      </form>
    )}
  />
)

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
            <h1>Welcome to React</h1>
            <MyForm />
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
