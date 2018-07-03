import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import Layout from "./components/Layout";
import store from "./store"

class App extends Component {
  render() {
    return (
      <div className="App">
		  <Layout store={store}/>
      </div>
    );
  }
}

export default App;
