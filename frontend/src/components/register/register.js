import React from 'react';
import { Button, TextField, withStyles, Grid, Snackbar, Typography,
	Select, OutlinedInput, MenuItem, InputLabel, FormControl
} from '@material-ui/core';
import { Field, withFormik, Form } from 'formik';
import * as Yup from 'yup';
import propTypes from 'prop-types';

import classes from './register.module.css';
import icon from '../../images/icon.png'
import { registerUser } from '../../fetches';
// more components at https://material-ui.com/getting-started/usage/

const inputField = ({ 
	input, children, id, 
	label, type, variant,
	placeholder, onChange,
	required, helperText
}) => (
	<TextField InputProps={{className: classes.TextField}}
		id={id} label={label} type={type}
		variant={variant} {...input}
		placeholder={placeholder} helperText={helperText}
		children={children} required={required}
		fullWidth onChange={onChange}
	/>
)

const selectField = ({
	input, children, id,
	label, variant, onChange, values
}) => (
<FormControl fullWidth >
	<InputLabel required variant={variant} >{label}</InputLabel>
	<Select 
	children={children}
	id={id}
	{...input}
	input={<OutlinedInput 
		value={values.school}
		onChange={onChange('school')}
		margin='dense' />}
	/>
</FormControl>
)

export const Register = props => {
	const { schools, values, handleChange, touched, errors, isSubmitting } = props;
		
	return (
		<div className={classes.Container}>
			<div className={classes.PageColumns}>
				<div className={classes.PageColumn_left}>
					<div className={classes.Art} />
				</div>
				<div className={classes.PageColumn_right}>
					<div className={classes.ColumnContainer}>
						<div>
							<img alt="icon" src={icon} className={classes.Icon}/>    
						</div>
						<h1 className={classes.Title}>Join the New York City student community.</h1>
						<p className={classes.Text1}>By having a StudY account, you can create, find, and join groups on all of your favourite topics.</p>
						<p className={classes.Text2}>Sign up in just seconds.</p>

						<Form name='registerForm' className={classes.Form} 
								id="main_form"
								>
							<Grid container justify='flex-start' >
								<Grid container direction='column' xs='12' spacing='8' >
									<Grid container item direction='row' spacing='16' >
										<Grid item xs='6'>
											<Field 
											name='firstName'
											label='First'
											id='first_name'
											type='text'
											variant='outlined'
											required
											onChange={handleChange}
											component={inputField} />
										</Grid>
										<Grid item xs='6'>
											<Field 
											name='lastName' 
											id='last_name' 
											label='Last' 
											type='text'
											variant='outlined' 
											required
											onChange={handleChange}
											component={inputField} />
										</Grid>
									</Grid>
									<Grid item >
											<Field 
											name='email' 
											id='email'
											label='E-mail'
											type='email'
											variant='outlined'
											required
											onChange={handleChange}
											helperText={touched.email && errors.email && <p>{errors.email}</p>}
											component={inputField} />
									</Grid>
									<Grid item >
											<Field 
											name='password' 
											id='password'
											label='Password'
											type='password'
											variant='outlined'
											required
											onChange={handleChange}
											component={inputField} />
									</Grid>
									<Grid container item direction='row' spacing='16'>
										<Grid item xs='8'>
											<Field 
											name='school' 
											id='school'
											label='School' 
											type='text'
											variant='outlined'
											required
											values={values}
											onChange={handleChange}
											component={selectField}>
												{schools.map((school) => (
													<MenuItem value={school.id}>{school.name}</MenuItem>
												))}
											</Field>
										</Grid>
									<Grid item xs='4'>
											<Field 
											name='major' 
											id='major'
											label='Major' 
											type='text'
											variant='outlined'
											required
											onChange = {handleChange}
											component={inputField} />
									</Grid>
									{ errors.registerForm && <span>{errors.registerForm}</span> }
								</Grid>
								<Grid item>
								<button 
									type="submit"
									disabled={isSubmitting}
									className={classes.Submit} >SIGN UP
								</button>
								</Grid>
							</Grid>
						</Grid>
{/* 							<Snackbar
							open={openAlert}
							onClose={this.handleAlertClose}
							message={<span>Incomplete Form</span>}
						/> */}
						</Form>
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

Register.propTypes = {
	schools: propTypes.array,
	applicant: propTypes.object,
}

Register.defaultProps = {
	applicant: {},
	schools: [],
}

export default withFormik({
	mapPropsToValues: () => ({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		school: '',
		major: ''
	}),
	validationSchema: Yup.object().shape({
		first_name: Yup.string().required(),
		last_name: Yup.string().required(),
		email: Yup.string()
			.matches(/(.cuny.edu)/, 'Must be a valid CUNY Email')
			.required('Email is required'),
		password: Yup.string().required(),
		school: Yup.number().required(),
		major: Yup.string().required(),
	}),
	handleSubmit: (applicant, { props, setErrors, setSubmitting }) => {
		registerUser(applicant).then(() => {
			props.handleModalClose('register');
		}).catch(error => {
			setErrors({ registerForm: error.message });
			setSubmitting(false);
		})
	}
})(Register);
