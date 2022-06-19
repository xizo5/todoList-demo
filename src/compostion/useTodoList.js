import {
  ref,
  computed,
  onMounted,
  onDeactivated
} from "vue";
import {
  format,
  generateId
} from '../utils/stringHelp'
let checkState = ref('all')
let todoList = ref([])
let todoName = ref('')
let editIndexRef = ref(-1)
onMounted(() => {
  if (localStorage.getItem('todoList')) {
    todoList.value = JSON.parse(localStorage.getItem('todoList'))
  } else {
    todoList.value = []
  }
})
onDeactivated(() => {
  localStorage.setItem('todoList', JSON.stringify(todoList.value))
})
// localStorage.setItem('test', JSON.stringify([1]))

function editTodo(index) {
  editIndexRef.value = index
}

function deletTodo(index) {
  let obj = filteredTodosRef.value[index]
  let num = 0;
  todoList.value.forEach((item, index) => {
    if (item.id === obj.id) {
      num = index
    }
  })
  console.log(num);
  todoList.value.splice(num, 1)
}

function changeState(index) {
  let obj = filteredTodosRef.value[index]
  let state = ''
  if (obj.state === 'undone') {
    state = 'done'
    obj.state = state
  } else {
    state = 'undone'
    obj.state = state
  }
  todoList.value.forEach((item) => {
    if (item.id === obj.id) {
      item.state = state
    }
  })
}

function update(e) {
  editIndexRef.value = -1
}

const addTodo = () => {
  if (!format(todoName.value)) {
    return
  }
  let obj = {}
  let todo = format(todoName.value)
  obj.id = generateId()
  obj.desc = todo
  obj.state = 'undone'
  todoList.value.push(obj)

  todoName.value = ''
}
const filteredTodosRef = computed(() => {
  if (checkState.value === 'all') {
    let arr1 = todoList.value.filter(item => item.state === 'undone')
    let arr2 = todoList.value.filter(item => item.state === 'done')
    arr1.push(...arr2)
    return arr1
  } else {
    return todoList.value.filter(item => item.state === checkState.value)
  }
})

export {
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
}