<script>
export default {
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
	methods: {
		removeTodo() {
			this.$emit("remove-todo", this.todo);
		},
	},
};
</script>

<template>
	<li>
		{{ todo.text }}
		<button @click="removeTodo">Delete</button>
	</li>
</template>
