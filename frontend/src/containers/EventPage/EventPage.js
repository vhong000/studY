import React, { Component } from 'react';
import { EventHomePage } from '../../components';
import {
  fetchEvent,
  fetchEventAttendees,
  fetchSchoolDatails,
  JoinEvent,
  leaveEvent,
  deleteEvent,
  getUserData,
  getComments,
} from '../../fetches';
import { AuthContext, AuthWrapper } from '../../contexts/Auth.context';

class EventPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      eventInfo: '',
      campusInfo: '',
      Joined: false,
      isOrganizer: false,
      eventAttendees: [],
      JoinEventResponse: [],
      comments: [],
    }
    this.handleJoinEvent = this.handleJoinEvent.bind(this);
    this.handleLeaveEvent = this.handleLeaveEvent.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handlePostedComment = this.handlePostedComment.bind(this);
  }

  componentDidMount() {
    document.body.style.background = 'rgb(245, 247, 249)';
    const { category, subtopic, eventId } = this.props.match.params
    const token = localStorage.getItem('token');

    if (category && subtopic && eventId) {
      getComments(eventId).then(response => {
        this.setState({ comments: response.results });
      });

      fetchEvent(eventId).then(response => {
        this.setState({ eventInfo: this.reconstructData(response) });

        fetchSchoolDatails(response.campus).then(school => {
          this.setState({ campusInfo: school });
        });

        fetchEventAttendees(eventId).then(response => {
          this.setState({ eventAttendees: response.results });
        }).then(() => {
          const { eventAttendees, eventInfo } = this.state;
          let condition = false

          if (token) {
            getUserData(token).then(user => {
              if (response.organizer.owner.id === user.owner.id) {
                this.setState({ isOrganizer: true });
              }
              if (eventAttendees.length) {
                eventAttendees.map((userobject) => {
                  if (userobject.owner.id === user.owner.id) {
                    condition = true
                  }
                })
                this.setState({ Joined: condition });
              }
            }).catch((error) => {
              this.context.onLogout();
            })
          }
        })
      }).catch(error => { this.setState({ eventInfo: '' }); });
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.user && nextProps.user !== this.props.user) {
      if (nextProps.user.owner && nextProps.user.owner.id === this.state.eventInfo.ownerId) {
        this.setState({ isOrganizer: true })
      } else { this.setState({ isOrganizer: false }) }
    }
  }

  reconstructData(eventInfo) {
    const event = {
      id: eventInfo.id,
      details: eventInfo.description,
      title: eventInfo.name,
      owner: `${eventInfo.organizer.owner.first_name} ${eventInfo.organizer.owner.last_name}`,
      ownerId: eventInfo.organizer.owner.id,
      capacity: eventInfo.capacity,
      time: eventInfo.time,
      date: new Date(eventInfo.time)
    }
    return (event)
  }

  handleJoinEvent(event) {
    const { eventId } = this.props.match.params;
    const { token } = this.context;
    JoinEvent(eventId, token).then(response => {
      this.setState({ joinEventResponse: response, Joined: true })
    }).then(() => {
      fetchEventAttendees(eventId).then(response => {
        this.setState({ eventAttendees: response.results });
      })
    })
  }

  handleLeaveEvent() {
    const { eventId, category, subtopic } = this.props.match.params;
    const { token } = this.context;
    leaveEvent(eventId, token).then(response => {
      this.setState({ Joined: false })
    }).then(() => {
      fetchEventAttendees(eventId).then(response => {
        this.setState({ eventAttendees: response.results });
      })
    })
  }

  handleDeleteEvent() {
    const { eventId, category, subtopic } = this.props.match.params;
    const { token } = this.context;
    deleteEvent(eventId, token).then(response => {
      //console.log("this.plrps",this.props)
      //this.props.history.push(`/category/${category}/${subtopic}`);
      this.props.history.goBack();
    })
  }

  handlePostedComment() {
    const { eventId } = this.props.match.params;
    getComments(eventId).then(response => {
      this.setState({ comments: response.results });
    });
  }

  render() {
    const { comments, eventInfo, eventAttendees, campusInfo, isOrganizer } = this.state;
    return (
      <div>
        {eventInfo ? <EventHomePage Joined={this.state.Joined}
          handleJoinEvent={this.handleJoinEvent}
          handleDeleteEvent={this.handleDeleteEvent}
          handleLeaveEvent={this.handleLeaveEvent}
          handlePostedComment={this.handlePostedComment}
          {...this.props} {...this.context}
          isOrganizer={isOrganizer}
          comments={comments}
          event={eventInfo}
          eventAttendees={eventAttendees}
          campusInfo={campusInfo} /> : <h1>Event does not exist</h1>}
      </div>
    )
  }

}

export default AuthWrapper(EventPage);


