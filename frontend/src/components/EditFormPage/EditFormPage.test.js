import React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EditFormPage } from './EditFormPage';

enzyme.configure({ adapter: new Adapter() });

const styles = theme => ({
    main_form: { textAlign: 'center' }
  }) 

describe('EditFormPage', () => {
  const wrapper = shallow(<EditFormPage classes={styles}/> );
  it('should render all fields', () => {
    expect(wrapper.find('#update_button').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
  })
})