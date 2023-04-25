<script>
// import TodoForm from './components/TodoForm.vue'
// import TodoList from './components/TodoList.vue'
// import TodoList from "./components/TodoList.vue";
import TodoForm from "./components/TodoForm.vue";

let id = 0;
let lastEditedId = -1;

export default {
	data() {
		return {
			editingText: "",
			showAll: true,
			showToComplete: false,
			showCompleted: false,
			todos: [
				{ id: id++, text: "Hello world", isEditing: false, completed: false },
				{ id: id++, text: "Goodbye world", isEditing: false, completed: true },
				{ id: id++, text: "Another Item", isEditing: false, completed: false },
				{
					id: id++,
					text: "Yet Another Item",
					isEditing: false,
					completed: false,
				},
			],
			completedTodos: [
				{ id: id++, text: "Goodbye world", isEditing: false, completed: true },
			],
		};
	},
	computed: {
		toCompleteCount() {
			return this.todos.length - this.completedTodos.length;
		},
		filteredTodos() {
			return this.showAll
				? this.todos
				: this.showToComplete
				? this.todos.filter((t) => !t.completed)
				: this.todos.filter((t) => t.completed);
		},
	},
	components: {
		TodoForm,
	},
	methods: {
		addTodo(text) {
			this.todos.push({
				id: id++,
				text: text,
				isEditing: false,
				completed: false,
			});
			console.log(this.todos);
		},
		removeTodo(todo) {
			this.todos = this.todos.filter((t) => t.id !== todo.id);
			this.completedTodos = this.completedTodos.filter((t) => t.id !== todo.id);
			console.log(this.todos);
		},
		toggleCompleted(todo) {
			if (todo.completed) {
				this.completedTodos = this.completedTodos.filter(
					(t) => t.completed != todo.completed
				);
			} else {
				this.completedTodos.push(todo);
			}
		},
		moveUp(todo) {
			const holdingTodoIndex = this.todos.findIndex((t) => todo === t);
			if (holdingTodoIndex !== 0) {
				const holdingTodo = todo;
				this.todos.splice(holdingTodoIndex, 1);
				this.todos.splice(holdingTodoIndex - 1, 0, holdingTodo);
			}
		},
		moveDown(todo) {
			const holdingTodoIndex = this.todos.findIndex((t) => todo === t);
			if (holdingTodoIndex !== this.todos.length - 1) {
				const holdingTodo = todo;
				this.todos.splice(holdingTodoIndex, 1);
				this.todos.splice(holdingTodoIndex + 1, 0, holdingTodo);
			}
		},
		editTodo(todo) {
			if (lastEditedId !== -1 && lastEditedId !== todo.id) {
				const lastEditedTodo = this.todos.find((t) => t.id === lastEditedId);
				this.saveTodoEditing(lastEditedTodo);
			}

			this.todos.forEach((t) => (t.isEditing = false));
			this.editingText = todo.text;
			todo.isEditing = true;
			lastEditedId = todo.id;
			console.log(todo);
		},
		cancelTodoEditing(todo) {
			this.editingText = "";
			todo.isEditing = false;
			lastEditedId = -1;
			console.log(todo);
		},
		saveTodoEditing(todo) {
			todo.text = this.editingText;
			this.editingText = "";
			todo.isEditing = false;
			console.log(todo);
		},
		filterAll() {
			this.showAll = true;
			this.showToComplete = false;
			this.showCompleted = false;
		},
		filterToComplete() {
			this.showAll = false;
			this.showToComplete = true;
			this.showCompleted = false;
		},
		filterCompleted() {
			this.showAll = false;
			this.showToComplete = false;
			this.showCompleted = true;
		},
		deleteCompletedTodos() {
			this.todos = this.todos.filter((t) => !t.completed);
			this.completedTodos = [];
		},
	},
};
</script>

<template>
	<header>
		<h1>TodoPad</h1>
	</header>

	<main>
		<div>
			<TodoForm @add-todo="addTodo" />
			<ol>
				<li v-for="todo in filteredTodos" :key="todo.id">
					<input
						type="checkbox"
						v-model="todo.completed"
						@click="toggleCompleted(todo)"
					/>
					<div>
						<button @click="moveUp(todo)">&uarr;</button>
						<button @click="moveDown(todo)">&darr;</button>
					</div>
					<div v-if="!todo.isEditing">
						<p :class="{ completed: todo.completed }">{{ todo.text }}</p>
						<button @click="editTodo(todo)">Edit</button>
						<button @click="removeTodo(todo)">X</button>
					</div>
					<div v-else>
						<input
							:class="{ completed: todo.completed }"
							v-model="editingText"
						/>
						<button @click="saveTodoEditing(todo)">Save</button>
						<button @click="cancelTodoEditing(todo)">Cancel</button>
					</div>
				</li>
			</ol>
		</div>
		<div>
			<h3>Total: {{ todos.length }}</h3>
			<h3>To Complete: {{ toCompleteCount }}</h3>
			<h3>Completed: {{ completedTodos.length }}</h3>
			<button @click="filterAll()">Show All</button>
			<button @click="filterToComplete()">Show To Complete</button>
			<button @click="filterCompleted()">Show Completed</button>
			<button @click="deleteCompletedTodos()">Delete Completed</button>
		</div>
	</main>
</template>

<style>
.completed {
	text-decoration: line-through;
}
</style>
