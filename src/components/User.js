import React, { Component } from 'react';

class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.user.name
		};
		this.signInForm = this.signInForm.bind(this);
		this.logOut = this.logOut.bind(this);
	}
	signInForm() {
		console.log('sign in');
		let user = {
			uid: 1,
			name: 'Test User',
			email: 'test@gmail.com'
		};
		this.setState({name:'Test user'});
		localStorage.setItem('user',JSON.stringify(user));
	}
	logOut() {
		this.setState({name:null});
		localStorage.removeItem('user');
	}
	render() {
		const userBlock = this.state.name ? <span>{this.state.name} | <a href="#" onClick={this.logOut}>Log Out</a></span> : <span> <a href="#" onClick={this.signInForm}>Log In</a></span>;
		return (
			<div className="user-block">
				{userBlock}
			</div>
		);
	}
}
export default User;