import React, { Component } from 'react';
import { UserProfilePage } from '../../components';
import { fetchSchoolDatails } from '../../fetches';
import CircularProgress from '@material-ui/core/CircularProgress';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: null,
            dataLoaded: false
        }
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

    componentDidMount() {
        this.getSchoolDetails();
    }

    componentDidUpdate() {
        this.getSchoolDetails();
    }
    render() {
        const { user = null } = this.props;
        //console.log(this.state);
        return (
            <>
                {this.state.dataLoaded && user ? (<UserProfilePage user={user}
                    school={this.state.school} />) : <h3>you are logged out</h3>}
            </>
        )
    }
}

export default UserProfile;

