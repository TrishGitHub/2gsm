const path = require("path");
const webpack = require("webpack");
const assetsPath = path.join(__dirname, "..", "public", "assets");
const publicPath = "/assets/";

module.exports = {
	name: "browser",
	devtool: "eval",
	context: path.join(__dirname, "..", "src", "client"),

	entry: {
		app: [
			"./client",
			"webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true"
		]
	},

	output: {
		path: assetsPath,
		filename: "[name].js",
		publicPath: publicPath
	},

	module: {
		loaders: [
			{
				test: /\.jsx?/,
				loader: "babel",
				exclude: /node_modules/,
		        query: {
		          presets: ['react-hmre']
		        }						
			}
		]
	},

	resolve: {
		extensions: ["", ".js", ".jsx"],
		modulesDirectories: [
			'src', 'node_modules'
		]
	},	

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}			
		})
	]
};