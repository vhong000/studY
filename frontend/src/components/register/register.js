import React, { Component } from 'react';
import { Button, TextField, withStyles, Grid, Snackbar, Typography,
	Select, OutlinedInput, MenuItem, InputLabel, FormControl
} from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import propTypes from 'prop-types';

import classes from './register.module.css';
import icon from '../../images/icon.png'
// more components at https://material-ui.com/getting-started/usage/

const inputField = ({ 
	input, children, id, 
	label, type, variant,
	placeholder, meta: { touched, error },
	required
}) => (
<FormControl>
	<TextField InputProps={{className: classes.TextField}}
		id={id} label={label} type={type}
		variant={variant} {...input}
		placeholder={placeholder}
		children={children} required={required}
		fullWidth error={error}
	/>
</FormControl>
)

const selectField = ({
	input, children, id,
	label, variant
}) => (
<FormControl fullWidth >
	<InputLabel required variant={variant} >{label}</InputLabel>
	<Select 
	children={children}
	id={id}
	{...input}
	input={<OutlinedInput margin='dense' />}
	/>
</FormControl>
)

export const Register = props => {
	const { onSubmit, schools, error,
		 submitting, pristine, handleSubmit
	} = props;
		
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
						<form className={classes.Form} 
								id="main_form"
								onSubmit={handleSubmit(onSubmit)}
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
											component={selectField}>
												{schools ? (
													schools.map((school) => (
													<MenuItem value={school.id}>{school.name}</MenuItem>
												))) : (
													<p>loading</p>
												)}
											</Field>
										</Grid>
									<Grid item xs='4'>
											<Field 
											name='major' 
											id='major'
											label='Major' 
											type='text'
											variant='outlined'
											component={inputField} />
									</Grid>
								</Grid>
								<Grid item>
								<button 
								type="submit"
								disabled={submitting || pristine}
								className={classes.Submit} >SIGN UP</button>
								</Grid>
							</Grid>
						</Grid>
 							<Snackbar
							open={error}
							message={<span>Incomplete Form</span>}
						/>
						</form>
					<div>
						<span>Already have a StudY Account?</span>&ensp;
						<a href="/login" className={classes.Signin}>SIGN IN</a>
						{error && <span>{error}</span>}
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

export default reduxForm({
	form: 'registerForm',
	asyncBlurFields: [],
})(Register);
