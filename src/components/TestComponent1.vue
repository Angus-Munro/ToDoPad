<script>
export default {
   props: {
      text: String,
      integer: Number,
      takenNumber: Number
   }
	,data() {
		return {};
	},
   
};
</script>

<template>
	<p> {{ text }}</p>
	<p> {{ integer }}</p>
   <h3>{{ variableNumber }}</h3>
</template>
