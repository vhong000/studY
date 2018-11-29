
/* eslint-disable */

// LOGIN USER
export const loginUser = user => fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(user),
  credentials: 'include',
}).then((response) => {
  if (response.status === 200) {
    return response.json();
  } if (response.status === 400) {
    return Promise.reject({ message: 'Wrong email or password' });
  } return Promise.reject({ message: 'Unable to login' });
});

// GET USER DATA
export const getUserData = token => fetch('/api/profile', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get user data' });
  } return response.json();
}).catch(error => error);

// REGISTER USER
export const registerUser = newUser => fetch('/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(newUser),
}).then((response) => {
  if (response.status === 400) {
    return Promise.reject({ message: 'Email unavailable' });
  } if (response.status === 201) { return response.json(); }
  Promise.reject({ message: 'Unable to Register' });
});
// FETCH SCHOOLS
export const fetchSchools = () => fetch('/api/schools', {
  method: 'GET',
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to fetch schools' });
  } return response.json();
}).catch(error => error);
// FETCH ALL THE EVENTS
// http://localhost:8000/api/events?topic
export const fetchAllEvents = () => fetch('/api/events', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Token ' + token,
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get events' });
  } return response.json();
}).catch(error => error);
export const fetchEventByTopic = id => fetch(`/api/events?topic=${id}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Token ' + token,
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get events' });
  } return response.json();
}).catch(error => error);

// FETCH EVENT BY ID
export const fetchEvent = id => fetch(`/api/events/${id}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Token ' + token,
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get events' });
  } return response.json();
}).catch(error => error);

// FETCH EVENT ATTENDEES
export const fetchEventAttendees = id => fetch(`/api/events/${id}/attendees`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Token ' + token,
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get events attendees' });
  } return response.json();
}).catch(error => error);

export const fetchEventsByUserId = (id) => {
  return fetch(`/api/events?userId=${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Token ' + token,
    }
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({ message: "Unable to get events" });
    } else { return response.json(); }
  }).catch(error => {
    return error;
  });

}

// FETCH SCHOOL DETAILS
export const fetchSchoolDatails = id => fetch(`/api/schools/${id}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Token ' + token,
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get school' });
  } return response.json();
}).catch(error => error);

export const fetchCategories = () => fetch('/api/categories', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get categories' });
  } return response.json();
}).catch(error => error);

// FETCH ONE CATEGORY

export const fetchCategory = id => fetch(`/api/categories/${id}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get category' });
  } return response.json();
}).catch(error => error);

// FETCH ALL SUBTOPICS
export const fetchSubtopics = () => fetch('/api/topics', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get subtopics' });
  } return response.json();
}).catch(error => error);

// Join Event
export const JoinEvent = (eventId, token) => fetch(`/api/events/${eventId}/attendees`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get events' });
  } return response.json();
}).catch(error => error);

export const leaveEvent = (eventId, token) => fetch(`/api/events/${eventId}/attendees`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get events' });
  } return response.json();
}).catch(error => error);


export const deleteEvent = (eventId, token) => fetch(`/api/events/${eventId}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  },
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to get events' });
  } return response.json();
}).catch(error => error);

// CREATE EVENT
export const createEvent = (event, token) => fetch('/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  },
  body: JSON.stringify(event),
}).then((response) => {
  if (response.status !== 200) {
    return Promise.reject({ message: 'Unable to create event' });
  } return response.json();
}).catch(error => error);
