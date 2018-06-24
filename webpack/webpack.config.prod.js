const path = require("path");
const webpack = require("webpack");
const assetsPath = path.join(__dirname, "..", "public", "assets");
const publicPath = "/assets/";

module.exports = {
	name: "browser",
	devtool: "source-map",

	context: path.join(__dirname, "..", "src", "client"),

	entry: {
		app: "./client"
	},

	output: {
		path: assetsPath,
		filename: "[name].min.js",
		publicPath: publicPath
	},

	resolve: {
		extensions: ["", ".js", "jsx"],
		modulesDirectories: [
			"src",
			"node_modules"
		]
	},

	module: {		
		loaders: [
			{
				test: /\.jsx?/,
				loaders: ["babel"],
				exclude: /node_modules/
			}    		
		]
	},

	plugins: [
	    new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.optimize.UglifyJsPlugin({
	    	compressor: {
	    		warnings:false
	    	}
	    }),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}			
		})
	]
};