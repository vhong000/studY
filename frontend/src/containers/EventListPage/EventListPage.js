import React, { Component } from 'react';
import { Header, EventList } from '../../components';

class EventListPage extends Component {


    render() {
        const listEvents = [
            {   "date":"November 10",
                "events": [

                    {

                        "title": "Dynamic Programming",
                        "time": "8:00pm",
                        "Description": "Learning the FAST method",
                        "location": "City College"
                    },
                    {

                        "title": "Hash maps",
                        "time": "8:00pm",
                        "Description": "Learning the FAST method",
                        "location": "City College"
                    },

                    {

                        "title": "Amortization",
                        "time": "8:00pm",
                        "Description": "Learning the FAST method",
                        "location": "City College"
                    }
                ]
            },

            {
                "date":"November 20",
                "events": [

                    {

                        "title": "",
                        "time": "8:00pm",
                        "Description": "Learning the FAST method",
                        "location": "City College"
                    
                    },

                    {

                        "title": "",
                        "time": "8:00pm",
                        "Description": "Learning the FAST method",
                        "location": "City College"
                    }
                ]
            },
        ]
        console.log("[Container]: ", this.props);

        return (
            <div>
                <h4>This page List all the Events</h4>
                <EventList listofevents={listEvents} />
            </div>
        )
    }

}

export default EventListPage;


