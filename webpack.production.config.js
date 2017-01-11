var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	entry: [
		'./src/index.jsx',
	],
	output: {
		path: path.join(__dirname, 'static'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [{
			test: /\.jsx?/,
			loaders: ['react-hot', 'babel'],
			include: path.join(__dirname, 'src')
		}]
	},
	resolve: {
    extensions: ["", ".js", ".jsx"]
  },
};
