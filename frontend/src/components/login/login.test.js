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
	const wrapper = shallow(<Login />);
	expect(shallow(<Login />).find('#email').length).toEqual(1)
})

it('renders a password input', () => {
	expect(shallow(<Login />).find('#password').length).toEqual(1)
})

describe('Email input', () => {
  
	it('should respond to change event and change the state of the Login Component', () => {
	 
	const wrapper = shallow(<Login />);
	wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
	 
	expect(wrapper.state().user.undefined).toEqual('blah@gmail.com');
	})
})
   
describe('Password input', () => {
	
	it('should respond to change event and change the state of the Login Component', () => {
	 
	const wrapper = shallow(<Login />);
   	wrapper.find('#password').simulate('change', {target: {name: 'password', value: '1234'}});
   
    expect(wrapper.state().user.undefined).toEqual('1234');
  	})
})




