import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import {configureStore} from './store/index';
import {Provider} from 'react-redux';
import Layout from "./components/Layout";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Layout />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
