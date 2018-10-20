import React, { Component } from 'react';
import { Header } from './components';
import './App.css';

export const AuthContext = React.createContext();

class App extends Component {
	constructor(props) {
		super(props);
		this.initialState.bind(this);
	}

	componentDidMount() {
		this.setState(this.initialState());
	}

	initialState() {
		const currToken = localStorage.getItem("token");
		if (!currToken) { return { token: '' }; }
		return { token: currToken };
	}

  render() {
    return (
			<AuthContext.Provider value={this.state}>
				<div className="App">
					<Header />
				</div>
			</AuthContext.Provider>
    );
  }
}

export default App;
