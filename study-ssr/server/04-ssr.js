// nodejs code
const express = require('express') // cjs 语法 , 返回一个express函数
const path = require('path')
// 文件的接口
const fs = require('fs')

// 获取express实例
const server = express() // 执行得到一个具体的express


// 获取绝对路径的函数
function resolve (dir) {
	// 把当前执行js文件绝对地址和传入dir做拼接
	return path.resolve(__dirname, dir)// __dirname用于定位当前位置,dir用于指示前往的目标位置
}


// 第二步：获取新的渲染器实例:createBundleRenderer

const { createBundleRenderer } = require('vue-server-renderer')

// 第三步：导入服务端打包文件(清单文件，配置文件)，参数一是服务端brundle
const bundle = require(resolve('../dist/server/vue-ssr-server-bundle.json'))

// 第四步：创建渲染器

const template = fs.readFileSync(resolve("../public/index.html"), "utf-8")

const clientManifest = require(resolve("../dist/client/vue-ssr-client-manifest.json"))
// 导入客户端打包文件(清单文件，配置文件 )

// renderer生成的页面是可交互的
const renderer = createBundleRenderer(bundle, {// 配置,Options
	runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext  官方有说明
	template, // 宿主文件
	clientManifest  // 客户端清单
})

// 处理favicon
// 在路由的前面引入中间键（处理favicon，将这个get请求先处理完成，直接先发给前台）
const favicon = require('serve-favicon')


// 处理文件的请求，path（nodejs中的一个函数）来拼接一个路径（favicon的路径），__dirname表示当前路径地址，然后拼接一下上一级目录

// 意思在请求之前将此文件传给前端
server.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

// 静态资源的处理(将首屏渲染需要的静态文件先发送)
server.use(express.static(resolve('../dist/client'), { index: false }))


/**
 * 以前的服务端渲染是如何完成的，下面是服务器路由，不是同构开发
 */
// 编写路由处理不同url请求
server.get('*', async (req, res) => { // 前端来的所有路由请求，在这里处理
	// 构造上下文
	const context = {
		title: 'ssr test',
		url: req.url // 首屏地址
	}

	// 渲染输出
	try {
		const html = await renderer.renderToString(context)

		// 响应给前端
		res.send(html)
	} catch (error) {
		res.status(500).send('服务器渲染出错')
	}

})


// 监听一个端口

server.listen(3000, function () {
	// eslint-disable-next-line no-console
	console.log('server running!');
});

