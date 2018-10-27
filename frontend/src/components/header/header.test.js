
import React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './header';

enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
	const wrapper = shallow(<Header /> );
	it('should render login button', () => {
		expect(wrapper.find('.login-button').exists()).toBe(true);
		expect(wrapper.find('.register-button').exists()).toBe(true);
	})

})
