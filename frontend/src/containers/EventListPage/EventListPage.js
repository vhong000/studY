import React, { Component } from 'react';
import { EventList } from '../../components';
import { fetchAllEvents } from '../../fetches';
import { AuthContext } from '../../contexts/Auth.context';
import  moment  from 'moment';

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
        if (this.props.match.params) {
            fetchAllEvents().then(response => {
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
        if (eventsArray){
            let date = new Date(eventsArray[0].time).getMonth();
            //console.log(date)
            let eventformat = {
                date: moment.months(date),
                events:[]

            }


            eventsArray.map((eventObject, i)=>{
                //console.log(eventObject);
                if(date ===  new Date(eventObject.time).getMonth()){
                    eventformat.events.push(eventObject);
                }
                else{
                    const oldEventFormat = eventformat;
                    date = new Date(eventObject.time).getMonth();
                    eventformat = {
                        date: moment.months(date),
                        events:[eventObject]
                    }
                    results.push(oldEventFormat);
                }
            })
            results.push(eventformat)
        }
        console.log("result",results);
        this.setState({listofevents:results});
    }







    render() {
        const listEvents = [
            {
                "date": "November 10",
                "events": [

                    {
                        "id": 0,
                        "title": "Dynamic Programming",
                        "time": "8:00pm",
                        "Description": "He an thing rapid these after going drawn or. Timed she his law the spoil round defer. In surprise concerns informed betrayed he learning is ye. Ignorant formerly so ye blessing. He as spoke avoid given downs money on we. Of properly carriage shutters ye as wandered up repeated moreover. Inquietude attachment if ye an solicitude to. Remaining so continued concealed as knowledge happiness.",
                        "location": "City College",
                        "spots": 5
                    },
                    {
                        "id": 1,
                        "title": "Hash maps",
                        "time": "8:00pm",
                        "Description": "Lose away off why half led have near bedLose away off why half led have near bed,Lose away off why half led have near bed. At engage simple father of period others except. My giving do summer of though narrow marked ",
                        "location": "City College",
                        "spots": 5
                    },

                    {
                        "id": 2,
                        "title": "Amortization",
                        "time": "8:00pm",
                        "Description": "Lose away off why half led have near bed Sentiments two occasional affronting solicitude travelling and one contrasted. Fortune day out married parties. Happiness remainder joy but earnestly for of",
                        "location": "City College",
                        "spots": 5
                    }
                ]
            },

            {
                "date": "November 20",
                "events": [

                    {
                        "id": 3,
                        "title": "recursion",
                        "time": "8:00pm",
                        "Description": "Offered say Lose away off why half led have near bed visited elderly and. Waited period are played family man formed. He ye body or made on pain part meet. You one delay nor begin our folly abod",
                        "location": "City College",
                        "spots": 5

                    },

                    {
                        "id": 4,
                        "title": "sorting",
                        "time": "8:00pm",
                        "Description": "Feel sold off Lose away off why half led have near bedLose away off why half led have near bed Lose away off why half led have near bed felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile",
                        "location": "City College",
                        "spots": 5
                    }
                ]
            },
        ]
        console.log(this.state.events);
        return (
            <div>
                <EventList listofevents={this.state.listofevents} params={this.props.match.params} />
            </div>
        )
    }

}

export default EventListPage;


