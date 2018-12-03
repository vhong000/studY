
/* eslint-disable */
import React from 'react';
import * as enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Comments from './comments';
import styles from './comments.styles';

enzyme.configure({ adapter: new Adapter() });

const user = {
  major: "comp sci",
  owner: {
    email: "test@city.cuny.edu",
    first_name: "comment",
    last_name: "test",
    id: 3
  },
  school: 10,
}
 
const comments = [
  { created_at: "2018-12-03T15:43:01.537370Z",
    message: "test comment 1",
    event: 3,
    upvote: 0,
    id: 0,
    user: user,
  },
  { created_at: "2018-12-03T15:43:01.537370Z",
    message: "test comment 1",
    event: 3,
    upvote: 0,
    id: 0,
    user: user,
  },
]

describe('Comments', () => {
  const mock = jest.fn();
  const wrapper = mount(<Comments 
    comments={comments} 
    classes={styles}
    eventId={3}
    ownerId={0}
    handleSubmit={mock}
    />);

    it('should render text field', () => {
      expect(wrapper.find('#comment_list').exists()).toBe(true);
      expect(wrapper.find('#comment_field').exists()).toBe(true);
      expect(wrapper.find('#submit_button').exists()).toBe(true);
    })

    // test('function call on submit', () => {
    //   console.log(wrapper.find('#comment').length);
    //   wrapper.find('#comment_field').find('TextField').simulate('change', { target: { value: "test" }})
    //   wrapper.find('Form').simulate('submit',{ preventDefault() { }});
    //   // expect(wrapper.find('#comment').length).toBe(3);
    //   expect(mock).toHaveBeenCalled();
    // })
})