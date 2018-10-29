import React, { Component } from 'react';
import { EventList, EventHomePage } from '../../components';

class EventPage extends Component {
    constructor(props){
        super(props);
        this.state ={
            dataLoaded:false
        }
    }



    componentWillMount(){
        //here check if information is available
    }
    render() {
        return (
            <div>
                <EventHomePage/>
            </div>
        )
    }

}

export default EventPage;


