
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Button, AppBar, Typography, Toolbar,
} from '@material-ui/core';

class Header extends Component {

	render() {
		return (
			<AppBar position='static' >
				<Toolbar>
					<Typography  
						style={{flex: 1}}
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
					<Button 
						component={Link} 
						to="/register"
						className='register-button'
						color='inherit'
						children="Register"
					/>
				</Toolbar>
			</AppBar>
		)
	}
}

export default Header;
