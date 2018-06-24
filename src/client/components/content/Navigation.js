import React from "react";
import { Link } from "react-router";

let navStyle = {
	backgroundColor: "#ccf",
	padding: "20px",
	borderRadius: "4px",
};

let buttonStyle = {
	backgroundColor: "#FFF0C3",
	borderRadius: "4px",
	padding: "20px",

};

const Navigation = React.createClass({

	_logout: function(event) {
		event.preventDefault();
		this.props.manualLogout();
	},

	render: function() {
		return(
			<div style={navStyle}>				
				{
					this.props.user.authenticated 
					? <button onClick={this._logout} style={buttonStyle}>Logout [{this.props.user.email}]</button>
					: <Link to="/login">Log In</Link>
				}				
				{
					!this.props.user.authenticated 
					? <span>&nbsp;|&nbsp;<Link to="/register">Register</Link></span>
					: ""
				}
				&nbsp;|&nbsp;
				<Link to="/myprofile">Profile</Link>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<Link to="/">Author page</Link>
			</div>
		)	
	}
});

export default Navigation;