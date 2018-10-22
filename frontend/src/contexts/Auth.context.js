
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
		return (
			<AuthContext.Provider value={{
					token: this.state.token,
					clear: () => {
						this.setState({ token: '' });
						localStorage.removeItem('token');
					}
				}}>
				{this.props.children}
			</AuthContext.Provider>
		)
	}

}

export const AuthConsumer = AuthContext.Consumer;
