import React, { Component } from 'react';
import './App.css';
import User from "./components/User";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactDOM from 'react-dom';
// import groupArray from 'group-array';
// import Dashboard from "./components/Dashboard";
import MatchDetail from "./components/match/MatchDetail";
import Match from "./components/match/Match";
import "./components/firebase/firebase";
import fireBase from 'firebase';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLogin: false,
			matches: [],
			user: {},
			match_detail: null,
			betValue: 0,
			bet_id: null
		};
	}

	componentDidMount() {
		let user = localStorage.getItem("user");
		let isLogin = user ? true : false;
		if (localStorage.getItem("user")) {
			this.setState({isLogin: isLogin});
			user = JSON.parse(user);
			this.setState({user});
		}
		// let firestore = fire.firestore();
		// const settings = {timestampsInSnapshots: true};
		// firestore.settings(settings);
        // let user = localStorage.getItem('user');
		// let userObject = user ? JSON.parse(user) : {};
		// this.setState({user : userObject});
        // var citiesRef = firestore.collection('matches').orderBy('datetime');
        // citiesRef.get()
        //     .then(snapshot => {
        //         snapshot.forEach(doc => {
        //             console.log(doc.id, '=>', doc.data());
        //         });
        //     })
        //     .catch(err => {
        //         console.log('Error getting documents', err);
        //     });
		// this.setState({matches:MATCH_ARRAY})
	}
    getMatchDetailByUid = (match_detail, bet_value, bet_id) => {
        this.setState({match_detail});
		this.setState({bet_id});
		this.setState({betValue:bet_value});
    };
	logIn(username, password) {
		let self = this;
		let fireStore = fireBase.firestore();
		const settings = {timestampsInSnapshots: true};
		fireStore.settings(settings);
		fireStore.collection("users").where("username",'==',username.trim()).where("password",'==',password.trim()).get().then(function(querySnapshot) {
			console.log(querySnapshot);
			if(querySnapshot.empty) {
				alert('Wrong username/password. Please try again');
			}
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				let temp = doc.data();
					temp.id = doc.id;
				self.setState({user:temp});
				self.setState({isLogin:true});
				localStorage.setItem('user',JSON.stringify(temp));
			});
		}).catch(function(error) {
			console.log("Error getting documents: ", error);
		});

	}
	logOut() {
		localStorage.removeItem('user');
		this.setState({user:{},isLogin:false});
	}
    closePopup() {
        this.setState({match_detail:null});
	};
	updateBetId(betId) {
		this.setState({bet_id:betId});
		console.log(betId);
	}
	render() {
		return (
		  <div className="App">
			  <header className="header">
				  {/*<img src={logo} className="logo-header" height={200}/>*/}
				  <div className="title-header"><span className="slogan">Fifa world cup - Russia 2018</span></div>
				  <User user={this.state.user} logIn={this.logIn.bind(this)} logOut={this.logOut.bind(this)} isLogin={this.state.isLogin}/>
				  <div className="clear-box"></div>
			  </header>
			  <Tabs>
				  <TabList>
					  <Tab>Matches</Tab>
					  <Tab>Standings</Tab>
					  <Tab>Summary</Tab>
				  </TabList>
				  <TabPanel>
					  <div className="row">
						  <div className="tab-content col-md-9"><Match user_id={this.state.user.id} getMatchDetailByUid={this.getMatchDetailByUid.bind(this)}/></div>
						  {this.state.match_detail ? <div className="match-detail col-md-3"><MatchDetail user_id={this.state.user.id} updateBetId={this.updateBetId.bind(this)} closePopup={this.closePopup.bind(this)} groupSize={this.state.betValue} bet_id={this.state.bet_id} match_detail={this.state.match_detail}/></div> : ""}
					  </div>
				  </TabPanel>
				  <TabPanel>
					  <h2>Any content 2</h2>
				  </TabPanel>
				  <TabPanel>
					  <h2>Any content 3</h2>
				  </TabPanel>
			  </Tabs>
		  	{/*<SideBar />*/}
			{/*<Dashboard matches={this.state.matches}/>*/}
		  </div>
		);
	}
}

export default App;
