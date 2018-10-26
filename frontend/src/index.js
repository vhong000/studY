
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/login/login';
import Register from './components/register/register';
import * as serviceWorker from './serviceWorker';

import { AuthProvider } from './contexts/Auth.context.js';
import { UserInfoProvider } from './contexts/UserInfo.context.js';

ReactDOM.render(
	<Router>
		<div>
			<AuthProvider>
				<Route exact path="/" component={App} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
			</AuthProvider>
		</div>
	</Router>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
