
import { 
  AUTH_TOKEN_SUCCESS, AUTH_TOKEN_FAILURE, AUTH_TOKEN_REQUEST 
} from './ActionTypes';

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
  }).then(result =>
    dispatch({
      type: AUTH_TOKEN_SUCCESS,
      payload: result,
    })
  ).catch(error => 
    dispatch({
      type: AUTH_TOKEN_FAILURE,
      payload: error,
    })
  )
}

export const getUserData = (token) => dispatch => {
  return fetch("/api/auth/user", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    }
  })
}