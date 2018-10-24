
import React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWrap, mountWrap } from '../test_utils/contextWrap' 
import Header from './header';
import Login from '../login/login';
import Register from '../register/register';

enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
	const wrapper = mountWrap(<Header token='' /> );

	test('rendered buttons', () => {
		expect(
			wrapper.find('Button .login-button .MuiButton-label-77').text()
		).toEqual('Login');
		expect(
			wrapper.find('Button .register-button .MuiButton-label-77').text()
		).toEqual('Register');
	}) 

	test('test login button', () => {
		wrapper.find('Button .login-button ButtonBase').simulate('click');
		expect(<Login />)
	})

	test('test register button', () => {
		wrapper.find('Button .register-button ButtonBase').simulate('click');
		expect(<Register />);
	})
})
