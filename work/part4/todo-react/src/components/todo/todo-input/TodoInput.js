import React, { Component } from 'react';
import './TodoInput.scss';
import { Todo } from '../model/todo';

class TodoInput extends Component {
  constructor(props) {
      super(props);
      this.state = {
        newTodo: {
          task: ''
        }
      };
  }
  
  changeTodo = (e) => {
    this.setState({
      newTodo: {
        task: e.target.value
      }
    });
  }
  
  addTodo = () => {
    let task = this.state.newTodo.task.trim();
    if (!task) {
      alert('Enter new task!');
      this.refs.input.focus();
      return false;
    }
    // 생성날짜를 최신으로 기록하기 위해서 객체를 새로 만들어서 사용한다.
    // 부모 컴포넌트가 보낸 add 함수를 자식 컴포넌트가 직접 호출해서 데이터를 전달한다.
    this.props.add(new Todo(task));
    // 입력창 초기화를 위해서 새 객체를 할당한다.
    this.setState({
      newTodo: {
        task: ''
      }
    });
  }
  
  render() {
    return (
      <section>
        <form>
          <div className="input-group mb-2">
            <input type="text" className="form-control" placeholder="Enter your task" name="task" 
              value={this.state.newTodo.task} onChange={this.changeTodo} ref="input"/>
            <span className="input-group-append">
              <button className="btn btn-outline-secondary px-4" type="button" onClick={this.addTodo}>
                <i className="fa fa-paper-plane"></i> Add
              </button>
            </span>
          </div>
        </form>
      </section>
    );
  }
}

export default TodoInput;
