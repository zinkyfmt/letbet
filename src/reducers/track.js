import {ActionTypes} from '../core/constants';

const initialState = {
	count: 0
}

export default function(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.TRACK_ADD:
			return {
				count: state.count + 1
			}
		default:
			return state;
	}
}
