import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import ListOfTasks from './components/ListOfTasks'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ListOfTasks/>
      </div>
    );
  }
}

export default App;