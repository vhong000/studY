import React, { Component } from 'react';
import { EventHomePage } from '../../components';
import { fetchEvent, fetchEventAttendees, fetchSchoolDatails, JoinEvent } from '../../fetches';
import { AuthContext } from '../../contexts/Auth.context';
import { includes } from 'lodash';

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            eventInfo: '',
            campusInfo: '',
            Joined: false,
            eventAttendees: [],
            JoinEventResponse: []
        }
        this.handleJoinEvent = this.handleJoinEvent.bind(this);
    }

    static contextType = AuthContext;


    componentWillMount() {
        const { category, subtopic, eventId } = this.props.match.params

        if (category && subtopic && eventId) {
            fetchEvent(eventId).then(response => {
                fetchSchoolDatails(response.campus).then(response => {
                    this.setState({ campusInfo: response });
                });
                //console.log(response)
                if (!response.message) {
                    this.setState({ eventInfo: this.reconstructData(response) });

                    fetchEventAttendees(eventId).then(response => {
                        //console.log("response", response)
                        this.setState({ eventAttendees: response });
                    }).then(() => {

                        const { user } = this.context;
                        const { eventAttendees } = this.state;
                        let condition;

                        if (eventAttendees.length) {
                            condition = eventAttendees.map((userobject) => {
                                if (userobject.owner.id === user.owner.id) {
                                    return true
                                }
                            })

                            this.setState({ Joined: condition });
                        }

                    })




                }
                else {
                    this.setState({ eventInfo: '' });
                }
            });

        }

    }

    componentDidUpdate

    reconstructData(eventInfo) {
        const event = {
            details: eventInfo.description,
            title: eventInfo.name,
            owner: `${eventInfo.organizer.owner.first_name} ${eventInfo.organizer.owner.last_name}`,
            capacity: eventInfo.capacity,
            date: new Date()
        }
        //console.log("reconstructData", event)
        return (event)

    }
    handleJoinEvent(event) {
        const { eventId } = this.props.match.params;
        const { token } = this.context;
        alert(token);
        JoinEvent(eventId, token).then(response => {
            this.setState({ joinEventResponse: response, Joined: true })
        })
    }


    render() {
        const { eventInfo, eventAttendees, campusInfo } = this.state;
        //const { user } = this.context
        return (
            <div>
                {eventInfo ? <EventHomePage Joined={this.state.Joined} handleJoinEvent={this.handleJoinEvent} {...this.props} {...this.context} event={eventInfo} eventAttendees={eventAttendees} campusInfo={campusInfo} /> : <h1>Event does not exist</h1>}
            </div>
        )
    }

}

export default EventPage;


