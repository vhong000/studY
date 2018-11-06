import React, { Component } from 'react';
import { EventHomePage } from '../../components';
import { fetchEvent, fetchEventAttendees, fetchSchoolDatails } from '../../fetches';
import { AuthContext } from '../../contexts/Auth.context';


class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            eventInfo: '',
            campusInfo: '',
            eventAttendees: []
        }
    }

    static context = AuthContext;


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
                        console.log("response", response)
                        this.setState({ eventAttendees: response });
                    });
                }
                else {
                    this.setState({ eventInfo: '' });
                }
            });

        }

    }

    reconstructData(eventInfo) {
        const event = {
            details: eventInfo.description,
            title: eventInfo.name,
            owner: `${eventInfo.organizer.owner.first_name} ${eventInfo.organizer.owner.last_name}`,
            date: new Date()
        }
        console.log("reconstructData", event)
        return (event)

    }


    render() {
        const { eventInfo, eventAttendees, campusInfo } = this.state;
        return (
            <div>
                {eventInfo ? <EventHomePage event={eventInfo} eventAttendees={eventAttendees} campusInfo={campusInfo} /> : <h1>Event does not exist</h1>}
            </div>
        )
    }

}

export default EventPage;


