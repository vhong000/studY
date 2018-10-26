
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logoutUser, getUserData } from '../actions/authActions';

function getAsyncState(dispatch) {
  const token = localStorage.getItem('token');
  if (token) { 
    dispatch(getUserData(token)); 
  }
}
