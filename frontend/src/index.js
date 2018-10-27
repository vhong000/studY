import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { Login, Register } from './components';
import Header from './containers/header';
import EventForm from './containers/eventForm';
import Subtopic from './components/Subtopic/Subtopic';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store';

import { 
	math, science, history, art, literature, language,
} from './images'

const subtopics = {
	math: {
		titles: ["Precalculus", "Calculus I", "Calculus II", "Calculus III", "Probability and Statistics",
               "Linear Algebra", "Differential Equations", "Mathematical Statistics", "Numerical Analysis",
               "Geometry", "Financial Mathematics", "Set Theory", "Pure Mathematics", "Classical Analysis", 
               "Mathematical Logic", "Topology", "Probability Theory", "Fourier Analysis", "Differential Geometry",
               "Optimization Theory" ],
		image: math
	},
	history: {
		titles: ["The United States: From Its Origins to 1877", "The United States: Since 1865", "Latin America in World History",
		"Colonial Latin America", "Modern and Contemporary Latin America", "History of U.S. Immigration",
		"The Ancient World: The Near East and Greece", "The Ancient World: Rome", "Early-Modern Europe",
		" Modern Europe", " Medieval Europe", "European Union", "The French Revolution", " The Age of Enlightenment",
		"The Middle East in Global History", "The Middle East Under Islam", "Africa and the Modern World", "The Long Partition: India & Pakistan",
		"The Era of the American Revolution", "The Era of Civil War and Reconstruction, 1840-1877"],
		image: history
	},
	language: {
		titles: ["English I", "English II",, "English III", "French I", "French II", "French III", "Spanish I", "Spanish II", "Spanish III",
		"Italian I", "Italian II", "Italian III", "German I",  "German II",  "German III", "Chinese", "Japanese", "Russian", "Arabic", "Hindi"],
		image: language
	},
	science: {
		titles: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
		image: science
	},
	art: {
		titles: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
		image: art
	},
	literature: {
		titles: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
		image: literature
	},
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<Header />
				<Route exact path="/" component={App} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/eventform" component={EventForm} />
				<Route exact path="/math"
					render={(props) => <Subtopic subtopic={subtopics.math} /> }/>
				<Route exact path="/history" 
					render={(props) => <Subtopic subtopic={subtopics.history} /> }/>
				<Route exact path="/language" 
					render={(props) => <Subtopic subtopic={subtopics.language} /> }/>
				<Route exact path="/art"
					render={(props) => <Subtopic subtopic={subtopics.art} /> }/> 
				<Route exact path="/literature" 
					render={(props) => <Subtopic subtopic={subtopics.literature} /> }/>
				<Route exact path="/science" 
					render={(props) => <Subtopic subtopic={subtopics.science} /> }/>
			</div>
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
