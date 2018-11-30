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
    this.getSchoolDetails();
  }

  componentDidUpdate() {
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

  render() {
    const { user = null } = this.props;
    const { dataLoaded, school } = this.state;
    return (
      <>
        {dataLoaded && user ? (
          <UserProfilePage
            user={user}
            school={school}
          />
        ) : <h3>you are logged out</h3>}
      </>
    );
  }
}

export default UserProfile;
