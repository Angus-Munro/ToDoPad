<script>
export default {
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
};
</script>

<template>
	<li>{{ todo.title }}</li>
</template>
