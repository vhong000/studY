import React, { Component } from 'react';
import { EventList } from '../../components';
import { fetchAllEvents, fetchEventByTopic } from '../../fetches';
import { AuthContext } from '../../contexts/Auth.context';
import moment from 'moment';

class EventListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            topicid: '',
            listofevents: [],
        }
    }
    static contextType = AuthContext;

    componentWillMount() {
        const id = this.props.match.params.subtopic;
        if (this.props.match.params) {
            fetchEventByTopic(id).then(response => {
                console.log(response)
                this.setState({ events: response.results })
                this.arangeEventsByDates(response.results);
            });
        }

    }

    arangeEventsByDates(eventsArray) {
        //var date1 = new Date('2018-10-28T05:50:22.715000Z').getDate();
        //var date = new Date('2018-10-28T05:50:22.715000Z').getMonth();
        //var monthName = moment.months(monthNum - 1); get month name.
        let results = []
        if (eventsArray.length) {
            let date = new Date(eventsArray[0].time).getMonth();
            //console.log(date)
            let eventformat = {
                date: moment.months(date),
                events: []

            }
            eventsArray.map((eventObject, i) => {
                //console.log(eventObject);
                if (date === new Date(eventObject.time).getMonth()) {
                    eventformat.events.push(eventObject);
                }
                else {
                    const oldEventFormat = eventformat;
                    date = new Date(eventObject.time).getMonth();
                    eventformat = {
                        date: moment.months(date),
                        events: [eventObject]
                    }
                    results.push(oldEventFormat);
                }
            })
            results.push(eventformat)
        }
        console.log("result", results);
        this.setState({ listofevents: results });
    }







    render() {
        console.log(this.state.events);
        const { listofevents } = this.state;
        return (
            <div>
                <EventList listofevents={listofevents} params={this.props.match.params} />
            </div>
        )
    }

}

export default EventListPage;


