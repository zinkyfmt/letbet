import React, { Component } from 'react';
import MatchRow from "./MatchRow";
import groupArray from 'group-array';


class UpComing extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		// let a = groupArray(this.props.item, 'date');
		// console.log(this.props.next_matches);
		// let array = this.props.item.map(item => (
		// 	[item]
		// ));
		// console.log(array);
	}
	render() {
		return (
			<div className="list-match box">
				<div className="header-box">
					<a href="#">Next Games</a>
				</div>
				<div className="matches">
					{this.props.next_matches.map(item => (
						<div key={item.uid} className="match-row">
							<MatchRow item={item}/>
						</div>
					))}
				</div>
			</div>
		);
	}
}
export default UpComing;