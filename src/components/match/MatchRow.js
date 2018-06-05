import React, {Component} from 'react';

export default class MatchRow extends Component {
	constructor(props) {
		super(props);
		this.overBet = this.overBet.bind(this);
		this.underBet = this.underBet.bind(this);
	}
	componentWillMount() {
		console.log(this.props.item);
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
				<td scope="col" className="home-team col-md-3"><Team item={this.props.item.home} /></td>
				<td scope="col" className="">-</td>
				<td scope="col" className="away-team col-md-3"><Team item={this.props.item.away} /></td>
				<td scope="col" className="col-md-2">{this.props.item.group}</td>
				<td scope="col" className="col-md-2">{this.props.item.handicap}</td>
				<td scope="col" className="col-md-2"><span><a href="#" onClick={this.overBet}>Over</a></span>/<span><a href="#" onClick={this.underBet}>Under</a></span></td>
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
