
import React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserProfilePage } from './UserProfilePage';
import styles from './UserProfilePage.styles';

enzyme.configure({ adapter: new Adapter() });

describe('UserProfilePage', () => {
  const wrapper = shallow(<UserProfilePage user={{owner: ''}} school='' classes={styles} /> );
  it('should render edit button', () => {
    expect(wrapper.find('#edit-button').exists()).toBe(true);
  })
})