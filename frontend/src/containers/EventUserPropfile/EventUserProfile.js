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
        const { params } = this.props.match;
        if(params){
            const userInfo =  params.eventUserProfile.split("-")          
            console.log("[0] ",userInfo)
        }
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
        console.log("eventUser ",this.props)
        return (
            <div>
                <h4>user event container </h4>
            </div>
        )
    }
}

export default UserProfile;
