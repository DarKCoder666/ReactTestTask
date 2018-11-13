import React, { Component } from 'react'
import './App.css'

import { Router, Route, Switch } from 'react-router-dom';

// History for router
import history from './history';

// Store for redux
import store from './store';
import { Provider } from 'react-redux';

import Header from './components/Header'
import ListOfTasks from './components/ListOfTasks'
import AddTask from './components/AddTask'
import Login from './components/Login'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />

          <Router history={history}>
            <Switch>
              <Route path="/" exact component={ListOfTasks} />
              <Route path="/addTask" exact component={AddTask} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </Router>

        </div>
      </Provider>
    );
  }
}

export default App;