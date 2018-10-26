
import { loginUser } from '../fetchData';
import { 
  AUTH_TOKEN_SUCCESS, AUTH_TOKEN_FAILURE, AUTH_TOKEN_REQUEST, 
  FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_USER_REQUEST,
  USER_LOGOUT,
} from '../actions/ActionTypes';
import store from '../store';

const initialState = {
  token: localStorage.getItem('token'),
  user: '',
  loading: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case AUTH_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
    }
    case AUTH_TOKEN_REQUEST:
    return {
      ...state,
      loading: true,
    }
    case AUTH_TOKEN_FAILURE:
    return {
      ...state,
      error: action.payload,
    }
    case FETCH_USER_SUCCESS:
    return {
      ...initialState,
      user: action.payload,
    }
    case FETCH_USER_FAILURE:
    return {
      ...state,
      error: action.payload,
    }
    case FETCH_USER_REQUEST:
    return {
      ...state,
      loading: true,
    }
    case USER_LOGOUT:
    return {
      ...initialState,
      token: '',
    }
    default: return state;
  }
}