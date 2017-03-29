var path = require('path');
var webpack = require('webpack');

module.exports = {
	// 编译 入口文件
	entry: {
		app: './app'
	},
	// 编译 输出恩建
	output:{
		// 根目录: 冗余
		publicPath: '/build/',
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
			{
				test: /\.js$/,
				loader: ['babel-loader?presets[]=es2015'],
			},
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
		new webpack.optimize.CommonsChunkPlugin('common')
	],
	// 解析
	resolve: {
		// 后缀名自动补全
		extensions: [/* '', */ '.js', '.jsx']
	}
}
