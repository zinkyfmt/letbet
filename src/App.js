import React, { Component } from 'react';
import './App.css';
import User from "./components/User";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import groupArray from 'group-array';
// import Dashboard from "./components/Dashboard";
import MatchDetail from "./components/match/MatchDetail";
import Match from "./components/match/Match";


class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			matches: [],
			user: {
				email: null,
				uid: null,
				name: null
			},
			match_detail: null,
		};
	}

	componentDidMount() {
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
    getMatchDetailByUid = (match_detail) => {
        this.setState({match_detail});
    };
	logIn() {
		console.log('sign in');
		// let user = {
		// 	uid: 1,
		// 	name: 'Test User',
		// 	email: 'test@gmail.com'
		// };
		// this.setState({name:'Test user'});
		// localStorage.setItem('user',JSON.stringify(user));
	}
	logOut() {
		console.log('aa');
		// this.setState({name:null});
		// localStorage.removeItem('user');
	}
    closePopup() {
        this.setState({match_detail:null});
	};
	render() {
		return (
		  <div className="App">
			  <header className="header">
				  {/*<img src={logo} className="logo-header" height={200}/>*/}
				  <div className="title-header"><span className="slogan">FIFA WORLD CUP RUSSIA 2018</span></div>
				  <User user={this.state.user} logIn={this.logIn.bind(this)} logOut={this.logOut.bind(this)}/>
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
						  <div className="tab-content col-md-9"><Match getMatchDetailByUid={this.getMatchDetailByUid.bind(this)}/></div>
						  {this.state.match_detail ? <div className="match-detail col-md-3"><MatchDetail closePopup={this.closePopup.bind(this)} groupSize={0} match_detail={this.state.match_detail}/></div> : ""}
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
