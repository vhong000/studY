import React from 'react';
import { TextField } from '@material-ui/core';
import classes from './login.module.css';
import icon from '../../images/icon.png'
// more components at https://material-ui.com/getting-started/usage/
import { withFormik, Field, Form } from 'formik';
import isSubmitting from 'redux-form/lib/isSubmitting';
import * as Yup from 'yup';
import { loginUser } from '../../fetches';

const inputField = ({ 
	input, children, id, 
	label, type, placeholder,
	required, onChange,
}) => (
	<TextField InputProps={{className: classes.TextField}}
		id={id} label={label} type={type}
		variant='outlined' {...input}
		placeholder={placeholder} margin='dense'
		children={children} required={required}
		fullWidth onChange={onChange} 
	/>
)

export const Login = props => {
		const { handleChange, errors, touched } = props;

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
							<h1 className={classes.Title}>Sign In</h1>
							<Form name='loginForm' id="myForm" className={classes.Form} >
								<Field 
								name='email' 
								id='email'
								label='Email' 
								type='email' 
								onChange={handleChange}
								component={inputField} />
								{ touched.email && errors.email && <span>{errors.email}</span> }

								<Field 
								name='password' 
								id='password'
								label='Password' 
								type='password' 
								onChange={handleChange}
								component={inputField} />
								{ touched.password && errors.password && <span>{errors.password}</span> }
								<div>
									<button type="submit" disabled={isSubmitting} className={classes.Submit}>
										SIGN IN
									</button>
								</div>
							</Form>
							{ errors.loginForm && <span>{errors.loginForm}</span> }
							<div>
								<span>Don't have a StudY Account?</span>&ensp;
								<a href="/register" className={classes.Signup}>SIGN UP</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

export default withFormik({
	mapPropsToValues: () => ({
		email: '',
		password: '',
	}),
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.matches(/(.cuny.edu)/, 'Must be a valid CUNY Email')
			.required('Email is required'),
		password: Yup.string().required(),
	}),
  handleSubmit: (user, { props, setErrors, setSubmitting }) => {
    loginUser(user).then(result => {
      props.onLogin(result.token)
    }).then(() => props.history.push('/'))
    .catch(error => {
			setErrors({ loginForm: error.message});
			setSubmitting(false);
		})
	}
})(Login);
