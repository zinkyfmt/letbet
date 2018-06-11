import React, {Component} from 'react';
import groupArray from 'group-array';
import dateFormat from 'dateformat';

const ROUND_STAGE = {
	1: 'Group Stage - Round 1',
	2: 'Group Stage - Round 2',
};
const MATCH_ARRAY = [
	{
		'uid': 1,
		'home': {
			'uid': 1,
			'name': 'England',
			'avatar': '//ssl.gstatic.com/onebox/media/sports/logos/DTqIL8Ba3KIuxGkpXw5ayA_48x48.png'
		},
		'away': {
			'uid': 2,
			'name': 'Brazil',
			'avatar': '//ssl.gstatic.com/onebox/media/sports/logos/zKLzoJVYz0bb6oAnPUdwWQ_48x48.png'
		},
		'datetime': '06/11/2018 21:00',
		'group': 'A',
		'handicap': 2.5,
		'round_stage': 1
	},
	{
		'uid': 2,
		'home': {
			'uid': 3,
			'name': 'Russia',
			'avatar': '//ssl.gstatic.com/onebox/media/sports/logos/5Y6kOqiOIv2C1sP9C_BWtA_48x48.png'
		},
		'away': {
			'uid': 4,
			'name': 'Arabia Saudi',
			'avatar': '//ssl.gstatic.com/onebox/media/sports/logos/QoAJxO46fHid3_T-7nRZ0Q_48x48.png'
		},
		'datetime': '06/10/2018 16:00',
		'group': 'B',
		'handicap': 2.5,
		'round_stage': 1
	},
	{
		'uid': 3,
		'home': {
			'uid': 1,
			'name': 'England',
			'avatar': '//ssl.gstatic.com/onebox/media/sports/logos/DTqIL8Ba3KIuxGkpXw5ayA_48x48.png'
		},
		'away': {
			'uid': 2,
			'name': 'Brazil',
			'avatar': '//ssl.gstatic.com/onebox/media/sports/logos/zKLzoJVYz0bb6oAnPUdwWQ_48x48.png'
		},
		'datetime': '06/10/2018 17:00',
		'group': 'A',
		'handicap': 2.5,
		'round_stage': 2
	},
	{
		'uid': 4,
		'home': {
			'uid': 3,
			'name': 'Russia',
			'avatar': '//ssl.gstatic.com/onebox/media/sports/logos/5Y6kOqiOIv2C1sP9C_BWtA_48x48.png'
		},
		'away': {
			'uid': 4,
			'name': 'Arabia Saudi',
			'avatar': '//ssl.gstatic.com/onebox/media/sports/logos/QoAJxO46fHid3_T-7nRZ0Q_48x48.png'
		},
		'datetime': '06/10/2018 18:00',
		'group': 'B',
		'handicap': 2.5,
		'round_stage': 2
	},
];

export default class Match extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uid: null,
		};
		this.overBet = this.overBet.bind(this);
		this.underBet = this.underBet.bind(this);
		this.getRoundName = this.getRoundName.bind(this);
		this.renderMatch = this.renderMatch.bind(this);
	}
	// componentDidMount() {
	// 	console.log(MATCH_ARRAY);
	// 	let a = groupArray(MATCH_ARRAY, 'round_stage');
	// 	console.log(a[1]);
	// }
	// componentWillReceiveProps(nextProps){
	// 	this.setState({uid: nextProps.uid})
	// }
	getRoundName(key) {
		return ROUND_STAGE[key];
	}
	overBet() {
		console.log('o');
	}
	underBet() {
		console.log('u');
	}

	renderMatch() {
		let matchObject = groupArray(MATCH_ARRAY, 'round_stage');
		return Object.keys(matchObject).map((number) =>
			<div key={number}>
				<div className="title-row"><span>{this.getRoundName(number)}</span></div>
				<div className="list-match">
					{
						matchObject[number].map((item) => {
							return <MatchItem key={item.uid} matches={item}/>;
						})
					}
					<div className="clear-box"></div>
				</div>
			</div>
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

export class MatchItem extends Component {
	constructor(props) {
		super(props);
	}

	getMatchDetailByUid = (uid) => {
		console.log(uid);
	};
	render() {
		return (
			<div className="item" key={this.props.matches.uid} onClick={this.getMatchDetailByUid.bind(this,this.props.matches.uid)}>
				<div className="item-header">
					<span>Group {this.props.matches.group}</span>
				</div>
				<div className="item-content">
					<div className="left-side-item">
						<p><img src={this.props.matches.home.avatar}/><span>{this.props.matches.home.name}</span></p>
						<p><img src={this.props.matches.away.avatar}/><span>{this.props.matches.away.name}</span></p>
					</div>
					<div className="right-side-datetime">
						<span>{dateFormat(this.props.matches.datetime, 'ddd, mm/dd')}</span>
						<span>{dateFormat(this.props.matches.datetime, 'h:MM TT')}</span>
					</div>
					<div className="clear-box"></div>
				</div>
			</div>
		)
	}
}
