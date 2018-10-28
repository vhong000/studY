
import React from 'react';
import { Link } from 'react-router-dom';
import {
	Button, AppBar, Typography, Toolbar, withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
	title: {
		flex: 1,
	},
	right_actions: {
		display: 'flex',
		flex: -1,
	},
	user_name: {
		marginRight: theme.spacing.unit,
		marginTop: 'auto',
		marginBottom: 'auto',
	}
})

export function Header({
	user, onLogout, classes
}) {
	return (
		<AppBar position='static' >
			<Toolbar>
				<Typography	
                    style={{ textDecoration: 'none' }}
                    component={Link}
                    to ="/"
					className={classes.title}
					variant='headline'
					color='inherit'>
					studY
				</Typography>
				{user ? ( 
					<div className={classes.right_actions}>
						<Typography
							margin='10px'
							className={classes.user_name}
							variant='subtitle1'
							color='inherit'>
							{user.user_profile.first_name}
						</Typography>
						<Button 
							className={classes.logout_button}
							color='inherit'
							children="logout"
							onClick={onLogout}
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
	
Header.propTypes = { 
	user: PropTypes.object,
	onLogout: PropTypes.func,
}

Header.defaultProps = {
	user: null,
	onLogout: undefined,
}

export default withStyles(styles)(Header);
