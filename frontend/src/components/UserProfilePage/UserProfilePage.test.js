import React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserProfilePage } from './UserProfilePage';
import styles from './UserProfilePage.styles';

enzyme.configure({ adapter: new Adapter() });

const school = {id: 0, name: "City College"};
const user = {
  owner: {
    id: 1, 
    first_name: "Lee",
    last_name: "Ruma",
    email: "lee@citymail.cuny.edu",  
  },
  major: "cs"
};

describe('UserProfilePage', () => {
  const wrapper = shallow(<UserProfilePage user={user} school={school} classes={styles} /> );
  it('should render all fields', () => {
    expect(wrapper.find('#edit-button').exists()).toBe(true);
    expect(wrapper.find('#person-icon').exists()).toBe(true);
    expect(wrapper.find('#email-icon').exists()).toBe(true);
    expect(wrapper.find('#icon').exists()).toBe(true);
  })
})