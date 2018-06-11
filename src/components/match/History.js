import React, { Component } from 'react';
import MatchRow from "./MatchRow";

class History extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uid: null
		};
		// console.log(this.props);
		this.tableRender = this.tableRender.bind(this);
		this.logIn = this.logIn.bind(this);
	}

	logIn() {
		this.setState({
			uid: 1
		});
	}
	tableRender() {
			const listDate = this.props.history.map((item) =>
				<MatchRow uid={this.state.uid} key={item.uid} item={item} logIn={this.logIn.bind(this)}/>
			);
			return  (
					<table className="table table-condensed">
						<thead>
							<tr>
								<th scope="col" className="time">Start Time</th>
								<th scope="col" align="center" colSpan="3">Match</th>
								<th scope="col" className="col-md-4">Group</th>
								<th scope="col" className="col-md-4">Over/Under Handicap</th>
								<th scope="col" className="col-md-2">Bet</th>
							</tr>
						</thead>
						<tbody>{listDate}</tbody>
					</table>
				);
	}
	render() {
		return (
			<div className="list-match box">
				<div className="header-box">
					<a href="#">History Matches</a>
				</div>
				{this.tableRender()}
			</div>
		);
	}
}
export default History;