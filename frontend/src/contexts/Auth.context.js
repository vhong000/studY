
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import propTypes from 'prop-types';
import { getUserData } from '../fetches';

export const AuthContext = React.createContext();

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: '',
    };
  }

  componentDidMount() {
    // this.setState(this.initialState());
    const currToken = localStorage.getItem('token');
    if (!currToken) {
      this.setState({
        token: '',
      });
    } else {
      getUserData(currToken).then((result) => {
        this.setState({
          token: currToken,
          user: result,
        });
      }).catch(() => {
        this.setState({ token: '', user: '' });
        localStorage.removeItem('token');
      });
    }
  }

  onLogin(token) {
    getUserData(token).then((result) => {
      localStorage.setItem('token', token);
      this.setState({
        token,
        user: result,
      });
    });
  }

  render() {
    const { token, user } = this.state;
    const { children } = this.props;
    return (
      <AuthContext.Provider value={{
        token,
        user,
        onLogout: () => {
          this.setState({ token: '', user: '' });
          localStorage.removeItem('token');
        },
        onLogin: (userToken) => { this.onLogin(userToken); },
      }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  children: propTypes.array,
};

AuthProvider.defaultProps = {
  children: [],
};

export default withRouter(AuthProvider);

const AuthConsumer = AuthContext.Consumer;

export function AuthWrapper(WrappedComponent) {
  return function Wrapper(props) {
    return (
      <AuthConsumer>
        {value => (
          <WrappedComponent {...props} {...value} />
        )}
      </AuthConsumer>
    );
  };
}
