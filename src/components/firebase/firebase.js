import firebase from 'firebase';
import 'firebase/auth';
const config = {
	apiKey: "AIzaSyBecLFfB_Dlvl1l66SQmR3fhXUnLeeUTno",
	authDomain: "letbet-29f41.firebaseapp.com",
	databaseURL: "https://letbet-29f41.firebaseio.com",
	projectId: "letbet-29f41",
	storageBucket: "letbet-29f41.appspot.com",
	messagingSenderId: "795341636207"
};

const fire = firebase.initializeApp(config);
const auth = firebase.auth();
export default {fire, auth}