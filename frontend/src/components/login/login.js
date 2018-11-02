import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import classes from './login.module.css';
import icon from '../../images/icon.png'
// more components at https://material-ui.com/getting-started/usage/
import { withFormik } from 'formik';

export class Login extends Component {

	render() {
		const { values, handleChange, handleSubmit } = this.props;
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
							<form id="myForm" className={classes.Form} onSubmit={handleSubmit}>
								<TextField InputProps={{className: classes.TextField}}
									id="email"
									label="Email"
									type="email"
									name="email"
									autoComplete="email"
									margin="dense"
									variant="outlined"
									onChange={handleChange}
									fullWidth={true}
									/>
								<TextField InputProps={{className: classes.TextField}}
									id="password"
									label="Password"
									type="password"
									autoComplete="current-password"
									margin="dense"
									variant="outlined"
									onChange={handleChange}
									fullWidth={true}
									/>
								<div>
									<button type="submit" className={classes.Submit}>SIGN IN</button>
								</div>
							</form>
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
}

export default withFormik({
	mapPropsToValues: () => ({
		email: 'what',
		password: 'what',
  }),
  handleSubmit: (user, { props }) => {
    props.onLogin(user);
  }
})(Login);
