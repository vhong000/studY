import React, { Component } from 'react';
import { Header, EventList } from '../../components';

class EventListPage extends Component {


    render() {
        console.log("[Container]: ", this.props);

        return (
            <div>
                <Header />
                <h4>list EventListPage Container</h4>
                <EventList />
            </div>
        )
    }

}

export default EventListPage;


