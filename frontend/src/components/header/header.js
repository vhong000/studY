
import React from 'react';
import { Link } from 'react-router-dom';
import {
	Button, AppBar, Typography, Toolbar, withStyles,
	Modal,
} from '@material-ui/core';
import { Login, Register } from '../../containers';
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
	},
	paper: {
		position: 'absolute',
		left: '50%',
		width: '600px',
		height: '50%',
		backgroundColor: theme.palette.background.paper,
		transform: 'translate(-50%, 50%)',
	},
})

export function Header({
	user, handleLogout, classes, handleModalClose,
	handleModalOpen, loginOpen, 
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
							{user.owner.first_name}
						</Typography>
						<Button 
							className={classes.logout_button}
							color='inherit'
							children="logout"
							onClick={() => handleLogout()}
						/>
					</div>
				) : (
					<div>
						<Button
/* 							component={Link}
							to="/login" */
							onClick={() => handleModalOpen('login')}
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

						<Modal open={loginOpen} onClose={() => handleModalClose('login')}>
							<div className={classes.paper}>
								<Login />
							</div>
						</Modal>
					</div>
				)}
		</Toolbar>
	</AppBar>
	)
}
	
Header.propTypes = { 
	user: PropTypes.object,
	handleLogout: PropTypes.func,
}

Header.defaultProps = {
	user: null,
	handleLogout: undefined,
}

export default withStyles(styles)(Header);
