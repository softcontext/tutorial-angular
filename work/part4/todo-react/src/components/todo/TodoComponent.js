import React, { Component } from 'react';
import './TodoComponent.scss';
import { Todo } from './model/todo';
import TodoHeader from './todo-header/TodoHeader';
import TodoInput from './todo-input/TodoInput';
import TodoList from './todo-list/TodoList';

class TodoComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        todos: []
      };
      // 테스트를 위한 더미 데이터
      this.state.todos.push(new Todo('Walk the dog this evening'));
      this.state.todos.push(new Todo('Go shopping at 3 PM'));
      this.state.todos.push(new Todo('Sleep well tonight'));
  }
  
  addTodo = (todo) => {
    this.state.todos.push(todo);
    this.setState({
      todos: this.state.todos
    });
  }
  
  removeTodo = (id) => {
    let index = this.state.todos.findIndex(item => item.id === id);
    this.state.todos.splice(index, 1);
    this.setState({
      todos: this.state.todos
    });
  }
  
  updateTodo = (todo) => {
    let index = this.state.todos.findIndex(item => item.id === todo.id);
    this.state.todos.splice(index, 1, todo);
    this.setState({
      todos: this.state.todos
    });
  }
  
  render() {
    return (
      <div className="container">
        <TodoHeader></TodoHeader>
        <TodoInput add={this.addTodo}></TodoInput>
        <TodoList todos={this.state.todos} remove={this.removeTodo} update={this.updateTodo}></TodoList>
        
        {/*
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        */}
      </div>
    );
  }
}

export default TodoComponent;
