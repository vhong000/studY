
/* eslint-disable */
import React from 'react';
import * as enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Register from './register';

enzyme.configure({ adapter: new Adapter() });

const styles = theme => ({
	main_div: {
		textAlign: 'center',
		marginTop: theme.spacing.unit * 5,
	},
	main_form: {
		marginTop: theme.spacing.unit * 5,
	},
	title: {
		marginBotton: theme.spacing.unit * 5,
	}
})

describe('Register component', () => {
	const mock = jest.fn();
	const wrapper = mount(<Register handleSubmit={mock} classes={styles} />);

	it('should render all fields', () => {
		expect(wrapper.find('#first_name').exists()).toBe(true);
		expect(wrapper.find('#last_name').exists()).toBe(true);
		expect(wrapper.find('#email').exists()).toBe(true);
		expect(wrapper.find('#password').exists()).toBe(true);
		expect(wrapper.find('#school').exists()).toBe(true);
		expect(wrapper.find('#major').exists()).toBe(true);


	})

	test('snapshot', () => {
		///
		const component = renderer.create(<Register handleSubmit={mock} classes={styles} />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();

	})

	// test('function call on submit', () => {
	// 	// check state on submit
	// 	console.log(wrapper.find('#main_form button').debug());
	// 	wrapper.find('#main_form button').simulate('submit', { preventDefault() {}});
	// 	expect(mock).toHaveBeenCalled();
	// })

})

