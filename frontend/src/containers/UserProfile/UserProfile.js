import React, { Component } from 'react';
import { UserProfilePage } from '../../components';
import { fetchSchoolDatails, fetchEventsByUserId, fetchEventsByOrganizerId } from '../../fetches';
import CircularProgress from '@material-ui/core/CircularProgress';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: null,
            dataLoaded: false,
            eventsJoined: [],
            eventsOrg: [],
            eventsFetched: false,
            editModalOpened: false
        }
            
        this.handleEditModalClose = this.handleEditModalClose.bind(this);
        this.handleEditModalOpen = this.handleEditModalOpen.bind(this);
    }

    handleEditModalOpen = () => {
        this.setState({ editModalOpened: true });
    };

    handleEditModalClose = () => {
        this.setState({ editModalOpened: false });
    };

    getSchoolDetails() {
        const { user } = this.props;
        if (user.school && !this.state.school) {
            fetchSchoolDatails(user.school).then(school => {
                this.setState({
                    school: school,
                    dataLoaded: true
                });
            });
        }
    }

    getEvents() {

        const { user } = this.props;
        if (this.state.eventsFetched || !user) {
            return;
        }
    
        const eventByUser = fetchEventsByUserId(user.owner.id);
        const eventsByOrganizer = fetchEventsByOrganizerId(user.owner.id);

        Promise.all([eventByUser, eventsByOrganizer]).then(response => {
            this.setState({
                eventsJoined: response[0].results,
                eventsOrg: response[1].results,
                eventsFetched: true
            });
        });
    }

    componentDidMount() {
        this.getSchoolDetails();
    }

    componentDidUpdate() {
        this.getSchoolDetails();   
        this.getEvents(); 
    }

    render() {
        const { user = null } = this.props;
        return (
            <>
                {this.state.dataLoaded && user ? 
                (<UserProfilePage 
                    user={user} 
                    school={this.state.school} 
                    eventsJoined={this.state.eventsJoined}
                    eventsOrg={this.state.eventsOrg}
                    handleOpen = {this.handleEditModalOpen}
                    handleClose = {this.handleEditModalClose}
                    editModalOpened = {this.state.editModalOpened}
                />) : <h3>you are logged out</h3>}
            </>
        )
    }
}

export default UserProfile;
