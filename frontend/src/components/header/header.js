
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Button, AppBar, Typography, Toolbar, Grid
} from '@material-ui/core';

import { connect } from 'react-redux';
import { logout, getUserData } from '../../actions/authActions';
// import { AuthWrapper } from '../../contexts/Auth.context.js';

class Header extends Component {
	
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) { console.log(token); this.props.getUserData(token); }
	}

	render() {
		const { user } = this.props;
		return (
			<AppBar position='static' >
				<Toolbar>
					<Typography	
						style={{flex: 1}}
						variant='headline'
						color='inherit'>
						studY
					</Typography>
					{user ? ( 
						<div>
							<Typography
								style={{flex: 1}}
								color='inherit'>
								{user.user_profile.first_name}
							</Typography>
							<Button 
								color='inherit'
								children="logout"
								onClick={this.props.logout}
							/>
						</div>
					) : (
						<div>
							<Button
								component={Link}
								to="/login"
								className='login-button'
								children="Login"
								color='inherit' />
							<Button 
								component={Link} 
								to="/register"
								className='register-button'
								color='inherit'
								children="Register"
							/>
						</div>
					)}
			</Toolbar>
		</AppBar>
		)
	}
}

const mapStateToProps = state => ({
	user: state.Authenticate.user,
	token: state.Authenticate.token,
})

export default connect(mapStateToProps, { logout, getUserData })(Header);
