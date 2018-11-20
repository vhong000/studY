
import React from 'react';
import * as enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EventForm from './eventForm';

enzyme.configure({ adapter: new Adapter() });

const styles = theme => ({
  main_form: { textAlign: 'center' }
}) 

const schools = [{id: 0, name: "city"}, {id: 1, name: "baruch"}]
const user = {owner: {id: 1, first_name: "Bobby"}}

describe('EventForm', () => {
  const mock = jest.fn();
  const wrapper = mount(<EventForm schools={schools} classes={styles} user={user}/> );

  it('should render all fields', () => {
    expect(wrapper.find('#event_name').exists()).toBe(true);
    expect(wrapper.find('#event_location').exists()).toBe(true);
    expect(wrapper.find('#event_limit').exists()).toBe(true);
    expect(wrapper.find('#event_date').exists()).toBe(true);
    expect(wrapper.find('#event_time').exists()).toBe(true);
    expect(wrapper.find('#event_description').exists()).toBe(true);
    expect(wrapper.find('#submit_button').exists()).toBe(true);
  })

  // test('function call on submit', () => {
  //   wrapper.find('#main_form').simulate('submit', { preventDefault() {}});
  //   expect(mock).toHaveBeenCalled();
  // })
})
