import React, {Component} from 'react';
import MultiToggle from 'react-multi-toggle';
import dateFormat from 'dateformat';
import MaterialIcon, {colorPallet} from 'material-icons-react';

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
			match_detail: this.props.match_detail,
			groupSize: this.props.groupSize
		};
		this.onGroupSizeSelect = this.onGroupSizeSelect.bind(this);
	}
	// componentDidMount() {
	// 	this.setState({match_detail: this.props.match_detail})
	// }
	componentWillReceiveProps(nextProps){
		this.setState({match_detail: nextProps.match_detail});
        this.setState({groupSize: nextProps.groupSize})
	}
	onGroupSizeSelect(value) {
		true ? this.setState({ groupSize: value }) : false;
	}
	render() {
		return (
			<div className="popup-match-detail">
				<div className="header-title">
					<span>Match Detail</span>
					<i className="material-icons md-24 md-dark" onClick={this.props.closePopup.bind(this)}>close</i>
				</div>
				<div className="container-match">
					<p><span>{dateFormat(this.state.match_detail.datetime, 'ddd, mm/dd')}, {dateFormat(this.state.match_detail.datetime, 'h:MM TT')}</span> - <span>Upcoming</span></p>
					<div className="row">
						<div className="nation-team col-md-5">
							<span>{this.state.match_detail.home.name}</span>
							<img src={this.state.match_detail.home.avatar}/>
						</div>
						<div className="score col-md-2">vs</div>
						<div className="nation-team col-md-5">
							<span>{this.state.match_detail.away.name}</span>
							<img src={this.state.match_detail.away.avatar}/>
						</div>
					</div>
					<p><span>Goals Over/Under</span></p>
					<div className="goals-number">{this.state.match_detail.handicap}</div>
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

