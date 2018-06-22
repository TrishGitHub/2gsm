import { AUTHORIZE_USER } from './authorizeTypes';

export const authorizeUser = (payload) => ({
	type: AUTHORIZE_USER,
	payload: payload
})
