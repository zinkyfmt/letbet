import React, { Component } from 'react';

class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.user.name
		};
	}
	render() {
		const userBlock = this.state.name ? <span>{this.state.name} | <a href="#" onClick={this.props.logOut}>Log Out</a></span>
			: <div> <input className="input-login" placeholder="username" name="username"/>
				<input className="input-login" placeholder="password" name="password" type="password"/>
				<button className="btn" onClick={this.props.logIn}>Log In</button></div>;
		return (
			<div className="user-block">
				{userBlock}
			</div>
		);
	}
}
export default User;