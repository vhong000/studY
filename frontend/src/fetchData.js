
export function registerUser(newUser) {
	return fetch("http://localhost:8000/api/auth/signup", {
		method: "POST",
		mode: "no-cors",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newUser),
	}).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else { throw Error("Unable to Sign up"); }
	}).then((jsonData) => {
		console.log(jsonData);
	}).catch((error) => {
		console.log(error);
	})
}

export function loginUser(user) {
	return fetch("http://localhost:8000/api/auth/login", {
		method: "POST",
		mode: "no-cors",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user),
	}).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else { throw Error("Unable to Login"); }
	}).then((jsonData) => {
		console.log(jsonData);
	}).catch((error) => {
		console.log(error);
	})

}
