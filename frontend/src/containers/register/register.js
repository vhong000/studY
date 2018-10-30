
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { Register } from '../../components';
import { registerUser } from '../../actions/authActions/authActions';
import { fetchSchools } from '../../actions/eventActions/eventActions';
import { SubmissionError } from 'redux-form';

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

const selector = formValueSelector('registerForm');

const applicantForm = (state) => {
  const {
    firstName, lastName, email,
    password, school, major,
  } = selector(state,
    'firstName', 'lastName', 'email',
    'password', 'school', 'major'
  );
  return {
    first_name: firstName, 
    last_name: lastName, 
    email: email,
    password: password, 
    school: school, 
    major: major,
  }
}

function mapStateToProps(state) {
  return {
    schools: state.Event.allSchools.results,
    applicant: applicantForm(state),
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    dispatch,
    // onSubmit: (values) => { 
    //   if (values.email && !values.email.includes('.cuny.edu')) {
    //     throw new SubmissionError({
    //       email: 'cuny only',
    //       _error: 'cannot register'
    //     })
    //   }
    //   else {
    //   dispatch(registerUser(applicantForm(state))); 
    //   dispatch(push('/'));
    //   }
    // }
  }
}

const submitValidate = ( values ) => {
  if (values.email && !values.email.includes('.cuny.edu')) {
    throw new SubmissionError({
      email: 'cuny only',
      _error: 'cannot register'
    })
  } else {
    return values;
  }
}

const submitValid = ( result, dispatch, props) => {
  dispatch(registerUser(result, props.history))
}

const submitInvalid = ( errors, dispatch, submitError, props ) => {
  console.log('props', props);
  console.log('sub error', submitError);
  return submitError.errors._error;
}

const validate = values => {
	const errors = {};

	if (values.email && !values.email.includes('.cuny.edu')) {
		errors.email = 'CUNY email required';
	}
	return errors;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'registerForm',
  onSubmit: submitValidate,
  onSubmitSuccess: submitValid,
  onSubmitFail: submitInvalid,
})(Wrapper)
);