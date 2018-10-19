
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import * as enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { render } from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Button from '@material-ui/core/Button';
import Header from './header';

enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
	const wrapper = shallow(<Header />);

	test('test login button', () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);
		Header.find('.register').simulate('click');
		expect(global.window.location.pathname).toEqual('/register');
	})

	test('test register button', () => {
		wrapper.find('.login').simulate('click');
		expect(global.window.location.pathname).toEqual('/login');

	})
})
