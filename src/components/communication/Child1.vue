<template>
  <div @click="$emit('some-event', 'msg from child1')">
    <h3>child1</h3>
    <p>{{msg}}</p>
  </div>
</template>

<script>
  export default {
		// 未声明props无法通过msg方式通信
		// 这里接收来自父组件的信息
		// 父给子传值用元素，子给父传值用事件派发
    props: {
      msg: {
        type: String,
        default: ''
      },
    },
    mounted () {
			// 利用总线去监听'event-from-child2'
      // this.$bus.$on('event-from-child2', msg => {
      //   console.log('Child1:', msg);
			// });
			// 子组件之间利用同一父组件进行通信 $root 访问根目录
      this.$parent.$on('event-from-child2', msg => {
        console.log('Child1:', msg);
      });
    },
    methods: {
      eat() {
        console.log('这就回家！');
        
      }
    },
  }
</script>

<style scoped>

</style>