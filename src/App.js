import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import groupArray from 'group-array';
import Dashboard from "./components/Dashboard";

const MATCH_ARRAY = [
	{
		'uid': 1,
		'home': {
			'uid': 1,
			'name': 'England',
			'avatar': 'https://cdn4.vectorstock.com/i/thumb-large/08/23/england-flag-vector-570823.jpg'
		},
		'away': {
			'uid': 2,
			'name': 'Brazil',
			'avatar': 'https://i.ebayimg.com/images/g/t4cAAOSwd4tUA8as/s-l300.jpg'
		},
		'date': '20/10/2018',
		'time': '14:00:00',
		'group': 'A',
		'handicap': 2.5
	},
	{
		'uid': 2,
		'home': {
			'uid': 3,
			'name': 'Spain',
			'avatar': 'https://cdn4.vectorstock.com/i/thumb-large/08/23/england-flag-vector-570823.jpg'
		},
		'away': {
			'uid': 4,
			'name': 'French',
			'avatar': 'https://i.ebayimg.com/images/g/t4cAAOSwd4tUA8as/s-l300.jpg'
		},
		'date': '21/10/2018',
		'time': '13:00:00',
		'group': 'A',
		'handicap': 3
	},
];
class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			matches: []
		}
	}

	componentDidMount() {
		this.setState({matches:MATCH_ARRAY})
	}

	render() {
		return (
		  <div className="App">
			<Header />
		  	{/*<SideBar />*/}
			<Dashboard matches={this.state.matches}/>
		  </div>
		);
	}
}

export default App;
