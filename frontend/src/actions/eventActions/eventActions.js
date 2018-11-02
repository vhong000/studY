
import {
FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST,
FETCH_TOPICS_SUCCESS, FETCH_TOPICS_FAILURE, FETCH_TOPICS_REQUEST,
FETCH_SCHOOLS_SUCCESS, FETCH_SCHOOLS_FAILURE, FETCH_SCHOOLS_REQUEST,
FETCH_SCHOOL_DETAIL_SUCCESS, FETCH_SCHOOL_DETAIL_FAILURE, FETCH_SCHOOL_DETAIL_REQUEST,
} from './ActionTypes';

// FETCH ALL SCHOOLS
export const fetchSchools = () => dispatch => {
  return fetch("/api/schools", {
    method: "GET",
  }).then(response => {
    dispatch({ type: FETCH_SCHOOLS_REQUEST })
    if (response.status !== 200) {
      return Promise.reject({ message: "Unable to fetch schools" });
    } else { return response.json(); }
  }).then(result =>
    dispatch({
      type: FETCH_SCHOOLS_SUCCESS,
      payload: result,
    })
  ).catch(error => 
    dispatch({
      type: FETCH_SCHOOLS_FAILURE,
      payload: error,
    })
  )
}