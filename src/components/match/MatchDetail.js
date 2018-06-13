import React, {Component} from 'react';
import MultiToggle from 'react-multi-toggle';
import dateFormat from 'dateformat';
import 'material-icons-react';
import "../firebase/firebase";
import fireBase from 'firebase';

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
			user_id: this.props.user_id,
			match_id: this.props.match_detail.id,
			group: this.props.match_detail.group,
			datetime: this.props.match_detail.datetime,
			away: {},
			home: {},
			handicap: this.props.match_detail.handicap,
			groupSize: this.props.groupSize,
			bet_id: this.props.bet_id
		};
		this.onGroupSizeSelect = this.onGroupSizeSelect.bind(this);
	}
	componentDidMount() {
		let self = this;
		// Get a document, forcing the SDK to fetch from the offline cache.
		this.props.match_detail.away.get().then(function(doc) {
			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			let away = doc.data();
			away.id = doc.id;
			self.setState({away});
		}).catch(function(error) {
			console.log("Error getting", error);
		});
		// Get a document, forcing the SDK to fetch from the offline cache.
		this.props.match_detail.home.get().then(function(doc) {
			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			let home = doc.data();
			home.id = doc.id;
			self.setState({home});
		}).catch(function(error) {
			console.log("Error getting", error);
		});
	}
	// componentDidMount() {
	// 	this.setState({match_detail: this.props.match_detail})
	// }
	componentWillReceiveProps(nextProps){

		let self = this;
		// Get a document, forcing the SDK to fetch from the offline cache.
		nextProps.match_detail.away.get().then(function(doc) {
			// Domatch_detail.cument was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			let away = doc.data();
			away.id = doc.id;
			self.setState({away});
		}).catch(function(error) {
			console.log("Error getting", error);
		});
		// Get a document, forcing the SDK to fetch from the offline cache.
		nextProps.match_detail.home.get().then(function(doc) {
			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			let home = doc.data();
			home.id = doc.id;
			self.setState({home});
		}).catch(function(error) {
			console.log("Error getting", error);
		});
        this.setState({
			groupSize: nextProps.groupSize,
			match_id: nextProps.match_detail.id,
			group:nextProps.match_detail.group,
			datetime: nextProps.match_detail.datetime,
			handicap: nextProps.match_detail.handicap,
        });

	}

	onGroupSizeSelect(value) {
		let self = this;
		const fireStore = fireBase.firestore();
		const settings = {timestampsInSnapshots: true};
		fireStore.settings(settings);
		if (this.state.bet_id) {
			let betRef = fireStore.collection('bet').doc(this.state.bet_id);
			betRef.set({
				match_id: this.state.match_id,
				user_id: this.state.user_id,
				bet_value: value
			}).then(function() {
				console.log("Document successfully written!");
				self.setState({ groupSize: value })
			}).catch(function(error) {
				console.error("Error writing document: ", error);
			});
		} else {
			fireStore.collection('bet').add({
				match_id: this.state.match_id,
				user_id: this.state.user_id,
				bet_value: value
			}).then(function(docRef) {
				console.log(docRef.id);
				// self.props.updateBetId(docRef.id);
			}).catch(function(error) {
				console.error("Error writing document: ", error);
			});
		}


		// true ? this.setState({ groupSize: value }) : false;
	}
	render() {
		return (
			<div className="popup-match-detail">
				<div className="header-title">
					<span>Match Detail</span>
					<i className="material-icons md-24 md-dark" onClick={this.props.closePopup.bind(this)}>close</i>
				</div>
				<div className="container-match">
					<p><span>{dateFormat(this.state.datetime, 'ddd, mm/dd')}, {dateFormat(this.state.datetime, 'h:MM TT')}</span> - <span>Upcoming</span></p>
					<div className="row">
						<div className="nation-team col-md-5">
							<span>{this.state.home.name}</span>
							<img src={this.state.home.avatar}/>
						</div>
						<div className="score col-md-2">vs</div>
						<div className="nation-team col-md-5">
							<span>{this.state.away.name}</span>
							<img src={this.state.away.avatar}/>
						</div>
					</div>
					<p><span>Goals Over/Under</span></p>
					<div className="goals-number">{this.state.handicap}</div>
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

