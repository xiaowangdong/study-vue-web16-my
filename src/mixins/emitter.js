// 广播： 自上而下的派发事件，通知后代元素执行某些事情
// broadcast 携带三个参数： 参数一组件名称，参数二事件名称，参数三是一个参数的数组
function broadcast(componentName, eventName, params) {
	// 遍历所有的子元素，如果子元素componentName和传入的相同则派发事件
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
		// 类似冒泡，冒泡查找componentName相同的组件并派发事件
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

			// 向上查找直到找到相同名称的组件
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
				//如果找到了，就会跳出while循环
        if (parent) {
          name = parent.$options.componentName;
        }
			}
			// 如果找到就派发事件
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params)); // 用apply的方式指定上下文，所有参数用concat进行拼接,为数组形式
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};