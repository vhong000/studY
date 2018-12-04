
/* eslint-disable */
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

const eventsOrg = [
  { id: 1, name: "midterm review" },
  { id: 2, name: "final review" },
  { id: 3, name: "linear algebra" },
]

const eventsJoined = [
  { id: 1, name: "midterm review" },
  { id: 2, name: "final review" },
  { id: 3, name: "linear algebra" },
]

describe('UserProfilePage', () => {
  const wrapper = shallow(<UserProfilePage user={user} school={school} classes={styles} eventsOrg={eventsOrg} eventsJoined={eventsJoined}/> );
  it('should render all fields', () => {
    //expect(wrapper.find('#edit-button').exists()).toBe(true);
    expect(wrapper.find('#person-icon').exists()).toBe(true);
    expect(wrapper.find('#email-icon').exists()).toBe(true);
    expect(wrapper.find('#icon').exists()).toBe(true);
  })
})