import React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import { Login } from './login';

enzyme.configure({ adapter: new Adapter() });

describe('Login Component', () => {
	it('should render without throwing an error', () => {
		expect(shallow(<Login />).find('#myForm').exists()).toBe(true)
	})
})

it('renders a email input', () => {
	expect(shallow(<Login />).find('#outlined-email-input').length).toEqual(1)
})

it('renders a password input', () => {
	expect(shallow(<Login />).find('#outlined-password-input').length).toEqual(1)
})

describe('Email input', () => {
  
	it('should respond to change event and change the state of the Login Component', () => {
	 
	const wrapper = shallow(<Login />);
	wrapper.find('#outlined-email-input').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
	 
	expect(wrapper.state().user.undefined).toEqual('blah@gmail.com');
	})
})
   
describe('Password input', () => {
	
	it('should respond to change event and change the state of the Login Component', () => {
	 
	const wrapper = shallow(<Login />);
   	wrapper.find('#outlined-password-input').simulate('change', {target: {name: 'password', value: '1234'}});
   
    expect(wrapper.state().user.undefined).toEqual('1234');
  	})
})




