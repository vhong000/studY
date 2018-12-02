import React, { Component } from 'react';
import { EditFormPage } from '../../components';
import { fetchSchoolDatails } from '../../fetches';
import CircularProgress from '@material-ui/core/CircularProgress';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: null,
            dataLoaded: false,
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
        fetchSchools().then(response => { 
            // console.log(response.results);
            this.setState({ schools: response.results })
          });
    }

    componentDidUpdate() {
        this.getSchoolDetails();
    }

    render() {
        const { user } = this.props;
        //console.log(this.state);
        return (
            <>
                {this.state.dataLoaded ? (<EditFormPage user={user} 
                                      school={this.state.school}/>) : false}
            </>
        )
    }
}

export default EditForm;
