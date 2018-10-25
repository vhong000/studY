
import { loginUser } from '../fetchData';
import { 
  AUTH_TOKEN_SUCCESS, AUTH_TOKEN_FAILURE, AUTH_TOKEN_REQUEST 
} from '../actions/ActionTypes';

const initialState = {
  token: '',
  user: '',
  loading: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case AUTH_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload,
    }
    default: return state;
  }
}