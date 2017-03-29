var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 编译 入口文件
	entry: {
		// App Entry
		app: path.resolve('./app/app.js'),
		// Main
		main: path.resolve('./app/main.js'),
		// X
		x: path.resolve('./app/x.js'),
	},
	// 拓展类库
	externals: {
		// framework: path.resolve('./app/frame/js/framework7.min.js')
		jquery: 'jQuery'
	},
	// 编译 输出恩建
	output:{
		// 根目录: 冗余
		// publicPath: '/build/',
		// 输出目录
		path: path.resolve('./build'),
		// 输出文件
		filename:'[name].js'
	},
	// 编译 功能模块
	module: {
		// 滤镜
		loaders: [
			// Javascript
			/*
			{
				test: /\.js$/,
				loader: ['babel-loader?presets[]=es2015'],
				query: { compact: 'auto' }
			},
			*/
			// Css
			{
				test: /\.css$/,
				loaders: ['style', 'css', 'postcss'],
			},
			// Less
			{
				test: /\.less/,
				loaders: ['style', 'css', 'postcss', 'less'],
			},
			// File
			{
				test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
				loader: 'file-loader?name=[hash].[ext]',
			},
			// Image
			{
				test: /\.(png|jpg)$/,
				// limit: auto base64, if size < limit
				loader: 'url?limit=1200&name=[hash].[ext]',
			}
		]
	},
	// 外挂
	plugins: [
		// General Package Code
		new webpack.optimize.CommonsChunkPlugin({
			// 输出基类文件
			name: 'common',
			// 引用库
			chunks: ['common', 'main', 'x']
		}),
		// HTML Plugin
		new HtmlWebpackPlugin({
			// HTML标题
			title: 'Dev Agent +',
			// 来源文件
			filename: 'index.html',
			// 模板引入
			template: './app/app.html',
			// 脚本注入: true | 'head' | 'body' | false
			inject: true,
			// HTML图标
			favicon: false,
			// 压缩引擎
			minify: false,
			// 哈希值
			hash: true,
			// 缓存设置: boolean
			cache: true,
			// 错误写入
			showErrors: true,
			// Chunks
			chunks: false,
			// Chunks Sort: 'none' | 'auto' | 'dependency' | {function}
			chunksSortMode: 'auto',
			// Chunks Jump
			excludeChunks: false,
			// XHTML
			xhtml: false
		})
	],
	// 解析
	resolve: {
		// 后缀名自动补全
		extensions: [/* '', */ '.js', '.jsx']
	}
}
