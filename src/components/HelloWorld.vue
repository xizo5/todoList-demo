
<template>
  <h1 class="title">{{ msg }}</h1>

  <!-- <h1 class="title">{{ todoList }}</h1> -->
  <!-- <input v-model="todoName" placeholder="请输入你的todos" /> -->
  <div class="todo-input">
    <a-input
      v-model:value="todoName"
      placeholder="What needs to be done?"
      allowClear
      @keyup.enter="addTodo"
    >
      <template #addonBefore>
        <a-select v-model:value="checkState" style="width: 70px">
          <a-select-option value="all">all</a-select-option>
          <a-select-option value="done">done</a-select-option>
          <a-select-option value="undone">undone</a-select-option>
        </a-select>
      </template>
    </a-input>
    <div class="item" v-for="(todo, index) in filteredTodosRef">
      <div class="todo-info" :class="{ selected: todo.state === 'done' }">
        <div class="todo-check" @click="changeState(index)">
          <div class="check">
            <div class="check-outlined" v-if="todo.state === 'done'">
              <check-outlined :style="{ fontSize: '10px' }" />
            </div>
          </div>
        </div>
        <div class="todo-label" @dblclick="editTodo(index)">
          {{ todo.desc }}
        </div>
        <!-- <div class="todo-line" v-if="todo.state==='done'"></div> -->
        <div class="todo-edit" v-if="editIndexRef === index">
          <a-input v-model:value="todo.desc" @keyup.enter="update"></a-input>
        </div>
        <div class="todo-remove" @click="deletTodo(index)">delete</div>
      </div>
    </div>
  </div>
  <div class="line"></div>
  <div class="line2"></div>
</template>
 

<script setup>
import { ref } from "vue";
import { Empty } from "ant-design-vue";
import { CheckOutlined } from "@ant-design/icons-vue";
import {
  todoList,
  todoName,
  addTodo,
  checkState,
  changeState,
  deletTodo,
  editTodo,
  editIndexRef,
  filteredTodosRef,
  update,
} from "../compostion/useTodoList";
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
defineProps({
  msg: String,
});

const count = ref(0);
</script>

<style scoped>
a {
  color: #42b983;
}
.title {
  position: relative;
  width: 100%;
  font-size: 80px;
  font-weight: 200;
  text-align: center;
  color: rgb(184, 63, 69);
  text-rendering: optimizelegibility;
  margin: 0;
}
.todo-input {
  width: 50%;
  margin: 0 auto;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.item {
  position: relative;
  width: 100%;
  height: 35px;
  border-top: 1px solid #ccc;
}
.todo-info {
  position: relative;
  width: 100%;
  height: 100%;
  line-height: 35px;
}
.todo-line {
  position: absolute;
  left: 0;
  top: 50%;
  transform:translate(0,-50%);
  width: 100%;
  height: 2px;
  background-color: #ccc;
}
.todo-check {
  position: absolute;
  left: 0;
  top: 0;
  width: 70px;
  height: 100%;
}
.check {
  height: 20px;
  width: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid #ccc;
}
.check-outlined {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.todo-label {
  position: relative;
  margin-left: 80px;
  text-align: left;
  font-size: 20px;
}

.todo-edit {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  font-size: 20px;
}
.todo-remove {
  position: absolute;
  top: 0;
  right: 15px;
  display: none;
  font-size: 10px;
  cursor: pointer;
  color: red;
}
.todo-info:hover .todo-remove {
  display: block;
}
.line {
  position: relative;
  width: 49%;
  margin: 0 auto;
  height: 10px;
  border: 1px solid #ccc;
}
.line2 {
  position: relative;
  width: 48%;
  margin: 0 auto;
  height: 5px;
  border: 1px solid #ccc;
}
.selected {
  opacity: 0.3;
}
</style>
