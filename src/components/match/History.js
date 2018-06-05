import React, { Component } from 'react';
import MatchRow from "./MatchRow";

class History extends Component {
	constructor(props) {
		super(props);
		// console.log(this.props);
		this.tableRender = this.tableRender.bind(this);
	}
	tableRender() {
			const listDate = this.props.history.map((item) =>
				<MatchRow key={item.uid} item={item}/>
			);
			return  (
					<table className="table table-condensed">
						<thead>
							<tr>
								<th scope="col" className="time">Start Time</th>
								<th scope="col" align="center" colSpan="3">Match</th>
								<th scope="col" className="col-md-2">Group</th>
								<th scope="col" className="col-md-2">Over/Under Handicap</th>
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