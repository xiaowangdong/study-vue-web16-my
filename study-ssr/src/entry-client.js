// 客户端也需要创建vue实例

const { createApp } = require("./main");

const { app, router } = createApp()

router.onReady(() => {
	// 挂载激活
	app.$mount('#app') // 可以多加一个参数true
})


