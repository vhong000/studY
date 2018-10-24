
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Button, AppBar, Typography, Toolbar,
} from '@material-ui/core';

import { AuthWrapper } from '../../contexts/Auth.context.js';

class Header extends Component {

	render() {
		return (
			<AppBar position='static' >
				<Toolbar>
					<Typography	
						style={{flex: 1}}
						variant='headline'
						color='inherit'>
						studY {this.props.token}
					</Typography>
				{this.props.token === '' ? (
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
				) : (
					<Button 
						color='inherit'
						children="logout"
						onClick={this.props.clear}
					/>
				)}
			</Toolbar>
		</AppBar>
		)
	}
}

export default AuthWrapper(Header);
