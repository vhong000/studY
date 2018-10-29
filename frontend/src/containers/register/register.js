
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Register } from '../components';
import { registerUser } from '../../actions/authActions/authActions';
import { fetchSchools } from '../../actions/eventActions/eventActions';

class Wrapper extends Component  {

  componentDidMount() {
    this.props.dispatch(fetchSchools); 
  }

  render() {
    return ( 
      <Register {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    schools: state.Event.allSchools.results,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSubmit(newUser) { dispatch(registerUser(newUser)); }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wrapper);