<template>
  <div>
    <h2>组件通信</h2>
    <!-- props, 自定义事件 父组件index向子组件通信 -->
    <Child1 msg="some msg from parent" @some-event="onSomeEvent" ref="child1"></Child1>
    <!-- 事件总线 -->
		<!-- 事件方法在父组件中注册通过此事件给子组件2传了一个自定义事件子组件通过v-on$listeners $listeners会被展开并监听 -->
    <Child2 msg="some msg from parent" @click="onClick" ref="child2"></Child2>
    <!-- $children -->
    <button @click="goHome">回家吃饭</button>
  </div>
</template>

<script>
  import Child1 from '@/components/communication/Child1.vue'
  import Child2 from '@/components/communication/Child2.vue'
  
  export default {
    provide() { // 给后代传值
      return {
				foo: 'foooooooooo',
				comp:this // index组件实例
      }
    },
    components: {
      Child1, Child2
    },
    methods: {
      onSomeEvent(msg) {
        console.log('Communition:', msg);
      },
      goHome() {
				// $children是一个数组 可以直接访问到子组件实例的一些具体的方法和元素
				// !!!注意，$children并不能保证子元素按顺序排列,排列顺序是根据在父元素中注册的时间进行排列
        this.$children[0].eat()
      },
      onClick() {
        console.log('来自老爹的回调函数处理', this);
        
      }
    },
  }
</script>

<style scoped>

</style>