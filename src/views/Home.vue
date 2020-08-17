<!-- @format -->

<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
		<communication></communication>
		<SlotExample></SlotExample> -->
		<FormExample></FormExample>
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'
	import communication from '@/components/communication'
	import SlotExample from '@/components/slots'
	import FormExample from '@/components/form'

	export default {
		name: 'Home',
		components: {
			HelloWorld,
			communication,
			SlotExample,
			FormExample,
		},
	}
</script>
