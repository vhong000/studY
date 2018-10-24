import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classes from './login.module.css';
// more components at https://material-ui.com/getting-started/usage/

import { loginUser } from '../../fetchData';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				username: "",
				password: "",
			}
    }		
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  // update state on input change
	handleChange(event) {
		this.setState({
			user: {
				...this.state.user,
				[event.target.id]: event.target.value
			}
		});
		//console.log(event.target.value);
	}

 	// submit user state as json body
	handleSubmit(event) {
		event.preventDefault();
		const data = JSON.stringify(this.state.user);
		console.log(data);
		document.getElementById("myForm").reset();
		loginUser(data);
	}

	render() {

		return (
			<form className={classes.Form} id="myForm"
				onSubmit={this.handleSubmit}>
					<div className={classes.Login }>
						<p>Login To My Account</p>
					</div>
					<div className={classes.Outer}>
						<div>	
							<TextField
								id="username"
								label="Email"
								className={classes.TextField}
								type="text"
								name="email"
								autoComplete="email"
								margin="normal"
								variant="filled"
								onChange={this.handleChange}
							/>
						</div>
						<div>
							<TextField
								className={classes.TextField}
								id="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								margin="normal"
								variant="filled"
								onChange={this.handleChange}
								/>
						</div>
						<div>
							<button type="submit" className={classes.Button}>Login</button>
						</div>
						<div>
							<Button 
								className={classes.RegisterButton}
								component={Link}
								to="/register" 
								children="Sign Up"
							/>
							
						</div>
					</div>
			</form>
		)
	}
}
