import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DateTimePicker from 'react-datetime-picker';
import {connect} from "react-redux";
import {addMatch} from "../../actions/matches"

class AddMatch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: this.props.show,
			openPopup: false,
			homeSelected:'two',
			awaySelected:'three',
			date: new Date(),
			groupMatch: '',
			roundStage: ''
		};
		this.handleHide = this.handleHide.bind(this);
	}

	handleHide() {
		this.props.handleHide()
	}
	componentDidMount() {
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ show: nextProps });
	}
	updateInputValue = (e,type) => {
		this.setState({[type] : e.target.value});
	};
	onChange = date => this.setState({ date });
	handleChangeAway = (selectedOption) => {
		this.setState({ awaySelected:selectedOption });
		// selectedOption can be null when the `x` (close) button is clicked
		if (selectedOption) {
			console.log(`Selected: ${selectedOption.label}`);
		}
	};
	handleChangeHome = (selectedOption) => {
		this.setState({ homeSelected:selectedOption });
		// selectedOption can be null when the `x` (close) button is clicked
		if (selectedOption) {
			console.log(`Selected: ${selectedOption.label}`);
		}
	};
	convertListTeam = () => {
		return this.props.teams.map(item => {
			return {
				value: item.id,
				label: item.name
			}
		})
	};
	saveTeam = () => {
		const data = {
			home: this.state.homeSelected,
			away: this.state.awaySelected,
			group: this.state.groupMatch,
			round_stage: this.state.roundStage,
			datetime: this.state.date
		};
		this.props.dispatch(addMatch(data));
		this.props.handleHide();
	};
	render() {
		return (
			<Modal
				show={this.props.show}
				onHide={this.handleHide}
				bsSize="small"
				aria-labelledby="contained-modal-title-sm"
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-sm">Add New Match</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="group-input">
						<label>Home Team</label>
						<Select
							name="home-name"
							value={this.state.homeSelected}
							onChange={this.handleChangeHome}
							options={this.convertListTeam()}
						/>
					</div>
					<div className="group-input">
						<label>Away Team</label>
						<Select
							name="away-name"
							value={this.state.awaySelected}
							onChange={this.handleChangeAway}
							options={this.convertListTeam()}
						/>
					</div>
					<div className="group-input">
						<label>Time</label>
						<DateTimePicker
							onChange={this.onChange}
							value={this.state.date}
							isClockOpen={false}
						/>
					</div>
					<div className="group-input">
						<label>Group Match</label>
						<input name="group-match" className="form-control" value={this.state.groupMatch} onChange={e => this.updateInputValue(e,'groupMatch')}/>
					</div>
					<div className="group-input">
						<label>Round Stage</label>
						<input name="round-stage" className="form-control" value={this.state.roundStage} onChange={e => this.updateInputValue(e,'roundStage')}/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleHide}>Close</Button>
					<Button className="btn" onClick={this.saveTeam.bind(this)}>Save</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default connect()(AddMatch);