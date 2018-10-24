
import React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Register from './register';

enzyme.configure({ adapter: new Adapter() });

describe('Register', () => {
	const wrapper = shallow(<Register />);

	test('state on submit', () => {
		// check state on submit
	})

	test('state on change', () => {
		// make sure state is changing with value
	})
	
})

