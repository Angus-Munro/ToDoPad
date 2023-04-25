<script>
import TodoItem from "./TodoItem(old).vue";

export default {
	components: {
		TodoItem,
	},
	props: {
		todos: {
			type: Array,
			required: true,
		},
	},
	methods: {
		removeTodo(todo) {
			this.$emit("remove-todo", todo);
		},
	},
};
</script>

<template>
	<ul>
		<todo-item
			v-for="todo in todos"
			:key="todo.id"
			:todo="todo"
			@remove-todo="removeTodo"
		/>
	</ul>
</template>
