
import React, { Component } from 'react';

import { EventForm } from '../components';
import { AuthContext } from '../contexts/Auth.context';
import { fetchSchools } from '../fetches';
import { isEmpty } from 'lodash';

class eventFormWrapper extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
    }
  }

  static contextType = AuthContext;

  componentDidMount() {
    fetchSchools().then(response => { 
      this.setState({ schools: response.results })
    }); 
  }

  render() {
    const hasSchools = !isEmpty(this.state.schools);
    return ( 
      hasSchools ? (
        <EventForm {...this.props} {...this.context} 
        schools={this.state.schools} />
      ) : (<p> Loading...</p>)
    )
  }
}

export default (eventFormWrapper)