import fireBase from "../firebase/firebase";

export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_PRODUCTS_SUCCESS = 'ADD_PRODUCTS_SUCCESS';

export const fetchProductsSuccess = response => ({
	type: FETCH_PRODUCTS_SUCCESS,
	payload: response
});
export const addProductsSuccess = obj => ({
	type: ADD_PRODUCTS_SUCCESS,
	payload: obj
});
function initSettingFireStore() {
	const fireStore = fireBase.firestore();
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
	fireStore.collection("teams").add(obj).then();
	obj.id = Date.now();
	return addProductsSuccess(obj);
}