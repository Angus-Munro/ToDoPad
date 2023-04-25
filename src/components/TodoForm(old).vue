<script>
export default {
	data() {
		return {
			newTodo: "",
		};
	},
	methods: {
		addTodo() {
			this.$emit("add-todo", this.newTodo);
			this.newTodo = "";
		},
	},
};
</script>

<template>
	<form @submit.prevent="addTodo">
		<input placeholder="Type todo" v-model="newTodo" />
		<button>Add Item</button>
	</form>
</template>
