import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import comments from './comment';
import team from './team';
import match from './match';

const combinedReducers = combineReducers({
	comments,
	team,
	match
});
function crossSliceReducer(state, action) {
	switch(action.type) {
		case "SOME_SPECIAL_ACTION" : {
			return {
				comments: state.comments,
				team:state.team,
				match:state.match,
			}
		}
		default : return state;
	}
}
export default reduceReducers(combinedReducers, crossSliceReducer);
