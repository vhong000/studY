
/* eslint-disable */
import React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import Login from './login';

enzyme.configure({ adapter: new Adapter() });

describe('Login Component', () => {
	const wrapper = mount(<Login />);
	it('should render without throwing an error', () => {
		expect(wrapper.find('#myForm').exists()).toBe(true)
	})
})

it('renders a email input', () => {
	const wrapper = mount(<Login />);
	expect(wrapper.find('#email').exists()).toBe(true);
})

it('renders a password input', () => {
	const wrapper = mount(<Login />);
	expect(wrapper.find('#password').exists()).toBe(true);
})

// describe('Email input', () => {
//   
// 	it('should respond to change event and change the state of the Login Component', () => {
// 	
// 	const mock = jest.fn();
// 	const wrapper = mount(<Login handleSubmit={mock} />);
// 	// console.log(wrapper.props().values.debug());
// 	wrapper.find('TextField #email InputBase input').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
// 	 
// 	expect(mock).toHaveBeenCalled();
// 	})
// })
   
// describe('Password input', () => {
// 	
// 	it('should respond to change event and change the state of the Login Component', () => {
// 	 
// 	const wrapper = shallow(<Login />);
//    	wrapper.find('#password').simulate('change', {target: {name: 'password', value: '1234'}});
//    
//     expect(wrapper.state().user.undefined).toEqual('1234');
//   	})
// })




