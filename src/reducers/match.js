const initialState = {
	matches: [],
	error: null,
	openPopup: false,
	match_detail: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_MATCHES':
			const data = [];
			action.payload.forEach(function(doc) {
				let temp = doc.data();
				temp.id = doc.id;
				data.push(temp);
			});
			return {
				...state,
				matches: data,
				openPopup: false
			};
		case 'UPDATE_MATCH_DETAIL':
			return {
				...state,
				match_detail:action.payload
			};
		case 'ADD_MATCH':
			state.matches.push.action.payload;
			return {
				...state,
				openPopup: false
			};
		// const customers = state.team;
		// state.a1 = customers;
		// return state;
		// ... do stuff
		default:
			return state;
	}
}
