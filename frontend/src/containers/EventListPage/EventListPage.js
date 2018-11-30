import React, { Component } from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import { EventList } from '../../components';
import { fetchEventByTopic } from '../../fetches';
import { AuthWrapper } from '../../contexts/Auth.context';

class EventListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listofevents: [],
      createEventModal: false,
      isLoggedIn: false,
    };
    this.handleCreateModalClose = this.handleCreateModalClose.bind(this);
    this.handleCreateModalOpen = this.handleCreateModalOpen.bind(this);
  }
  // static contextType = AuthContext;

  componentDidMount() {
    document.body.style.background = 'rgb(245, 247, 249)';
    const { user, match } = this.props;
    const id = match.params.subtopic;

    if (match.params) {
      fetchEventByTopic(id).then((response) => {
        this.arangeEventsByDates(response.results);
      });
    }
    if (user.owner) {
      this.setState({ isLoggedIn: true });
    }
  }

  componentWillUpdate(nextProps) {
    const { isLoggedIn } = this.state;
    const { user } = this.props;
    if (nextProps.user !== user) {
      this.setState({ isLoggedIn: !isLoggedIn });
    }
  }

  componentWillUnmount() {
    document.body.style.background = 'white';
  }


  arangeEventsByDates(eventsArray) {
    const results = [];
    if (eventsArray.length) {
      let date = new Date(eventsArray[0].time).getMonth();
      let eventformat = {
        date: moment.months(date),
        events: [],
      };
      eventsArray.forEach((eventObject) => {
        if (date === new Date(eventObject.time).getMonth()) {
          eventformat.events.push(eventObject);
        } else {
          const oldEventFormat = eventformat;
          date = new Date(eventObject.time).getMonth();
          eventformat = {
            date: moment.months(date),
            events: [eventObject],
          };
          results.push(oldEventFormat);
        }
      });
      results.push(eventformat);
    }
    this.setState({ listofevents: results });
  }

  handleCreateModalClose() {
    const { match } = this.props;
    this.setState({ createEventModal: false });
    const id = match.params.subtopic;
    if (match.params) {
      fetchEventByTopic(id).then((response) => {
        this.arangeEventsByDates(response.results);
      });
    }
  }

  handleCreateModalOpen() {
    this.setState({ createEventModal: true });
  }

  render() {
    const { listofevents, createEventModal, isLoggedIn } = this.state;
    const { match } = this.props;
    return (
      <div>
        <EventList
          listofevents={listofevents}
          params={match.params}
          createEventModal={createEventModal}
          handleClose={this.handleCreateModalClose}
          handleOpen={this.handleCreateModalOpen}
          isLoggedIn={isLoggedIn}
        />
      </div>
    );
  }
}

EventListPage.propTypes = {
  user: propTypes.object,
  match: propTypes.object.isRequired,
};

EventListPage.defaultProps = {
  user: {},
};

export default AuthWrapper(EventListPage);
