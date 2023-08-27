<template>
  <div class="todo_wrapper">
    <div class="title">
      {{ mesage }}
    </div>

    <form @submit.prevent="addTodo">
      <div class="field">
        <div class="control">
          <input v-model="newTodoContent" class="input" type="text" placeholder="Add a todo">
        </div>
        <div class="control mb-5">
          <button class="button is-info" :disabled='!newTodoContent'>
            Add
          </button>
        </div>
      </div>
    </form>

    <div v-for="todo in todos" :key="todo.id" class="card mb-5" :class="{ 'has-background-success-light': todo.done }">
      <div class="dicard card-content">
        <button class="button" @click="changeStatus(todo.id)" :class="todo.done ? 'is-success' : 'is-light'">
          &check;
        </button>
        <div class="dicard-text" :class="{'has-text-success line-through' : todo.done}">
          {{ todo.content }}
        </div>
        <button class="button is-danger ml-2" @click="deleteTodo(todo.id)">
          &cross;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase'

const mesage = 'Welcome Todo'

const todos = ref([])

const todosReferense = collection(db, 'todos');

onMounted(() => {
  onSnapshot(todosReferense, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbTodos.push(todo)
    });
    todos.value = fbTodos
  });
});


const newTodoContent = ref('')

const addTodo = () => {
  addDoc(todosReferense, {
    content: newTodoContent.value,
    done: false
  });

  newTodoContent.value = ''

}

const deleteTodo = (id) => {
  deleteDoc(doc(db, 'todos', id));
}

const changeStatus = (id) => {
  const todoIndex = todos.value.findIndex(todo => todo.id == id)
  updateDoc(doc(todosReferense, id), {
    done: !todos.value[todoIndex].done
  });
}

</script>

<style>
@import 'node_modules/bulma/css/bulma.min.css';

.todo_wrapper {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.field {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.dicard {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dicard-text {
  max-width: 300px;
}

.line-through {
  text-decoration: line-through;
}
</style>