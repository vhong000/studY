import React from 'react';
import * as enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16';
import { shape } from 'prop-types';

import Login from './login';

enzyme.configure({ adapter: new Adapter() });

// router context
const router = {
	history: new BrowserRouter().history,
	route: {
		location: {},
		match: {},
	},
};

const createContext = () => ({
	context: { router },
	childContextTypes: { router: shape({}) },
})

function mountWrap(node) {
	return mount(node, createContext());
}

function shallowWrap(node) {
	return shallow(node, createContext());
}

describe('Login', () => {
	const wrapper = shallow(<Login />);
	console.log(wrapper.find('TextField #password input').debug())

	const expectedInitialState = {
		user: {
			email: '',
			password: '',
		}
	}

	test('inital state', () => {
		expect(wrapper.state()).toEqual(expectedInitialState);
	})

	// test('password on change', () => {
	// 	//wrapper.find('TextField #password input').simulate('change', {
	// 	//	target: { value: '12345' }
	// 	//});
	// 	wrapper.find('TextField #password input').simulate('change', {
	// 		target: { value: "12345" }
	// 	});
	// 	expect(wrapper.find('TextField #password input').props().value).toEqual('12345');
	// 	// expect(wrapper.state().user.password).toEqual('12345');
	// })

	// test('email on change', () => {
	// 	wrapper.find('#email input').simulate('change', {
	// 		target: { value: 'test@gmail.com' }
	// 	});
	// 	expect(wrapper.state().user.email).toEqual('test@gmail.com')
	// })
	
})

