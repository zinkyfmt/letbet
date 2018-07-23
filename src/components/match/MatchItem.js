import React, {Component} from 'react';
import dateFormat from "dateformat";
import { connect } from "react-redux";

const ROUND_STAGE = {
	1: 'Group Stage - Round 1',
	2: 'Group Stage - Round 2',
};

class MatchItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			match: this.props.match,
			home: {},
			away: {}
		};
		this.updateMatchDetail = this.updateMatchDetail.bind(this);
	}
	componentDidMount() {
		let self = this;
		this.state.match.home.get().then(function(docRef) {
			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			self.setState({home:docRef.data()});
		}).catch(function(error) {
			console.log("Error getting cached document:", error);
		});
		this.state.match.away.get().then(function(docRef) {
			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			self.setState({away:docRef.data()});
		}).catch(function(error) {
			console.log("Error getting cached document:", error);
		});
	}
	updateMatchDetail() {
		this.props.dispatch({
			type:'UPDATE_MATCH_DETAIL',
			payload:this.state.match
		});
	}
	render() {
		return (
			<div className="item" onClick={this.updateMatchDetail}>
				<div className="item-header">
					<span>Group - {this.state.match.group}</span>
				</div>
				<div className="item-content">
					<div className="left-side-item">
						<p><img src={this.state.home.avatar}/><span className="team-name-item">{this.state.home.name}</span></p>
						<p><img src={this.state.away.avatar}/><span className="team-name-item">{this.state.away.name}</span></p>
					</div>
					<div className="right-side-datetime">
						<span>{dateFormat(this.state.match.datetime, 'ddd, mm/dd')}</span>
						<span>{dateFormat(this.state.match.datetime, 'h:MM TT')}</span>
					</div>
					<div className="clear-box"></div>
				</div>
			</div>
		)
	}
}
export default connect()(MatchItem);