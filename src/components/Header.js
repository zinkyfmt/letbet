import React, { Component } from 'react';
import logo from '../wc-russia-2018.png';
import User from "./User";

class Header extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const user = this.props.user;
		return (
			<header className="header">
				<img src={logo} className="logo-header" height={200}/>
				<User user={user}/>
				<div className="clear-box"></div>
			</header>
		);
	}
}
export default Header;