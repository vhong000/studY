
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from '../components';
import { logoutUser, getUserData } from '../actions/authActions';

class Wrapper extends Component  {

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) { 
      this.props.dispatch(getUserData(token)); 
    }
  }

  render() {
    return ( 
      <Header {...this.props} />
    )
  }
}


function mapStateToProps(state) {
  return { 
    user: state.Authenticate.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLogout() { dispatch(logoutUser()); }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wrapper);