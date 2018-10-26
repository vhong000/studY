
import React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Register } from './register';

enzyme.configure({ adapter: new Adapter() });

describe('Register component', () => {
	const fn = jest.spyOn(Register.prototype, 'handleSubmit');
	const wrapper = shallow(<Register />);
	// console.log(wrapper.find('.main_form').debug())

	test('function call on submit', () => {
		// check state on submit
		wrapper.find('.main_form').simulate('submit', { preventDefault() {}});
		expect(fn).toHaveBeenCalled();
	})

	test('Register state on change', () => {
		// make sure state is changing with value
		wrapper.find('#first_name').simulate('change', {target : {
			value: 'test', 
		}})
		expect(wrapper.state().applicant.undefined).toEqual('test');
	})
})

