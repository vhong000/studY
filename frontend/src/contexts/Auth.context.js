
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { getUserData, loginUser } from '../fetches';

export const AuthContext = React.createContext();

class AuthProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			user: '',
		}
	}

	onLogin(token) {
		getUserData(token).then(result => {
      localStorage.setItem('token', token);
			this.setState({ 
				token: token,
				user: result,
			});
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
			}).catch((error) => {
				this.setState({ token: '', user: '' });
				localStorage.removeItem('token');
			}).then(() => { this.props.history.push('/'); })
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
					onLogin: (token) => { this.onLogin(token); }
				}}>
				{this.props.children}
			</AuthContext.Provider>
		)
	}
 }

export default withRouter(AuthProvider);

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