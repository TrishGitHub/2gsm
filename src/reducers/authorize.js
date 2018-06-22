import { AUTHORIZE_USER } from '../actions/authorizeTypes';

const initState = {
	isAuthorized: false,
};

const authorizeReducer = (state = initState, action) => {
	switch (action.type) {
		case AUTHORIZE_USER:
			return {
				...state,
				isAuthorized: true,
			}
		default:
			return state;
	}
};

export default authorizeReducer;
