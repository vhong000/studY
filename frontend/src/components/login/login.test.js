import React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWrap, mountWrap } from '../test_utils/contextWrap' 

import Login from './login';

enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
	const wrapper = mountWrap(<Login />);

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
	// 	console.log(wrapper.find('TextField #password FilledInput').debug())
	// 	//wrapper.find('TextField #password input').simulate('change', {
	// 	//	target: { value: '12345' }
	// 	//});
	// 	wrapper.find('TextField #password input').simulate('change', {
	// 		value: "12345",
	// 	})
	// 	expect(wrapper.find('TextField #password FilledInput').props().inputRef).toEqual('12345');
	// 	// expect(wrapper.state().user.password).toEqual('12345');
	// })

	// test('email on change', () => {
	// 	wrapper.find('#email input').simulate('change', {
	// 		target: { value: 'test@gmail.com' }
	// 	});
	// 	expect(wrapper.state().user.email).toEqual('test@gmail.com')
	// })
	
})

