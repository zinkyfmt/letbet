import React, { Component } from 'react';
import logo from '../wc-russia-2018.png';
import User from "./User"

class Header extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const user = this.props.user;
		return (
			<header className="header">
				{/*<img src={logo} className="logo-header" height={200}/>*/}
				<div className="title-header"><span className="slogan">FIFA WORLD CUP RUSSIA 2018</span></div>
				<User user={user}/>
				<div className="clear-box"></div>
				<Tabs>
					<Pane label="Tab 1">
						<div>This is my tab 1 contents!</div>
					</Pane>
					<Pane label="Tab 2">
						<div>This is my tab 2 contents!</div>
					</Pane>
					<Pane label="Tab 3">
						<div>This is my tab 3 contents!</div>
					</Pane>
				</Tabs>
			</header>
		);
	}
}
export default Header;
