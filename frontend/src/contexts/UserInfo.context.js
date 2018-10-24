
import React, { Component } from 'react';
import { registerUser } from '../fetchData';

const UserInfoContext = React.createContext();

export class UserInfoProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			major: '',
			year: '',
			user_profile: {
				first_name: '',
				last_name: '',
				username: '',
				email: '',
			}
		}
	}

	render() {

		return (
			<UserInfoContext.Provider value={{
				info: this.state,
			}}>
				{this.props.children}
			</UserInfoContext.Provider>
		)
	}
	
}

const UserInfoConsumer = UserInfoContext.Consumer;

export function UserInfoWrapper(WrappedComponent) {
	return function Wrapper(props) {
		return (
			<UserInfoConsumer>
				{ value => (
					<WrappedComponent {...props} {...value} />
				) }
			</UserInfoConsumer>
		)
	}
}
