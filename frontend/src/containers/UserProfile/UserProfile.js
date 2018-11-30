import React, { Component } from 'react';
import { UserProfilePage } from '../../components';
import { fetchSchoolDatails, fetchEventsByUserId } from '../../fetches';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: null,
            dataLoaded: false,
            events: [],
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


    componentDidMount() {
        this.getSchoolDetails();
    }

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

    componentDidUpdate() {
        const { user } = this.props;
        this.getSchoolDetails();
        if (this.state.events.length) {
            return;
        }
        fetchEventsByUserId(user.owner.id).then(response => {
            this.setState({
                events: response.results
            });
        });
    }

    render() {
        const { user = null } = this.props;
        //console.log(this.state);
        return (
            <>
                {this.state.dataLoaded && user ? 
                (<UserProfilePage 
                    user={user} 
                    school={this.state.school} 
                    events={this.state.events}
                    handleOpen = {this.handleEditModalOpen}
                    handleClose = {this.handleEditModalClose}
                    editModalOpened = {this.state.editModalOpened}
                />) : <h3>you are logged out</h3>}
            </>
        )
    }
}

export default UserProfile;
