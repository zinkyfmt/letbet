import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Match from "./match/Match";
import Standing from "./Standing";
import {fetchProducts} from "../actions/teams";

class Layout extends Component {
	render() {
		return (
			<div className="App">
				<header className="header">
					{/*<img src={logo} className="logo-header" height={200}/>*/}
					<div className="title-header"><span className="slogan">Fifa world cup - Russia 2018</span></div>
					{/*<User user={this.state.user} logIn={this.logIn.bind(this)} logOut={this.logOut.bind(this)} isLogin={this.state.isLogin}/>*/}
					<div className="clear-box"></div>
				</header>
				<Tabs>
					<TabList>
						<Tab>Standings</Tab>
						<Tab>Matches</Tab>
						<Tab>Summary</Tab>
					</TabList>
					<TabPanel>
						<div className="row">
							<div className="tab-content"><Standing/></div>
							{/*{this.state.match_detail ? <div className="match-detail col-md-3"><MatchDetail user_id={this.state.user.id} updateBetId={this.updateBetId.bind(this)} groupSize={this.state.betValue} closePopup={this.closePopup.bind(this)} groupSize={this.state.betValue} bet_id={this.state.bet_id} match_detail={this.state.match_detail}/></div> : ""}*/}
						</div>
					</TabPanel>
					<TabPanel>
						<div className="row">
							<div className="tab-content"><Match/></div>
						</div>
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

export default Layout;
