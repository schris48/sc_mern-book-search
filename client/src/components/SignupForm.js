import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ADD_USER } from '../utils/mutations';
//import { createUser } from '../utils/API';
// import { addUser } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks'

const SignupForm = () => {
  // create user
  const [createUser, { error }] = useMutation(ADD_USER);
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser({
        variables: {...userFormData}
      });

      Auth.login(response.createUser.token);
    } catch (e) {
      console.error(e);
      setRevealAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>

    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setRevealAlert(false)} reveal={revealAlert} variant='danger'>
        Signup failed!
      </Alert>
      <Form.Group>
        <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
          type='text'
          placeholder='Enter username'
          name='username'
          onChange={handleInputChange}
          value={userFormData.username}
          required
          />
          <Form.Control.Feedback
          type='invalid'>Please enter a username!
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
          type='email'
          placeholder='Enter email address'
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
          required
          />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter a password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Please enter a password!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
        {error && <div>Sign up failed</div>}
      </Form>
    </>
  );
};

export default SignupForm;
