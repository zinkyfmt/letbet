import {
	FETCH_PRODUCTS_BEGIN,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILURE,
	ADD_PRODUCTS_SUCCESS
} from '../actions/teams';

const initialState = {
	items: [],
	loading: false,
	error: null,
};

export default function (state = initialState, action) {
	switch(action.type) {
		case FETCH_PRODUCTS_BEGIN:
			// Mark the state as "loading" so we can show a spinner or something
			// Also, reset any errors. We're starting fresh.
			return {
				...state,
				items: [],
				loading: true,
				openPopup: false
			};

		case FETCH_PRODUCTS_SUCCESS:
			const data = [];
			action.payload.forEach(function(doc) {
				let temp = doc.data();
				temp.id = doc.id;
				data.push(temp);
			});
			data.sort((a,b) => { return a.group > b.group});
			// All done: set loading "false".
			// Also, replace the items with the ones from the server
			return {
				...state,
				loading: false,
				items: data,
				openPopup: false
			};

		case FETCH_PRODUCTS_FAILURE:
			// The request failed, but it did stop, so set loading to "false".
			// Save the error, and we can display it somewhere
			// Since it failed, we don't have items to display anymore, so set it empty.
			// This is up to you and your app though: maybe you want to keep the items
			// around! Do whatever seems right.
			return {
				...state,
				loading: false,
				error: action.payload.error,
				items: [],
				openPopup: false
			};
		case ADD_PRODUCTS_SUCCESS:
			state.items.push(action.payload);
			console.log(state);
			return {
				...state,
				loading: false,
				openPopup: false
			};
		default:
			// ALWAYS have a default case in a reducer
			return state;
	}
}