<script>
import TodoItem from "./TodoItem.vue";

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
};
</script>

<template>
	<ul>
		<TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
	</ul>
</template>
