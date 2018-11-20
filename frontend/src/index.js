import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
// import SubtopicPage from './components/SubtopicPage/SubtopicPage';
import {
	EventListPage, Header,
	EventPage, SubtopicPage, App, UserProfile
} from './containers';
import  ProtectedRoute  from './ProtectedRoute/ProtectedRoute'
import * as serviceWorker from './serviceWorker';

import AuthProvider, { AuthWrapper } from './contexts/Auth.context.js';

ReactDOM.render(
	<Router>
		<div>
			<AuthProvider>
				<Header />
				<Route exact path="/" component={App} />
				<Route exact path="/category/:category" component={SubtopicPage} />
				<Route exact path="/category/:category/:subtopic" component={EventListPage} />
				<Route exact path="/category/:category/:subtopic/:eventId" component={EventPage} />
				<ProtectedRoute exact path="/profile"  component={AuthWrapper(UserProfile)} />
			</AuthProvider>
		</div>
	</Router>,
	document.getElementById('root')
);

//notes -> if we decide to do a search feature we would have another route for event page

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
