import React, { Component } from 'react';
import { EditFormPage } from '../../components';
import { fetchSchools } from '../../fetches';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schools: []
        }
    }

    componentDidMount() {
        fetchSchools().then(response => {
            this.setState({ schools: response.results })
          });
    }

    render() {
        const { user } = this.props;
        return (
            <>
                {this.state.schools.length > 0 && 
                <EditFormPage user={user} schools={this.state.schools}/> }
            </>    
        )  
    }
}

export default EditForm;
