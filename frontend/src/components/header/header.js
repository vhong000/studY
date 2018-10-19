
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class Header extends Component {

	render() {
		const { user_token } = this.props;
		return (
			<div>
				<Button className='login' href='/login' color='default' children="Login" />
				<Link to='/register'>
					<Button className='register' color='default' children="Register" />
				</Link>
			</div>
		)
	}
}
