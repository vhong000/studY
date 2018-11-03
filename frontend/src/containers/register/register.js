
import React, { Component } from 'react';

import { Register } from '../../components';
import { AuthContext } from '../../contexts/Auth.context';
import { fetchSchools } from '../../fetches';
import { isEmpty } from 'lodash';

class registerWrapper extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
    }
  }

  static contextType = AuthContext;

  componentDidMount() {
    fetchSchools().then(response => { 
      // console.log(response.results);
      this.setState({ schools: response.results })
    }); 
  }

  render() {
    const hasSchools = !isEmpty(this.state.schools);
    return ( 
      hasSchools ? (
        <Register {...this.props} {...this.context} 
        schools={this.state.schools} />
      ) : (<p> Loading...</p>)
    )
  }
}

export default (registerWrapper)
