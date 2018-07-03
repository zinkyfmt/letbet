import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
export function configureStore(initialState) {
	return createStoreWithMiddleware(rootReducer, initialState);
}