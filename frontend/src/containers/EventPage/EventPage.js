import React, { Component } from 'react';
import { EventList, EventHomePage } from '../../components';
import { fetchEvent, fetchEventAttendees, fetchSchoolDatails } from '../../fetches';
import { AuthContext } from '../../contexts/Auth.context';
import createTypography from '@material-ui/core/styles/createTypography';
import { relativeTimeRounding } from 'moment';

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
            fetchEventAttendees(eventId).then(response => {
                console.log("response", response)
                this.setState({ eventAttendees: response });
            });
            fetchEvent(eventId).then(response => {
                fetchSchoolDatails(response.campus).then(response => {
                    this.setState({ campusInfo: response });
                });
                this.setState({ eventInfo: this.reconstructData(response) });
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
                <EventHomePage event={eventInfo} eventAttendees={eventAttendees} campusInfo={campusInfo} />
            </div>
        )
    }

}

export default EventPage;


