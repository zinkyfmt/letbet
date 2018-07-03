import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyBecLFfB_Dlvl1l66SQmR3fhXUnLeeUTno",
	authDomain: "letbet-29f41.firebaseapp.com",
	databaseURL: "https://letbet-29f41.firebaseio.com",
	projectId: "letbet-29f41",
	storageBucket: "letbet-29f41.appspot.com",
	messagingSenderId: "795341636207"
};
firebase.initializeApp(config);

export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_PRODUCTS_SUCCESS = 'ADD_PRODUCTS_SUCCESS';

export const fetchProductsBegin = () => ({
	type: FETCH_PRODUCTS_BEGIN
});
export const fetchProductsSuccess = response => ({
	type: FETCH_PRODUCTS_SUCCESS,
	payload: response
});
export const addProductsSuccess = obj => ({
	type: ADD_PRODUCTS_SUCCESS,
	payload: obj
});
export const fetchProductsFailure = error => ({
	type: FETCH_PRODUCTS_FAILURE,
	payload: { error }
});
function initSettingFireStore() {
	const fireStore = firebase.firestore();
	const settings = {timestampsInSnapshots: true};
	fireStore.settings(settings);
	return fireStore;
}
function fetchFireBase() {
	const fireStore = initSettingFireStore();
	return fireStore.collection("teams").get();
}
export function fetchProducts() {
	return dispatch => fetchFireBase().then(response => dispatch(fetchProductsSuccess(response)));
}
export function addProducts(obj) {
	// Add a new document with a generated id.
	const fireStore = initSettingFireStore();
	return dispatch => fireStore.collection("teams").add(obj).then(response => {
		obj.id = response.id;
		return dispatch(addProductsSuccess(obj))
	});
}