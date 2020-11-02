// nodejs code
const express = require('express') // cjs 语法 , 返回一个express函数
const path = require('path')
// 文件的接口
const fs = require('fs')

// 获取express实例
const server = express() // 执行得到一个具体的express

// 1.创建一个vue的实例

const Vue = require('vue')


// 2.获取渲染器实例

const { createRenderer } = require('vue-server-renderer') // vue的服务端渲染器
const renderer = createRenderer()

// 在路由的前面引入中间键（处理favicon，将这个get请求先处理完成，直接先发给前台）
const favicon = require('serve-favicon')

// 处理文件的请求，path（nodejs中的一个函数）来拼接一个路径（favicon的路径），__dirname表示当前路径地址，然后拼接一下上一级目录

// 意思在请求之前将此文件传给前端
server.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))


/**
 * 以前的服务端渲染是如何完成的，下面是服务器路由，不是同构开发
 */
// 编写路由处理不同url请求
server.get('*', (req, res) => { // 前端来的所有路由请求，在这里处理
	// console.log(req.url);
	// 解析模板名称 : /user
	const template = req.url.substr(1) || 'index'

	// 动态加载模板（同步加载，出现问题会阻塞）
	const buffer = fs.readFileSync(path.join(__dirname, `${template}.html`))


	// res.send('<strong>hello world</strong>')

	const app = new Vue({
		template: buffer.toString(), // 转换为模板字符串
		data () {
			return { msg: 'vue ssr' }
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
server.listen(3000, function () {
	// eslint-disable-next-line no-console
	console.log('server running!');
});
