
import React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EventForm } from './eventForm';

enzyme.configure({ adapter: new Adapter() });

const styles = theme => ({
  main_form: { textAlign: 'center' }
}) 

describe('EventForm', () => {
  const mock = jest.fn();
  const wrapper = shallow(<EventForm onSubmit={mock} classes={styles} /> );

  it('should render all fields', () => {
    expect(wrapper.find('#eventName').exists()).toBe(true);
    expect(wrapper.find('#eventLocation').exists()).toBe(true);
    expect(wrapper.find('#eventLimit').exists()).toBe(true);
    expect(wrapper.find('#eventDate').exists()).toBe(true);
    expect(wrapper.find('#eventTime').exists()).toBe(true);
    expect(wrapper.find('#eventDescription').exists()).toBe(true);
    expect(wrapper.find('#submit-button').exists()).toBe(true);
  })

  test('function call on submit', () => {
    wrapper.find('#main_form').simulate('submit', { preventDefault() {}});
    expect(mock).toHaveBeenCalled();
  })
})
