import React from 'react';
import * as enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import { SubtopicPage } from '..';

const subtopics = {id: 2, name: "Calculus", image: ""};
const category = "MATH";

enzyme.configure({ adapter: new Adapter() });

describe('SubtopicPage', () => {
    it('should render all fields', () => {
        const wrapper = shallow(<SubtopicPage  subtopics={subtopics} category={category} /> );
        console.log(wrapper.find('Card').debug());
        //expect(wrapper.find('#card').exists()).toBe(true);
        //expect(wrapper.find('#name').exists()).toBe(true);
    })
})