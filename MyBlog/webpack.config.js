const path  = require('path')
/* 配置eslint不能识别的全局变量 */
/* global __dirname */
module.exports = {
	// webpack 入口
	entry:{
		myBlog:path.resolve(__dirname, 'src/index.js')
	},
	// webpack 出口
	output: {
		path:path.resolve(__dirname, 'dist'),
		filename: '[name].min.js',
		chunkFilename: 'main[chunkhash].min.js'
	},
	// webpack loader
	module: {
		rules:[
			{
				test:/\.js$/,
				use:['babel-loader?cacheDirectory=true'],
				include:path.resolve(__dirname, 'src')
			}
		]
	}
}
