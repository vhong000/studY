
import React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Register } from './register';

enzyme.configure({ adapter: new Adapter() });

describe('Register render', () => {
	const wrapper = shallow(<Register />);

})

describe('submit function call', () => {
	const wrapper = shallow(<Register />);

	test('functi on submit', () => {
		// check state on submit
	})

	test('state on change', () => {
		// make sure state is changing with value
		wrapper.find('#first_name').simulate('change', {target : {
			value: 'test', 
		}})
		expect(wrapper.state().applicant.undefined).toEqual('test');
	})
})

