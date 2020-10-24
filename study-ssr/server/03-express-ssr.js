// nodejs code
const express = require('express') // cjs 语法 , 返回一个express函数

// 获取express实例
const server = express() // 执行得到一个具体的express

// 1.创建一个vue的实例

const Vue = require('vue')


// 2.获取渲染器实例

const { createRenderer } = require('vue-server-renderer') // vue的服务端渲染器
const renderer = createRenderer()


// 编写路由处理不同url请求
server.get('/', (req, res) => {
	// res.send('<strong>hello world</strong>')

	const app = new Vue({
		template: '<div @click="onClick">{{msg}}</div>',
		data () {
			return { msg: 'vue ssr' }
		},
		methods: {
			onClick () { // 还需要一个激活过程
				console.log('do something');
			}
		},
	})


	// 3.用渲染器渲染vue实例

	renderer.renderToString(app).then(html => {
		// console.log(html);
		res.send(html)
	}).catch(err => {
		// console.log(err);
		res.status(500)
		res.send('Internal Server Error,500!' + err)
	})
})


// 监听一个端口

server.listen(3000, () => {
	console.log('server running!');
})
