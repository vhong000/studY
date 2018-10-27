import React, { Component } from 'react';
import { Button, TextField, Grid, Snackbar, 
		 Typography, withStyles } from '@material-ui/core';
import classes from './register.module.css';
import icon from '../../images/icon.png'
// more components at https://material-ui.com/getting-started/usage/

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
// import classes from './register.module.css';

export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			applicant: {
				email: "",
				first_name: "",
				last_name: "",
				password: "",
				school: "",
				major: "",
				year: '6',
			},
			emailError: false,
			openAlert: false,
			// probably more, not final,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleAlertClose = this.handleAlertClose.bind(this)
	}

	handleChange(event) { // update state on input change
		this.setState({ 
			applicant: {
				...this.state.applicant,
				[event.target.id]: event.target.value,
			}
		})
	}

	handleAlertClose() {
		this.setState({ openAlert: false })
	}

	handleSubmit(event) { // submit user state as json body
		event.preventDefault();
		const { applicant, emailError } = this.state;
		const final = applicant;

		const required = {
			email: applicant.email,
			first_name: applicant.first_name,
			last_name: applicant.last_name,
			password: applicant.password,
			school: applicant.school,
		}

		const isComplete = !Object.values(required).every(x => (x === ''));
		if (isComplete && !emailError) {
			this.props.registerUser(final);

		} else {
			this.setState({ openAlert: true })
		}

	}

	handleEmailChange(event) {
		const currEmail = event.target.value;
		const isValid = !(currEmail.includes('.cuny.edu'));
		this.setState({
			applicant: {
				...this.state.applicant,
				email: event.target.value,
			},
			emailError: isValid,
		})
	}

	render() {
		const { emailError, openAlert } = this.state;
		//const { classes } = this.props;
		return (

			<div className={classes.Container}>
                <div className={classes.PageColumns}>
                    <div className={classes.PageColumn_left}>
                        <div className={classes.Art}>
                        </div>
                    </div>
                    <div className={classes.PageColumn_right}>
                        <div className={classes.ColumnContainer}>
							<div>
								<img alt="icon" src={icon} className={classes.Icon}/>    
							</div>
							<h1 className={classes.Title}>Join the New York City student community.</h1>
							<p className={classes.Text1}>By having a StudY account, you can create, find, and join groups on all of your favourite topics.</p>
							<p className={classes.Text2}>Sign up in just seconds.</p>
							<form className={classes.Form} onSubmit={this.handleSubmit}>
								<Grid container justify='flex-start' >
									<Grid container direction='column' xs='12' spacing='8' >
										<Grid container item direction='row' spacing='16' >
											<Grid item xs='6'>
												<TextField InputProps={{className: classes.TextField}}
													id='first_name' label='First' type='text'
													variant='outlined' onChange={this.handleChange}
													fullWidth required
												/>
											</Grid>
											<Grid item xs='6'>
												<TextField InputProps={{className: classes.TextField}}
													id='last_name' label='Last' type='text'
													variant='outlined' onChange={this.handleChange}
													fullWidth required
												/>
											</Grid>
										</Grid>
										<Grid item >
											<TextField InputProps={{className: classes.TextField}}
												id='email' label='E-mail' type='email'
												variant='outlined' onChange={this.handleEmailChange}
												fullWidth required error={emailError}
											/>
										</Grid>
										<Grid item >
											<TextField InputProps={{className: classes.TextField}}
												id='password' label='Password' type='password'
												variant='outlined' onChange={this.handleChange}
												fullWidth required
											/>
										</Grid>
										<Grid container item direction='row' spacing='16'>
											<Grid item xs='8'>
												<TextField InputProps={{className: classes.TextField}}
													id='school' label='School' type='text'
													variant='outlined' onChange={this.handleChange}
													placeholder="eg. City College" 
													fullWidth required
												/>
											</Grid>
										<Grid item xs='4'>
											<TextField InputProps={{className: classes.TextField}}
												id='major' label='Major' type='text'
												variant='outlined' onChange={this.handleChange}
												placeholder="eg. Computer Science" 
												fullWidth
											/>
										</Grid>
									</Grid>
									<Grid item>
									<button type="submit" className={classes.Submit} onClick={this.handleSubmit}>SIGN UP</button>
									</Grid>
								</Grid>
							</Grid>
							<Snackbar
								open={openAlert}
								onClose={this.handleAlertClose}
								message={<span>Incomplete Form</span>}
							/>
						</form>
						<div>
							<span>Already have a StudY Account?</span>&ensp;
							<a href="/login" className={classes.Signin}>SIGN IN</a>
						</div>
                    </div>
				</div>
			</div>
		</div>
		)
	}
}

const mapStateToProps = state => {};

export default connect(mapStateToProps,{ registerUser })(Register);
