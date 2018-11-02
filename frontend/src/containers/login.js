
import React, { Component } from 'react';

import { Login } from '../components';
import { AuthContext, AuthWrapper } from '../contexts/Auth.context';
import { withFormik } from 'formik';

class loginWrapper extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <Login {...this.props} {...this.context} />
    )
  }
}

export default (loginWrapper);