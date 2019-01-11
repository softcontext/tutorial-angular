<template lang="html">

  <section class="src-components-todo-list">
    <ul class="list-group">
      <li v-for="todo in propsTodos" class="list-group-item d-flex justify-content-between align-items-center">
        <label v-if="todo.editMode" v-on:dblclick="changeMode(todo.id)">
          <input type="text" v-model="todo.title" v-on:keyup.enter="changeMode(todo.id)">
        </label>
        <label v-else v-on:dblclick="changeMode(todo.id)">
          {{todo.title}}
        </label>
        <span v-on:click="removeTodo(todo.id)" class="badge badge-primary badge-pill">x</span>
      </li>
    </ul>
  </section>

</template>

<script lang="js">

export default {
  name: 'src-components-todo-list',
  // propsTodos 는 부모의 배열을 참조하는데
  // shallow copy 이므로 사용 시 주의해야 합니다.
  props: ['propsTodos'],
  mounted() {

  },
  data() {
    return {
      myTodos: []
    }
  },
  created() {
    this.myTodos = JSON.parse(JSON.stringify(this.propsTodos));
  },
  beforeUpdate() {
    this.myTodos = JSON.parse(JSON.stringify(this.propsTodos));
  },
  methods: {
    removeTodo(id) {
      this.$emit('removeTodo', id);
    },
    changeMode(id) {
      this.$emit('changeMode', id);
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.src-components-todo-list {}
</style>
