import React, {Component} from 'react';

export default class Match extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uid: null,
			matches: [],
			bet_value_temp: 0,
			bet_id_temp: null,
			user_id: this.props.user_id
		};
	}

	componentDidMount() {

	}

	renderMatch() {
		return (
			<div>abc</div>
		);
	};
	render() {
		return (
			<div>
				{this.renderMatch()}
			</div>
		)
	}
};
