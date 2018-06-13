import React, { Component } from 'react';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: this.props.isLogin,
			name: this.props.user.name,
			avatar:this.props.user.avatar,
			usernameInput: '',
			passwordInput: ''
		};
	}
	updateInputValue(e, key) {
		this.setState({[key] : e.target.value});
	}
	logIn(e, username, password) {
		this.props.logIn(username,password);
	}
	componentWillReceiveProps(nextProps){
		this.setState({isLogin:nextProps.isLogin, name:nextProps.user.name,avatar:nextProps.user.avatar});
	}
	render() {
		const userBlock = this.state.isLogin ? <div><img className="user-avatar" src={this.state.avatar}/><span className="user-login">{this.state.name} | <a href="#" onClick={this.props.logOut}>Log Out</a></span></div>
			: <div> <input className="input-login" placeholder="username" name="username" value={this.state.usernameInput} onChange={evt => this.updateInputValue(evt, 'usernameInput')}/>
				<input className="input-login" placeholder="password" name="password" type="password" value={this.state.passwordInput} onChange={evt => this.updateInputValue(evt, 'passwordInput')}/>
				<button className="btn" onClick={evt => this.logIn(evt, this.state.usernameInput, this.state.passwordInput)}>Log In</button></div>;
		return (
			<div className="user-block">
				{userBlock}
			</div>
		);
	}
}
export default User;