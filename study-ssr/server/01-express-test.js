// nodejs code
const express = require('express') // cjs 语法 , 返回一个express函数

// 获取express实例
const server = express() // 执行得到一个具体的express

// 编写路由处理不同url请求
server.get('/', (req, res) => {
	res.send('<strong>hello world</strong>')
})


// 监听一个端口

server.listen(3000, () => {
	console.log('server running!');
})
