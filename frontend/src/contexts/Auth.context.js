
import React, { Component } from 'react';
import { getUserData, loginUser } from '../fetches';

export const AuthContext = React.createContext();

export class AuthProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			user: '',
		}
	}

	onLogin(user) {
		loginUser(user).then(result => {
			this.setState({
				token: result,
			})
		})
	}

 	componentDidMount() {
		// this.setState(this.initialState());
		const currToken = localStorage.getItem("token");
		if (!currToken) { 
			this.setState({
				token: '',
			})
		}
		else { 
			getUserData(currToken).then(result => {
				this.setState({ 
					token: currToken,
					user: result,
				})
			})
		}
	}

 	render() {
		return (
			<AuthContext.Provider value={{
					token: this.state.token,
					user: this.state.user,
					onLogout: () => {
						this.setState({ token: '', user: '' });
						localStorage.removeItem('token');
					},
					onLogin: (user) => { this.onLogin(user); }
				}}>
				{this.props.children}
			</AuthContext.Provider>
		)
	}
 }

export const AuthConsumer = AuthContext.Consumer;