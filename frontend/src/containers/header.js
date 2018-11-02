
import React, { Component } from 'react';

import { Header } from '../components';
import { AuthContext } from '../contexts/Auth.context';

class Wrapper extends Component  {
  static contextType = AuthContext;

  render() {
    return ( 
      <Header {...this.props} {...this.context} />
    )
  }
}

export default Wrapper;