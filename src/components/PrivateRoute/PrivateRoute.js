import React, { PureComponent } from 'react';
import { AuthHOC } from 'components/AuthorizeProvider';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends PureComponent {
	render () {
		const { isAuthorized, path, component: Component } = this.props;

		return !isAuthorized
			? <Redirect to="/login" />
			: <Route to={path} component={Component} />;
	}
}

export default AuthHOC(PrivateRoute);
