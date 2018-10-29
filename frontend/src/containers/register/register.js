
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { Register } from '../../components';
import { registerUser } from '../../actions/authActions/authActions';
import { fetchSchools } from '../../actions/eventActions/eventActions';

class Wrapper extends Component  {

  componentDidMount() {
    this.props.dispatch(fetchSchools()); 
  }

  render() {
    return ( 
      <Register {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  const selector = formValueSelector('registerForm');
  const {
    firstName, lastName, email,
    password, school, major,
  } = selector(state,
    'firstName', 'lastName', 'email',
    'password', 'school', 'major'
  );
  return {
    schools: state.Event.allSchools.results,
    applicant: {
      first_name: firstName, 
      last_name: lastName, 
      email: email,
      password: password, 
      school: school, 
      major: major,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSubmit(newUser, history) { dispatch(registerUser(newUser, history)); }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'registerForm',
})(Wrapper));