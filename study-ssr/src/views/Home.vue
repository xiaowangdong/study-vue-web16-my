<!-- @format -->

<template>
	<div class="home">
		<p>index page</p>
		<p>{{ $store.state.count }}</p>
		<button @click="$store.commit('add')">add</button>
	</div>
</template>

<script>
	// @ is an alias to /src

	export default {
		// 异步数据通过asyncData选项编写
		// eslint-disable-next-line no-unused-vars
		asyncData({ store, route }) {
			return store.dispatch('getCount')
		},
	}
</script>
