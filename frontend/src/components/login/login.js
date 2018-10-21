import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classes from './login.module.css';
// more components at https://material-ui.com/getting-started/usage/

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				email: "",
				password: "",
			}
    }		
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  // update state on input change
	handleChange(event, name) {
		this.setState({
			user: {
				...this.state.user,
				[name]: event.target.value
			}
		});
	}

 	// submit user state as json body
	handleSubmit(event) {
		event.preventDefault();
		const data = JSON.stringify(this.state.user);
		document.getElementById("myForm").reset();
		console.log(data);
	}

	render() {

		return (
			<form className={classes.Form} id="myForm"
				onSubmit={e => this.handleSubmit(e)}>
					<div className={classes.Login }>
						<p>Login To My Account</p>
					</div>
					<div className={classes.Outer}>
						<div>	
							<TextField
								id="filled-email-input"
								label="Email"
								className={classes.TextField}
								type="email"
								name="email"
								autoComplete="email"
								margin="normal"
								variant="filled"
								onChange={e => this.handleChange(e, 'email')}
							/>
						</div>
						<div>
							<TextField
								className={classes.TextField}
								id="filled-password-input"
								label="Password"
								type="password"
								autoComplete="current-password"
								margin="normal"
								variant="filled"
								onChange={e => this.handleChange(e, 'password')}
								/>
						</div>
						<div>
							<button type="submit"  className={classes.Button}>Login</button>
						</div>
						<div>
							<Button href="./register" className={classes.RegisterButton}>New Register?</Button>
						</div>
					</div>
			</form>
  )
}
