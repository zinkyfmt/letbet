import React, {Component} from 'react';
import dateFormat from 'dateformat';
import { connect } from "react-redux";
import 'material-icons-react';

class MatchDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			home: {name:'A'},
			away: {name:'B'},
		};
		this.closePopup = this.closePopup.bind(this);
		this.getMatchDetail = this.getMatchDetail.bind(this);
	}
	componentDidMount() {
		this.getMatchDetail(this.props);
	}
	componentWillReceiveProps(nextProps){
		this.getMatchDetail(nextProps);
	}
	getMatchDetail(props) {
		let self = this;
		props.match_detail.home.get().then(function(docRef) {
			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			self.setState({home:docRef.data()});
		}).catch(function(error) {
			console.log("Error getting cached document:", error);
		});
		props.match_detail.away.get().then(function(docRef) {
			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			self.setState({away:docRef.data()});
		}).catch(function(error) {
			console.log("Error getting cached document:", error);
		});
	}


	closePopup() {
		this.props.dispatch({
			type:'UPDATE_MATCH_DETAIL',
			payload:{}
		});
	}
	render() {
		return (
			<div className="popup-match-detail">
				<div className="header-title">
					<span>Match Detail</span>
					<i className="material-icons md-24 md-dark" onClick={this.closePopup.bind(this)}>close</i>
				</div>
				<div className="container-match">
					<p><span>{dateFormat(this.props.match_detail.datetime, 'ddd, mm/dd')}, {dateFormat(this.props.match_detail.datetime, 'h:MM TT')}</span> - <span>Upcoming</span></p>
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
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	match_detail: state.match.match_detail
});

export default connect(mapStateToProps)(MatchDetail);

