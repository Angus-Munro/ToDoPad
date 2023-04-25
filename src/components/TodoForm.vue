<script>
export default {
	data() {
		return {
			text: "",
		};
	},
	methods: {
		addTodo() {
			if (this.text) {
				this.$emit("add-todo", this.text);
				this.text = "";
			}
		},
		focusInput() {
			this.$nextTick(() => {
				this.$refs.addTodoInput.focus();
			});
		},
	},
};
</script>

<template>
	<form @submit.prevent="addTodo()">
		<input placeholder="Type todo" ref="addTodoInput" v-model="text" />
		<button @click="focusInput">Add Todo</button>
	</form>
</template>
