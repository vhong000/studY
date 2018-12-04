import React, { Component } from 'react';
import { UserProfilePage } from '../../components';
import {
    fetchSchoolDatails,
    getUserProfile,
    fetchEventsByUserId,
    fetchEventsByOrganizerId
} from '../../fetches';
import { AuthContext, AuthWrapper } from '../../contexts/Auth.context';

class EventUserProfile extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            currUser: '',
            school: '',
            eventsJoined: [],
            eventsOrg: [],
            eventsFetched: false,
            dataLoaded: false,
            renderEdit: false
        };
    }

    componentDidMount() {
        const { params } = this.props.match;
        if (params) {
            this.getUserDetails(params);
        }
    }

    componentDidUpdate() {
        const { params } = this.props.match;
        if (params) {
            this.getUserDetails(params);
        }
    }

    getUserDetails(params) {
        const userInfo = params.eventUserProfile.split("-")
        const { currUser, school } = this.state;
        const { user = null } = this.props;
        //const { token } = this.context;
        const token = localStorage.getItem('token');
        console.log("[0] ", userInfo, token)
        if (!currUser && !school) {
            getUserProfile(token, userInfo[1]).then((userResponse) => {
                fetchSchoolDatails(userResponse.school).then((schoolResponse) => {
                    this.setState({
                        currUser: userResponse,
                        school: schoolResponse
                    })
                })
            })
            const eventByUser = fetchEventsByUserId(userInfo[1]);
            const eventsByOrganizer = fetchEventsByOrganizerId(userInfo[1]);

            Promise.all([eventByUser, eventsByOrganizer]).then(response => {
                this.setState({
                    eventsJoined: response[0].results,
                    eventsOrg: response[1].results,
                    eventsFetched: true,
                    renderEdit: user && (userInfo[1] === user.owner.id)
                });
            });
        }
    }

    render() {
        // const { user = null } = this.props;
        const { dataLoaded, school, currUser } = this.state;
        console.log("eventUser ", this.state, this.props)
        return (
            <div>
                {currUser ? <UserProfilePage 
                    user={currUser} 
                    school={this.state.school} 
                    eventsJoined={this.state.eventsJoined}
                    eventsOrg={this.state.eventsOrg}
                    handleOpen = {this.handleEditModalOpen}
                    handleClose = {this.handleEditModalClose}
                    editModalOpened = {this.state.editModalOpened}
                    renderEdit={this.state.renderEdit}
                />: false}
            </div>
        )
    }
}

export default EventUserProfile;
