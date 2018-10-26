
export function registerUser(newUser) {
	return fetch("/api/auth/signup", {
		method: "POST",
		mode: "no-cors",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newUser),
	}).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else { throw Error("Unable to Sign up"); }
	}).then((jsonData) => {
		console.log(jsonData);
	}).catch((error) => {
		console.log(error);
	})
}

export function loginUser(user) {
	debugger;
	return fetch("/api/auth/login", {
		method: "POST",
		// mode: "no-cors",
		headers: {
			'Content-Type': 'application/json',
			"Access-Control-Allow-Origin": '*'
		},
		body: JSON.stringify(user),
		credentials: "include"
	}).then((response) => {
    if (response.status === 200) {
      return response.json();
	// } else { throw Error("Unable to Login");
 }
	}).then((jsonData) => {
		console.log(jsonData);
	}).catch((error) => {
		console.log(error);
	})

}
