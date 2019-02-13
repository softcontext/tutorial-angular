import React, { Component } from 'react';
import './App.css';
import TodoComponent from './components/todo/TodoComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoComponent />
      </div>
    );
  }
}

export default App;
