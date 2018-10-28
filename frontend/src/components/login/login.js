import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import classes from './login.module.css';
import icon from '../../images/icon.png'
// more components at https://material-ui.com/getting-started/usage/

import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';


export class Login extends Component {

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
	handleChange(event) {
		this.setState({
			user: {
				...this.state.user,
				[event.target.id]: event.target.value
			}
		});
	//console.log(event.target.value);
	}

 	//submit user state as json body
	handleSubmit(event) {
		event.preventDefault();
		const data = this.state.user;
		const { history } = this.props;
		console.log(data);

		this.props.loginUser(data, history);
	}

	render() {
		const { user } = this.props;
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
							<form id="myForm" className={classes.Form} onSubmit={this.handleSubmit}>
								<TextField InputProps={{className: classes.TextField}}
									id="email"
									label="Email"
									type="email"
									name="email"
									autoComplete="email"
									margin="dense"
									variant="outlined"
									onChange={this.handleChange}
									fullWidth={true}
									/>
								<TextField InputProps={{className: classes.TextField}}
									id="password"
									label="Password"
									type="password"
									autoComplete="current-password"
									margin="dense"
									variant="outlined"
									onChange={this.handleChange}
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

const mapStateToProps = state => ({
	user: state.Authenticate.user,
});

export default connect(mapStateToProps, { loginUser })(Login);





