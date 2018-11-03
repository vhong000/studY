
// LOGIN USER
export const loginUser = (user) => {
  return fetch("/api/auth/login", {
    method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"Access-Control-Allow-Origin": '*'
		},
		body: JSON.stringify(user),
		credentials: "include"
	}).then((response) => {
    if (response.status === 200) {
      return response.json(); 
    } else if (response.status === 400) { 
      return Promise.reject({message: "Wrong email or password"});
    } else { return Promise.reject({ message: "Unable to login" })}
  })
}

// GET USER DATA
export const getUserData = (token) => {
  return fetch("/api/profile", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    }
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({ message: "Unable to get user data" });
    } else { return response.json(); }
  }).catch(error => {
    return error;
  });
}

// REGISTER USER
export const registerUser = (newUser) => {
  return fetch("/api/auth/signup", {
    method: "POST",
		headers: {
      'Content-Type': 'application/json', 
      "Access-Control-Allow-Origin": '*'
    },
		body: JSON.stringify(newUser),
	}).then((response) => {
    if (response.status === 400) {
      return Promise.reject({ message: "Email unavailable" });
    } else if (response.status === 201) { return response.json(); }
    else { Promise.reject({ message: "Unable to Register" })}
  })
}

export const fetchSchools = () => {
  return fetch("/api/schools", {
    method: "GET",
  }).then(response => {
    if (response.status !== 200) {
      return Promise.reject({ message: "Unable to fetch schools" });
    } else { return response.json(); }
  }).catch(error => { 
    return error;
  })
}
