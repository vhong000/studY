
import {
FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST,
FETCH_TOPICS_SUCCESS, FETCH_TOPICS_FAILURE, FETCH_TOPICS_REQUEST,
FETCH_SCHOOLS_SUCCESS, FETCH_SCHOOLS_FAILURE, FETCH_SCHOOLS_REQUEST,
FETCH_SCHOOL_DETAIL_SUCCESS, FETCH_SCHOOL_DETAIL_FAILURE, FETCH_SCHOOL_DETAIL_REQUEST,
} from '../actions/eventActions/ActionTypes';

const initialState = {
  allSchools: [],
  allCategories: [],
  allTopics: [],
  loading: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_SCHOOLS_REQUEST:
    return { ...state, loading: true }
    case FETCH_SCHOOLS_SUCCESS:
    return { ...state, allSchools: action.payload }
    case FETCH_SCHOOLS_FAILURE:
    return { ...state, error: action.payload }
    default: return state;
  }
}