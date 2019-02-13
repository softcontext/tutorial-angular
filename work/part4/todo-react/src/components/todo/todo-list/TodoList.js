import React, { Component } from 'react';
import './TodoList.scss';
import { Todo } from '../model/todo';

class TodoList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        todos: null,
        editTodoBackup: null
      };
      // 부모에게 받은 데이터를 자체 상태 객체로 복사한다.
      this.state.todos = this.props.todos;
  }
  
  /**
   * 삭제요청을 부모에게 전달한다.
   */
  removeTodo = (e) => {
    if (window.confirm('Are you sure to delete?')) {
      let id  = e.target.dataset.id;
      this.props.remove(id);
    }
  }

  /**
   * 출력모드를 수정모드로 변경한다.
   * 수정 대상 데이터를 가진 객체를 editTodoBackup 변수에 담는다.
   */
  updateMode = (e) => {
    let id  = e.target.dataset.id;
    
    this.setState({
      editTodoBackup: JSON.parse(JSON.stringify(
        this.state.todos.find(item => item.id === id)))
    });
  }

  /**
   * 수정요청을 부모에게 전달한다.
   */
  updateTodo = (e) => {
    let task = this.refs.input.value;
    this.props.update(new Todo(task));
  }

  /**
   * 수정작업을 취소한다.
   * 수정모드를 출력모드로 변경한다.
   */
  updateCancel = (e) => {
    if (this.state.editTodoBackup) {
      this.setState({
        editTodoBackup: null
      });
    }
  }

  render() {
    let rows = this.props.todos.map((todo, i) => {
      if (this.state.editTodoBackup && todo.id === this.state.editTodoBackup.id) {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td colSpan="2">
              <input className="form-control" type="text" name="" defaultValue={todo.task} ref="input" />
              <div className="text-center mt-2">
                <button className="btn btn-secondary btn-sm px-3 mr-4" type="button" onClick={this.updateTodo}>
                  <i className="fa fa-save"></i> Update
                </button>
                <button className="btn btn-secondary btn-sm px-3" type="button" onClick={this.updateCancel}>
                  <i className="fa fa-ban"></i> Cancel
                </button>
              </div>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td data-id={todo.id} onDoubleClick={this.updateMode}>{todo.task}</td>
            <td className="right">
              <button className="btn btn-outline-secondary btn-sm crush" type="button" data-id={todo.id} onClick={this.removeTodo}>
                <i className="fa fa-times"></i>
              </button>
            </td>
          </tr>
        );
      }
    });
    
    return (
      <section>
        <table className="table table-striped table-hover">
          <colgroup>
            <col style={{width: '5%'}}/>
            <col style={{width: '80%'}}/>
            <col style={{width: '15%'}}/>
          </colgroup>
          <tbody>
            {rows}
          </tbody>
        </table>
        
        {/*
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        */}
      </section>
    );
  }
}

export default TodoList;
