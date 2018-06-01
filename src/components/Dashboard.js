import React, { Component } from 'react';
import History from "./match/History";
import UpComing from "./match/UpComing";
class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps () {
		// console.log(this.props);
	}
	render() {
		return (
			<div className="wrapper">
				<div className="content">
					<div className="col-md-6">
						<History history={this.props.matches}/>
					</div>
				</div>
			</div>
		);
	}
}
export default Dashboard;