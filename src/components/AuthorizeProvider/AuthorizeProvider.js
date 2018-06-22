import React, { Component } from 'react';
import './AuthorizeProvider.css';

const { Provider, Consumer } = React.createContext({ isAuthorized: false });

class AuthorizeProvider extends Component {

    state = {
        isAuthorized: false,
    };

	authorizeUser = (email, password) => {
		if(email === '1' && password === '1' ){
			this.setState( ({ isAuthorized }) => ({ isAuthorized: true}));
			return true;
		}
	};

	render() {
		const {children} = this.props;
		const {isAuthorized} = this.state;

		return (
            <Provider
	            value={{ isAuthorized, authorizeUser: this.authorizeUser }}
            >
	            {children}
            </Provider>
		);
	}
}
const AuthHOC = WrappedComponent =>
  class extends Component {
    static displayName = 'AuthHOCWrapper';
    render() {
      return (
        <Consumer>
          {({ isAuthorized, authorizeUser }) => (
            <WrappedComponent {...this.props} {...{ isAuthorized, authorizeUser }} />
          )}
        </Consumer>
      );
    }
  };

export { AuthorizeProvider, AuthHOC };
