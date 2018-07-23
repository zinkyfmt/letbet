import React, { Component } from 'react';
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import {fetchProducts, addProducts} from "../actions/teams";

const GROUP_NAME = ["A","B","C","D","E","F","G","H"];
class Standing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAdmin: false,
			name: '',
			group: '',
			avatar: '',
		};
		this.getListByGroup = this.getListByGroup.bind(this);
	}
	componentDidMount() {
		this.props.dispatch(fetchProducts());
	}

	getListByGroup(groupName) {
		return this.props.items.filter(item => {
			return item.group === groupName
		});
	}

	openModal = () => {
		this.setState({ openPopup: true });
	};
	closeModal() {
		this.setState({ openPopup: false });
	};
	saveTeam = () => {
		const newTeam = {
			avatar: this.state.avatar,
			group: this.state.group,
			name: this.state.name
		};
		this.props.dispatch(addProducts(newTeam));
		this.setState({ openPopup: false });
	};
	updateInputValue = (e,type) => {
		this.setState({[type] : e.target.value});
	};
	render() {
		return (
			<div className="list-match box">
				<div className="teams-board">
					<ul>
					{
						GROUP_NAME.map((item,index) => {
							const list = this.getListByGroup(item);
							return (
								list.length > 0 ?
									<li key={index}>
										<div className="group-name">Group {item}</div>
										<table>
											<thead>
												<tr>
													<td className="small-column">STT</td>
													<td className="left-text">Team</td>
													<td className="small-column">MP</td>
													<td className="small-column">W</td>
													<td className="small-column">D</td>
													<td className="small-column">L</td>
													<td className="small-column">GF</td>
													<td className="small-column">GA</td>
													<td className="small-column">GD</td>
													<td className="small-column">Pts</td>
												</tr>
											</thead>
											<tbody>
											{
											list.map((obj,i) => {
												const lastItem = (i+1 === list.length) ? "lst-row" : '';
												return (
												<tr key={obj.id}>
													<td className={"small-column " + lastItem}>{i+1}</td>
													<td className={"left-text " + lastItem}><div className="team-content"><img className="avatar-team" src={obj.avatar}/><span>{obj.name}</span></div></td>
													<td className={"small-column " + lastItem}>{obj.mp ? obj.mp : 0}</td>
													<td className={"small-column " + lastItem}>{obj.win ? obj.win : 0}</td>
													<td className={"small-column " + lastItem}>{obj.draw ? obj.draw : 0}</td>
													<td className={"small-column " + lastItem}>{obj.lost ? obj.lost : 0}</td>
													<td className={"small-column " + lastItem}>{obj.gf ? obj.gf : 0}</td>
													<td className={"small-column " + lastItem}>{obj.ga ? obj.ga : 0}</td>
													<td className={"small-column " + lastItem}>{obj.gd ? obj.gd : 0}</td>
													<td className={"small-column " + lastItem}>{obj.points ? obj.points : 0}</td>
												</tr>
												)
											})
											}
											</tbody>
										</table>
									</li> : ''
							)
						})
					}
					</ul>
				</div>
				{
					this.state.isAdmin ? (
						<div className="popup-add">
							<button className="btn" onClick={this.openModal}>
								Add Team
							</button>
							<Popup
								open={this.state.openPopup}
								closeOnDocumentClick
								onClose={this.closeModal.bind(this)}
							>
								<div className="modal">
									<div className="header-title-popup">Add New Team</div>
									<div className="body-popup">
										<input className="input-text half-width" placeholder="Name" onChange={evt => this.updateInputValue(evt, 'name')} value={this.state.name}/>
										<input className="input-text half-width" placeholder="Group" onChange={evt => this.updateInputValue(evt, 'group')} value={this.state.group}/>
										<input className="input-text full-width" placeholder="Avatar" onChange={evt => this.updateInputValue(evt, 'avatar')} value={this.state.avatar}/>
									</div>
									<div className="footer-popup">
										<button className="btn" onClick={this.closeModal.bind(this)}>Close</button>
										<button className="btn" onClick={this.saveTeam.bind(this)}>Save</button>
									</div>
								</div>
							</Popup>
						</div>
					) : ''
				}
			</div>
		);
	}
}
const mapStateToProps = state => ({
	count: state.team.count,
	loading: state.team.loading,
	items: state.team.items,
	openPopup: state.openPopup
});

export default connect(mapStateToProps)(Standing);
