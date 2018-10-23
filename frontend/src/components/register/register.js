import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, 
	TextField, withStyles, Typography, Input,
	Grid
} from '@material-ui/core';
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
		let eduEmail = this.state.eduEmail;

		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				eduEmail = emailValid && emailValid.includes('cuny.') && emailValid.includes('edu') ? true : false; 
				console.log("Email[1]: ",emailValid, eduEmail);
				validations.email = emailValid ? '' : 'is invalid';
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
			passwordValid: passwordValid,
			eduEmail:eduEmail
		}, this.validateFrom)
	}


	validateFrom() {
		this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.eduEmail});
	}

	errorClass(error) {
		return (error.lenght === 0 ? '' : 'has-error')
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<Grid container justify='center' >
					<Grid container direction='column' xs='6' spacing='32' >

						<Grid container item direction='row' spacing='16' >
							<Grid item xs='6'>
								<TextField
									id='first_name' label='First' type='text'
									variant='filled' onChange={this.handleChange}
									fullWidth
								/>
							</Grid>

							<Grid item xs='6'>
								<TextField
									id='last_name' label='Last' type='text'
									variant='filled' onChange={this.handleChange}
									fullWidth
								/>
							</Grid>
						</Grid>

						<Grid container item direction='row' spacing='16'>
							<Grid item xs='8' >
								<TextField
									id='email' label='E-mail' type='text'
									variant='filled' onChange={this.handleChange}
									fullWidth
								/>
							</Grid>

							<Grid item xs='4' >
								<TextField
									id='password' label='Password' type='password'
									variant='filled' onChange={this.handleChange}
									fullWidth
								/>
							</Grid>
						</Grid>

						<Grid item>
							<TextField
								id='school' label='School' type='text'
								variant='filled' onChange={this.handleChange}
								placeholder="eg. City College" 
								fullWidth
							/>
						</Grid>

						<Grid container item justify='center'>
							<Button
								type='submit'
								children="Register"
								onClick={this.handleSubmit}
								fullWidth
							/>
						</Grid>

					</Grid>
				</Grid>
			</form>

		)
	}
}
