import fireBase from "../firebase/firebase";
import {addProductsSuccess} from "./teams";

function initSettingFireStore() {
	const fireStore = fireBase.firestore();
	const settings = {timestampsInSnapshots: true};
	fireStore.settings(settings);
	return fireStore;
}
function fetchMatchesSuccess(response) {
	return {
		type: 'FETCH_MATCHES',
		payload: response
	}
}
function fetchFireBase() {
	const fireStore = initSettingFireStore();
	return fireStore.collection("matches").get();
}
async function getRefDocumentFireBase(id) {
	const fireStore = initSettingFireStore();
	return await fireStore.collection("teams").doc(id);
}
export function fetchMatches() {
	return dispatch => fetchFireBase().then(response => dispatch(fetchMatchesSuccess(response)));
}

export function addMatch(obj) {
	const refHome = getRefDocumentFireBase(obj.home.value);
	const refAway = getRefDocumentFireBase(obj.away.value);
	return dispatch => Promise.all([refHome, refAway]).then(values => {
		const data = {
			away: values[0],
			home: values[1],
			datetime: obj.datetime,
			group: obj.group,
			round_stage: obj.round_stage
		};
		const fireStore = initSettingFireStore();
		fireStore.collection("matches").add(data).then();
		return dispatch(addMatchFirebaseSuccess(data))
	});


	// return dispatch => getRefDocumentFireBase(obj.home_id).then(response => dispatch(fetchMatchesSuccess(response)));
}

export function addMatchFirebaseSuccess(data) {
	data.id = Date.now();
	return {
		type: 'ADD_MATCH',
		payload: data
	}
}