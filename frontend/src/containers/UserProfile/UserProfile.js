import React, { Component } from 'react';
import { UserProfilePage } from '../../components';
import { fetchSchoolDatails, fetchEventsByUserId } from '../../fetches';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: null,
      dataLoaded: false,
      events: []
    };
  }

  componentDidMount() {
    this.getSchoolDetails();
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
                {this.state.dataLoaded && user ? (<UserProfilePage user={user} 
                    school={this.state.school} events={this.state.events}/>) : <h3>you are logged out</h3>}
            </>
        )
    }
}

export default UserProfile;
