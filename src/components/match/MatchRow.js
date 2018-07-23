import React, {Component} from 'react';

export default class MatchRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uid: null,
		};
		this.overBet = this.overBet.bind(this);
		this.underBet = this.underBet.bind(this);
	}
	componentWillMount() {
	}
	componentWillReceiveProps(nextProps){
		this.setState({uid: nextProps.uid})
	}

	overBet() {
		console.log('o');
	}
	underBet() {
		console.log('u');
	}
	render() {
		return (
			<tr key={this.props.item.uid}>
				<td scope="col" className="time">{this.props.item.date} {this.props.item.time}</td>
				<td scope="col" className="home-team"><Team item={this.props.item.home} /></td>
				<td scope="col" className="">-</td>
				<td scope="col" className="away-team"><Team item={this.props.item.away} /></td>
				<td scope="col" className="col-md-4">{this.props.item.group}</td>
				<td scope="col" className="col-md-4">{this.props.item.handicap}</td>
				{
					this.state.uid ? <td scope="col" className="col-md-2"><span><a href="#" onClick={this.overBet}>Over</a></span>/<span><a href="#" onClick={this.underBet}>Under</a></span></td>
						: <td scope="col" className="col-md-2"><span><a href="#" onClick={this.props.logIn}>Login</a></span></td>
				}
			</tr>
		)
	}
};

export class Team extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<img className="avatar-team" src={this.props.item.avatar}/>
				<span>{this.props.item.name}</span>
			</div>
		)
	}
}
