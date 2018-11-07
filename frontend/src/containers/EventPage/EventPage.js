import React, { Component } from 'react';
import { EventHomePage } from '../../components';
import { 
    fetchEvent, 
    fetchEventAttendees, 
    fetchSchoolDatails, 
    JoinEvent,
    leaveEvent,
    deleteEvent } from '../../fetches';
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
            isOrganizer: false,
            eventAttendees: [],
            JoinEventResponse: []
        }
        this.handleJoinEvent = this.handleJoinEvent.bind(this);
        this.handleLeaveEvent = this.handleLeaveEvent.bind(this);
        this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
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
                    const { user } = this.context;
                    if (response && user) {
                        console.log("Organizer Info",response.organizer.owner,user);
                        if (response.organizer.owner.id === user.owner.id) {
                            this.setState({ isOrganizer: true });
                        }
                    }

                    fetchEventAttendees(eventId).then(response => {
                        //console.log("response", response)
                        this.setState({ eventAttendees: response.results });
                    }).then(() => {


                        const { eventAttendees, eventInfo } = this.state;
                        const { user } = this.context;
                        let condition = false

                        if (eventAttendees.length && user) {
                            eventAttendees.map((userobject) => {
                                //console.log("User object{{{{{{{}}}}}}}} ",userobject)
                                if (userobject.owner.id === user.owner.id) {
                                    condition = true
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

    }//end of compnent did mount

    reconstructData(eventInfo) {
        const event = {
            details: eventInfo.description,
            title: eventInfo.name,
            owner: `${eventInfo.organizer.owner.first_name} ${eventInfo.organizer.owner.last_name}`,
            capacity: eventInfo.capacity,
            time: eventInfo.time,
            date: new Date()
        }
        //console.log("reconstructData", event)
        return (event)

    }
    handleJoinEvent(event) {
        const { eventId } = this.props.match.params;
        const { token } = this.context;
        JoinEvent(eventId, token).then(response => {
            this.setState({ joinEventResponse: response, Joined: true })
        })
    }

    handleLeaveEvent() {
        const { eventId,category,subtopic } = this.props.match.params;
        const { token } = this.context;
        leaveEvent(eventId,token).then(response => {
            this.this.setState({Joined:false})
            //this.props.history.push(`/${category}/${subtopic}`);
        })
    }

    handleDeleteEvent() {
        const { eventId,category,subtopic } = this.props.match.params;
        const { token } = this.context;
        deleteEvent(eventId,token).then(response=>{
            this.props.history.push(`/${category}/${subtopic}`);
        })
    }


    render() {
        const { eventInfo, eventAttendees, campusInfo, isOrganizer } = this.state;
        //const { user } = this.context
        return (
            <div>
                {eventInfo ? <EventHomePage Joined={this.state.Joined}
                    handleJoinEvent={this.handleJoinEvent}
                    handleDeleteEvent={this.handleDeleteEvent}
                    handleLeaveEvent={this.handleLeaveEvent}
                    {...this.props} {...this.context}
                    isOrganizer={isOrganizer}
                    event={eventInfo}
                    eventAttendees={eventAttendees}
                    campusInfo={campusInfo} /> : <h1>Event does not exist</h1>}
            </div>
        )
    }

}

export default EventPage;


