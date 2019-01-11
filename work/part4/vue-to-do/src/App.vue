<template>
<div id="app">
  <div class="container animated fadeIn">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsTodos="todos"
        v-on:removeTodo="removeTodo" v-on:changeMode="changeMode"></TodoList>
  </div>
</div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'

class Todo {
  constructor(title = '없음'){
    this.id = Date.now() + ":" + Math.random();
    this.title = title;
    this.editMode = false;
  }
}

export default {
  name: 'app',
  data() {
    return {
      todos: []
    }
  },
  created() {
    this.todos.push(new Todo('Walk the dog this evening'));
    this.todos.push(new Todo('Go shopping at 3 PM'));
    this.todos.push(new Todo('Sleep well tonight'));
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList
  },
  methods: {
    addTodo(title) {
      this.todos.push(new Todo(title));
    },
    removeTodo(id) {
      let index = this.todos.findIndex(item => item.id === id);
      this.todos.splice(index, 1);
    },
    changeMode(id) {
      let targetTodo = this.todos.find(item => item.id === id);
      targetTodo.editMode = !targetTodo.editMode;
    }
  }
}
</script>

<style>
.jumbotron {
  margin-top: 30px;
  margin-bottom: 15px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  text-align: center;
  padding: 30px;
}

.badge-primary {
  background-color: red;
}

span {
  cursor: pointer;
}

span:hover {
  background: grey;
}
</style>
