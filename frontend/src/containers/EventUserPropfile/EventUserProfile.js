import React, { Component } from 'react';
import { UserProfilePage } from '../../components';
import { fetchSchoolDatails, getUserProfile } from '../../fetches';
import { AuthContext, AuthWrapper } from '../../contexts/Auth.context';

class UserProfile extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            currUser: '',
            school: '',
            dataLoaded: false,
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
        }
    }

    render() {
        // const { user = null } = this.props;
        const { dataLoaded, school, currUser } = this.state;
        console.log("eventUser ", currUser)
        return (
            <div>
                <h4>user event container </h4>
            </div>
        )
    }
}

export default UserProfile;
