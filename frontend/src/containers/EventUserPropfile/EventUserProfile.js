import React, { Component } from 'react';
import { UserProfilePage } from '../../components';
import { fetchSchoolDatails } from '../../fetches';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: null,
            dataLoaded: false,
        };
    }

    componentDidMount() {
        //this.getSchoolDetails();
    }

    componentDidUpdate() {
        //this.getSchoolDetails();
    }

    getSchoolDetails() {
        const { user } = this.props;
        const { school } = this.state;
        if (user.school && !school) {
            fetchSchoolDatails(user.school).then((response) => {
                this.setState({
                    school: response,
                    dataLoaded: true,
                });
            });
        }
    }

    render() {
        const { user = null } = this.props;
        const { dataLoaded, school } = this.state;
        return (
            <div>
                <h4>user event container </h4>
            </div>
        )
    }
}

export default UserProfile;
