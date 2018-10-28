
import React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from './header';

enzyme.configure({ adapter: new Adapter() });

const styles = theme => ({
	title: {
		flex: 1,
	},
	right_actions: {
		display: 'flex',
		flex: -1,
	},
	user_name: {
		marginRight: theme.spacing.unit,
		marginTop: 'auto',
		marginBottom: 'auto',
	}
})
	
describe('Header', () => {
	const wrapper = shallow(<Header classes={styles} /> );
	it('should render login button', () => {
		expect(wrapper.find('.login-button').exists()).toBe(true);
		expect(wrapper.find('.register-button').exists()).toBe(true);
	})

})
