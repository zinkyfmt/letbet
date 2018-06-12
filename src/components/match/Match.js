import React, {Component} from 'react';
import groupArray from 'group-array';
import dateFormat from 'dateformat';
import "../firebase/firebase";
import fireBase from 'firebase';

const ROUND_STAGE = {
	1: 'Group Stage - Round 1',
	3: 'Group Stage - Round 2',
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
		'handicap': 3,
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
		'handicap': 2,
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
		'handicap': 1,
		'round_stage': 2
	},
];

export default class Match extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uid: null,
			matches: []
		};
		this.overBet = this.overBet.bind(this);
		this.underBet = this.underBet.bind(this);
		this.getRoundName = this.getRoundName.bind(this);
		this.renderMatch = this.renderMatch.bind(this);

	}
	componentDidMount() {
		let self = this;
		const fireStore = fireBase.firestore();
		const settings = {timestampsInSnapshots: true};
		fireStore.settings(settings);
		fireStore.collection("matches").get().then(function(querySnapshot) {
			let matchesData = [];
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				let tmp = doc.data();
				tmp.id = doc.id;
				matchesData.push(tmp);
			});
			self.setState({matches:matchesData});
		});
	}

	getRoundName(key) {
		return ROUND_STAGE[key];
	}
	overBet() {
		console.log('o');
	}
	underBet() {
		console.log('u');
	}
    getMatchDetailByUid = (uid) => {
		let match = this.state.matches.filter((item) => item.id === uid);
        this.props.getMatchDetailByUid(match[0]);
    };
	renderMatch() {

		let matchObject = {};
		if (this.state.matches) {
			matchObject = groupArray(this.state.matches, 'round_stage');
		}
		return Object.keys(matchObject).map((number) =>
			<div key={number}>
				<div className="title-row"><span>{this.getRoundName(number)}</span></div>
				<div className="list-match">
					{
						matchObject[number].map((item) => {
							return <MatchItem getMatchDetailByUid={this.getMatchDetailByUid.bind(this)} key={item.id} matches={item}/>;
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
		this.state = {
			match_id: this.props.matches.id,
			group: this.props.matches.group,
			datetime: this.props.matches.datetime,
			away: {},
			home: {}
		};
	}

	componentDidMount() {
		let self = this;
		// Get a document, forcing the SDK to fetch from the offline cache.
		this.props.matches.away.get().then(function(doc) {
			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			let away = doc.data();
			away.id = doc.id;
			self.setState({away});
		}).catch(function(error) {
			console.log("Error getting", error);
		});
		// Get a document, forcing the SDK to fetch from the offline cache.
		this.props.matches.home.get().then(function(doc) {
			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			let home = doc.data();
			home.id = doc.id;
			self.setState({home});
		}).catch(function(error) {
			console.log("Error getting", error);
		});
	}
	render() {
		return (
			<div className="item" key={this.state.match_id} onClick={this.props.getMatchDetailByUid.bind(this,this.state.match_id)}>
				<div className="item-header">
					<span>Group {this.props.matches.group}</span>
				</div>
				<div className="item-content">
					<div className="left-side-item">
						<p><img src={this.state.home.avatar}/><span>{this.state.home.name}</span></p>
						<p><img src={this.state.away.avatar}/><span>{this.state.away.name}</span></p>
					</div>
					<div className="right-side-datetime">
						<span>{dateFormat(this.state.datetime, 'ddd, mm/dd')}</span>
						<span>{dateFormat(this.state.datetime, 'h:MM TT')}</span>
					</div>
					<div className="clear-box"></div>
				</div>
			</div>
		)
	}
}
