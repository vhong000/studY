
import React, { Component } from 'react';

const AuthContext = React.createContext();

export class AuthProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
		}
		this.initialState.bind(this);
	}

	initialState() {
		// localStorage.setItem("token", "(this is token)");
		const currToken = localStorage.getItem("token");
		if (!currToken) { return { token: '' }; }
		return { token: currToken };
	}

	componentDidMount() {
		this.setState(this.initialState());
	}

	render() {
		const clear = () => {
			this.setState({ token: '' });
			localStorage.removeItem('token');
		}

		return (
			<AuthContext.Provider value={{
				token: this.state.token,
				clear: clear,
			}}>
				{this.props.children}
			</AuthContext.Provider>
		)
	}

}

const AuthConsumer = AuthContext.Consumer;

export function AuthWrapper(WrappedComponent) {
	return function Wrapper(props) {
		return(
			<AuthConsumer >
				{ value => (
					<WrappedComponent {...props} {...value} />
				) }
			</AuthConsumer>
		)
	}
}
