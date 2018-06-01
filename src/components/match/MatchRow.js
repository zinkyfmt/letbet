import React, {Component} from 'react';

export default class MatchRow extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		console.log(this.props.item);
	}

	render() {
		return (
			<tr>
				<td scope="col" className="time">{this.props.item.date} {this.props.item.time}</td>
				<td className="home-team"><Team item={this.props.item.home} /></td>
				<td scope="col" className="col-md-1">-</td>
				<td className="away-team"><Team item={this.props.item.away} /></td>
				<td scope="col" className="col-md-2">{this.props.item.group}</td>
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
			<span>
				<p><img className="avatar-team" src={this.props.item.avatar}/></p>
				{this.props.item.name}
			</span>
		)
	}
}
