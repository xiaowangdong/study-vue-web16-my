<template>
  <div>
    <h2>插槽</h2>
    <!-- 插槽 -->
    <Layout>
      <!-- 具名插槽 -->
      <template v-slot:header>开课吧全栈</template>
      <!-- 匿名插槽 -->
      <template>content...</template>
      <!-- 作用域插槽 : 与具名插槽的差别，可以确定插槽中所用的参数是来自组件本身还是来自子组件 -->
      <!-- 对象解构 -->
      <template v-slot:footer="{fc}">{{fc}}</template>
    </Layout>
  </div>
</template>

<script>
  import Layout from '@/components/slots/Layout.vue'
  
  export default {
    components: {
      Layout
    },
  }
</script>

<style scoped>

</style>