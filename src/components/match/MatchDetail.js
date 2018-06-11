import React, {Component} from 'react';
import MultiToggle from 'react-multi-toggle';

const groupOptions = [
	{
		displayName: 'Under',
		value: -1,
		isDisabled: true
	},
	{
		displayName: 'None',
		value: 0,
		isDisabled: true
	},
	{
		displayName: 'Over',
		value: 1,
		isDisabled: true
	},
];
export default class MatchDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matches: null,
			groupSize: 0
		};
		this.onGroupSizeSelect = this.onGroupSizeSelect.bind(this);
	}
	componentDidMount() {
		this.setState({matches: this.props.matches})
	}
	// componentWillReceiveProps(nextProps){
	// 	this.setState({matches: nextProps.matches})
	// }
	onGroupSizeSelect(value) {
		false ? this.setState({ groupSize: value }) : false;
	}

	render() {
		return (
			<div className="popup-match-detail">
				<div className="header-title"><span>Match Detail</span></div>

				<div className="container-match">
					<p><span>Thu, 16/12, 10:00 PM</span> - <span>Upcoming</span></p>
					<div className="row">
						<div className="nation-team col-md-5">
							<span>England</span>
							<img src="//ssl.gstatic.com/onebox/media/sports/logos/5Y6kOqiOIv2C1sP9C_BWtA_48x48.png"/>
						</div>
						<div className="score col-md-2">vs</div>
						<div className="nation-team col-md-5">
							<span>Russian</span>
							<img src="//ssl.gstatic.com/onebox/media/sports/logos/5Y6kOqiOIv2C1sP9C_BWtA_48x48.png"/>
						</div>
					</div>
					<p><span>Goals Over/Under</span></p>
					<div className="goals-number">2.5</div>
					<MultiToggle
						options={groupOptions}
						selectedOption={this.state.groupSize}
						onSelectOption={this.onGroupSizeSelect}
					/>

				</div>
			</div>
		)
	}
};

