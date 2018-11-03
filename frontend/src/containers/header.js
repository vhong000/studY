
import React, { Component } from 'react';

import { Header } from '../components';
import { AuthContext } from '../contexts/Auth.context';

class headerWrapper extends Component  {
  static contextType = AuthContext;

  render() {
    return ( 
      <Header {...this.props} {...this.context} />
    )
  }
}

export default headerWrapper;