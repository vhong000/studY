import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, TextField, withStyles, Typography, Input } from '@material-ui/core';
import FormError from './FormError';
import { Alert } from '../../utils/Lines';
// more components at https://material-ui.com/getting-started/usage/

export default class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			first_name: "",
			last_name: "",
			password: "",
			school: "",
			major: "",
			formErrors: { email: '', password: '' },
			emailValid: false,
			passwordValid: true,
			passwordRepeat:'',
			formValid: false,
			registered: false,
			// probably more, not final,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}




	handleChange(event) { // update state on input change
		const value = event.target.value
		const name = event.target.name
		this.setState(
			{ [name]: value },
			() => { this.validateField(name, value) });
		console.log(event.target.value);

	}

	handleSubmit(event) { // submit user state as json body
		//console.log(this.state);
		const { email, first_name, last_name, password, school } = this.state;
		let applicant = {
			email: email,
			first_name: first_name,
			last_name: last_name,
			password: password,
			school: school,
		}
		this.setState({ 
			registered: this.state.formValid,
			email:'', 
			first_name:'',
			last_name:'', 
			password:'',
			passwordRepeat:'', 
			school:''  });
		event.preventDefault();
	}


	validateField(fieldName, value) {
		let validations = this.state.formErrors;
		console.log(validations)
		let emailValid = this.state.emailValid;
		let passwordValid = this.state.passwordValid;

		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				validations.email = emailValid ? '' : 'is valid';
				break;

			case 'password':
				// right now do nothing
				break;

			default:
				break;

		}

		this.setState({
			formErrors: validations,
			emailValid: emailValid,
			passwordValid: passwordValid
		}, this.validateFrom)
	}


	validateFrom() {
		this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
	}

	errorClass(error) {
		return (error.lenght === 0 ? '' : 'has-error')
	}

	render() {
		const RegisterHeader = () => {
			return (
				<AppBar position='static' >
					<Toolbar>
						<Typography
							style={{ flex: 1 }}
							variant='headline'
							color='inherit'>
							StudY
					</Typography>
						<Button
							component={Link}
							to="/login"
							className='login-button'
							children="Login"
							color='inherit' />
					</Toolbar>
				</AppBar>
			)
		}

		const renderCheckEmail = <Alert.Primary outerClassName={"col-sm-12 col-md-12 top-pad"} label={`Please confirm your email at ${this.state.email} to complete with the registration process`} />;

		const RenderForm = () => {

			return (
				<form onSubmit={this.handleSubmit}>
					<div className={"container  center"}>
						<div className="panel panel-default">
							<FormError formErrors={this.state.formErrors} />
						</div>
						<label htmlFor={"first_name"} className={"top-pad"}><b>First Name</b></label>
						<input type={"text"} placeholder={"First name"} name={"first_name"} className={"form-control"} onChange={this.handleChange} value={this.state.first_name} required></input>

						<label htmlFor={"Last_name"}><b>Last Name</b></label>
						<input type={"text"} placeholder={"First name"} name={"last_name"} onChange={this.handleChange} value={this.state.last_name} required></input>

						<div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
							<label htmlFor={"email"}><b>Email</b></label>
							<input type="text" placeholder="Enter Email" name="email" className="form-control" onChange={this.handleChange} value={this.state.email} required></input>
						</div>

						<div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
							<label htmlFor="password"><b>Password</b></label>
							<input type="password" placeholder="Enter Password" name="password" className="form-control" onChange={this.handleChange} value={this.state.password} required></input>
						</div>

						<label htmlFor="passwordRepeat"><b>Repeat Password</b></label>
						<input type="password" placeholder="Repeat Password" name="passwordRepeat" onChange={this.handleChange} value={this.state.passwordRepeat} required></input>

						<label htmlFor="school"><b>School</b></label>
						<input type="text" placeholder="eg. City College" name="school" onChange={this.handleChange} value={this.state.school}></input>

						<button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Register</button>
						{this.state.registered && renderCheckEmail}

					</div>

				</form>
			)

		}
		return (
			<div>
				{RegisterHeader()}
				{RenderForm()}
			</div>

		)
	}

}