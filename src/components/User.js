import React, { Component } from 'react';

class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: true,
			user_id: null,
			avatar: null,
			email: null
		};
		this.signInForm = this.signInForm.bind(this);
		this.logOut = this.logOut.bind(this);
	}
	signInForm() {
		console.log('sign in')
	}
	logOut() {
		this.setState({isLoggedIn:false});
	}
	render() {
		const userBlock = this.state.isLoggedIn ? <span>{this.state.user_id} | <a href="#" onClick={this.logOut}>Log Out</a></span> : <span> <a href="#" onClick={this.signInForm}>Log In</a></span>;
		return (
			<div className="user-block">
				{userBlock}
			</div>
		);
	}
}
export default User;