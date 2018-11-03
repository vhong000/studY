
import React, { Component } from 'react';

import { Register } from '../../components';
import { AuthContext } from '../../contexts/Auth.context';
import { fetchSchools } from '../../fetches';

class loginWrapper extends Component  {
  static contextType = AuthContext;

  componentDidMount() {
    fetchSchools().then(result => { this.setState({ schools: result })}); 
  }

  render() {
    return ( 
      <Register {...this.props} {...this.context} />
    )
  }
}

export default (loginWrapper)
