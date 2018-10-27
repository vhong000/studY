
import { 
  AUTH_TOKEN_SUCCESS, AUTH_TOKEN_FAILURE, AUTH_TOKEN_REQUEST,
  FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, 
  USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
  USER_LOGOUT,
} from './ActionTypes';

// LOGIN USER
export const loginUser = (user) => dispatch => {
  return fetch("/api/auth/login", {
    method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"Access-Control-Allow-Origin": '*'
		},
		body: JSON.stringify(user),
		credentials: "include"
	}).then((response) => {
    dispatch({ type: AUTH_TOKEN_REQUEST })
    if (response.status !== 200) {
      return Promise.reject({ message: "Unable to Login" });
    } else { return response.json(); }
  }).then(result => { 
    localStorage.setItem('token', result.token);
    dispatch(getUserData(result.token)).then(
      dispatch({
        type: AUTH_TOKEN_SUCCESS,
        payload: result,
      })
    )
  }).catch(error => 
    dispatch({
      type: AUTH_TOKEN_FAILURE,
      payload: error,
    })
  )
}

// GET USER DATA
export const getUserData = (token) => dispatch => {
  return fetch("/api/auth/user", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    }
  }).then((response) => {
    dispatch({ type: FETCH_USER_REQUEST })
    if (response.status !== 200) {
      return Promise.reject({ message: "Unable to get user data" });
    } else { return response.json(); }
  }).then(result =>
    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: result,
    })
  ).catch(error => 
    dispatch({
      type: FETCH_USER_FAILURE,
      payload: error,
    })
  )
}

// LOGOUT USER
export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  return dispatch({ type: USER_LOGOUT });
}

// REGISTER USER
export const registerUser = (newUser) => dispatch => {
  return fetch("/api/auth/signup", {
    method: "POST",
    mode: "no-cors",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newUser),
	}).then((response) => {
    dispatch({ type: USER_REGISTER_REQUEST })
    if (response.status !== 201) {
      return Promise.reject({ message: "Unable to Register" });
    } else { return response.json(); }
  }).then(result =>
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: result,
    })
  ).catch(error =>
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error,
    }))
}