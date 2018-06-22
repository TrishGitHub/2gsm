import React, { Component, Fragment } from 'react';
import { AuthHOC } from 'components/AuthorizeProvider';
import Map from 'components/Map';


class Private extends Component {

	render() {
		return(
			<Fragment>
				<h1>Map</h1>
				<Map />
			</Fragment>
		)
	};
};

export default AuthHOC(Private);

