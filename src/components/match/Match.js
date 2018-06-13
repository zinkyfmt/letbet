import React, {Component} from 'react';
import groupArray from 'group-array';
import dateFormat from 'dateformat';
import "../firebase/firebase";
import fireBase from 'firebase';

const ROUND_STAGE = {
	1: 'Group Stage - Round 1',
	2: 'Group Stage - Round 2',
};

export default class Match extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uid: null,
			matches: [],
			user_id: this.props.user_id
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
    getMatchDetailByUid = (uid, bet_value, bet_id) => {
		let match = this.state.matches.filter((item) => item.id === uid);
        this.props.getMatchDetailByUid(match[0],bet_value, bet_id);
    };
	componentWillReceiveProps(nextProps){
		this.setState({user_id:nextProps.user_id});
	}
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
							return <MatchItem user_id={this.state.user_id} getMatchDetailByUid={this.getMatchDetailByUid.bind(this)} key={item.id} matches={item}/>;
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
			home: {},
			user_id: this.props.user_id,
			bet_value: 0,
			bet_id: null
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

		let fireStore = fireBase.firestore();
		const settings = {timestampsInSnapshots: true};
		fireStore.settings(settings);
		fireStore.collection("bet").where("match_id",'==',this.state.match_id).where("user_id",'==',this.state.user_id).get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				self.setState({bet_value:doc.data().bet_value});
				self.setState({bet_id:doc.id});
			});
		}).catch(function(error) {
			console.log("Error getting documents: ", error);
		});
	}
	componentWillReceiveProps(nextProps){
		this.setState({user_id:nextProps.user_id});
	}
	render() {
		return (
			<div className="item" key={this.state.match_id} onClick={this.props.getMatchDetailByUid.bind(this,this.state.match_id,this.state.bet_value, this.state.bet_id)}>
				<div className="item-header">
					<span>Group {this.props.matches.group} - {this.state.bet_value}</span>
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
