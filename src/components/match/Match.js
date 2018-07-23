import React, {Component} from 'react';
import groupArray from 'group-array';
import { connect } from "react-redux";

import {fetchMatches} from "../../actions/matches";

import MatchItem from "./MatchItem";
import MatchDetail from "./MatchDetail";
import {addProducts} from "../../actions/teams";
import ModalAdd from "./AddMatch";
const ROUND_STAGE = {
	1: 'Group Stage - Round 1',
	2: 'Group Stage - Round 2',
};

class Match extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAdmin: false,
			name: '',
			group: '',
			avatar: '',
			addMatchModel: false
		};
	}
	componentDidMount() {
		this.props.dispatch(fetchMatches());
	}
	openModalAdd = () => this.setState({addMatchModel: true});
	renderMatch() {
		let matchObject = {};
		if (this.props.matches) {
			matchObject = groupArray(this.props.matches, 'round_stage');
		}
		return Object.keys(matchObject).map((number) =>
			<div key={number}>
				<div className="title-row"><span>{ROUND_STAGE[number]}</span></div>
				<div className="list-match">
					{
						matchObject[number].map((item) => {
							return <MatchItem key={item.id} match={item}/>;
						})
					}
					<div className="clear-box"></div>
				</div>
			</div>
		);
	};

	handleHide = () => {
		this.setState({addMatchModel: false});
	};
	render() {
		return (
			<div>
				<div className="row">
					<div className={this.props.match_detail.id ? "col-md-9": ""}>{this.renderMatch()}</div>
					{this.props.match_detail.id ? <div className="match-detail col-md-3"><MatchDetail/></div> : ""}
					<div className="clear-box"></div>
				</div>
				<div className="popup-add">
					<button className="btn" onClick={this.openModalAdd}>
						Add Team New
					</button>
					<ModalAdd show={this.state.addMatchModel} teams={this.props.teams} handleHide={this.handleHide.bind(this)}/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	count: state.match.count,
	error: state.match.error,
	teams: state.team.items,
	matches: state.match.matches,
	match_detail: state.match.match_detail
});

export default connect(mapStateToProps)(Match);
