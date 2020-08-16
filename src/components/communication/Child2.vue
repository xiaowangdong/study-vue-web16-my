<template>
  <div>
    <!-- $listeners会被展开并监听 -->
    <h3 v-on="$listeners">child2</h3>
    <button @click="sendToChild1">给child1发送消息</button>
    <!-- $attrs 未声明props无法直接通过msg方式直接访问父组件传来的信息，可以通过$attrs:除了props之外的特性都会被收纳到这里 -->
    <p>{{$attrs.msg}}</p>
    <!-- provide/inject -->
    <p>{{foo}}</p>
		<!-- <p>{{bar}}</p> -->
  </div>
</template>

<script>
  export default {
		inject: ['foo'], // 注入从祖先传过来的值
		// inject: {bar:{from:'foo'}}, // 可以避免重名
    methods: {
      sendToChild1() {
        // 利用事件总线发送事件 由this.$bus 总线派发事件'event-from-child2'
				// this.$bus.$emit('event-from-child2', 'some msg from child2')

				// 利用同一父组件传信，由this.$parent.$emit 派发事件
        this.$parent.$emit('event-from-child2', 'some msg from child2')
      }
    },
  }
</script>

<style scoped>

</style>