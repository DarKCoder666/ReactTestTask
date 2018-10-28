import React, { Component } from 'react'
import './App.css'

import { Router, Route } from 'react-router-dom';

// History for router
import history from './history';

// Store for redux
import store from './store';
import { Provider } from 'react-redux';

import Header from './components/Header'
import ListOfTasks from './components/ListOfTasks'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />

          <Router history={history}>
            <Route path="/" exact component={ListOfTasks} />
          </Router>

        </div>
      </Provider>
    );
  }
}

export default App;