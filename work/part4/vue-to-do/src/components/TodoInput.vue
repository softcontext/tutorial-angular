<template lang="html">

  <section class="src-components-todo-input">
    <div class="input-group mb-3">
      <input v-model="newTodo" type="text" class="form-control" placeholder="Type your task here...">
      <div class="input-group-append">
        <button v-on:click="addTodo" class="btn btn-outline-secondary" type="button" id="button-addon2">Add Todo</button>
      </div>
    </div>
  </section>

</template>

<script lang="js">

export default {
  name: 'src-components-todo-input',
  props: [],
  mounted() {

  },
  data() {
    return {
      newTodo: null
    }
  },
  methods: {
    addTodo(){
      if (typeof this.newTodo === 'string') {
        this.newTodo = this.newTodo.trim();
      }
      if (this.newTodo) {
        this.$emit('addTodo', this.newTodo);
        this.newTodo = null;
      } else {
        alert('할 일을 입력하세요.');
      }
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.src-components-todo-input {}
</style>
