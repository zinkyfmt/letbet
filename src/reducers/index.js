import {combineReducers} from 'redux';
import comments from './comment';
import team from './team';

export default combineReducers({
	comments,
	team
});