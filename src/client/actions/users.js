import axios from "axios"
import { browserHistory } from "react-router"
import * as types from "../constants"

function beginLogin() {
	return { type: types.MANUAL_LOGIN_USER }
};

function loginSuccess(data) {
	return { 
		type: types.LOGIN_SUCCESS_USER,
		data
	}
};

function loginError() {
	return { type: types.LOGIN_ERROR_USER }
};

function beginLogout() {
	return { type: types.LOGOUT_USER }
};

function logoutSuccess() {
	return { type: types.LOGOUT_SUCCESS_USER }
};

function logoutError() {
	return { type: types.LOGOUT_ERROR_USER }
};

function beginRegister() {
	return { type: types.REGISTER_USER }
};

function registerSuccess() {
	return { type: types.REGISTER_SUCCESS_USER }
};

function registerError() {
	return { type: types.REGISTER_ERROR_USER }
};

function makeUserRequest(method, data, api="/login") {
	return axios({
		method: method,
		url: api,
		data: data
	})
};

export function manualLogin(
		data,
		successPath
	) {	
	return dispatch => {
		dispatch(beginLogin());

		return makeUserRequest("post", data, "/login")	
			.then(response => {
				if (response.data.success) {					
					dispatch(loginSuccess(data))
					browserHistory.push(successPath)
				} else {					
					dispatch(loginError())
					let loginMessage = response.data.message
					return loginMessage					
				}
			})
			.catch(function (response) {
			    if (response instanceof Error) {
			      console.log('Error', response.message);
			    }
		    })					
	}
};

export function manualLogout() {
	return dispatch => {
		dispatch(beginLogout())

		return axios.get("/logout")
			.then(response => {
				if (response.data.success) {
					dispatch(logoutSuccess())
					browserHistory.push("/")
				} else {
					dispatch(logoutError())
				}
			})
			.catch(response => {
			    if (response instanceof Error) {
			      console.log('Error', response.message);
			    }
			})
	}			
};

export function manualRegister(data) {	
	
	return dispatch => {
		dispatch(beginRegister());

		return makeUserRequest("post", data, "/register")	
			.then(response => {
				if (response.data.success) {					
					dispatch(registerSuccess())
					dispatch(manualLogin(data, "/"))
				} else {					
					dispatch(registerError())
					let registerMessage = response.data.message
					return registerMessage
				}
			})
			.catch(response => {
			    if (response instanceof Error) {
			      console.log('Error', response.message);
			    }
		    })
	}

};