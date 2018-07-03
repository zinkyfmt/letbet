import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../actions";

class TrackList extends Component {
	addTrack = () => {
		this.props.dispatch(actions.addTracks());
	}
	render() {
		return (
			<div>
				<span>{this.props.comments.count}</span>
				<button onClick={this.addTrack.bind(this)}>+</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {count: state.comments.count}
}

export default connect(mapStateToProps)(TrackList)
