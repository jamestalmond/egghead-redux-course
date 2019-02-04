const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const BUNDLE_NAME = 'EGGHEAD-REDUX-COURSE';

module.exports = (env, argv) => {
	const environment = argv.mode;

	const optimization = {
		production: {
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		},
		development: {}
	};

	const cssRules = {
		production: [
			MiniCssExtractPlugin.loader,
			'css-loader',
			'postcss-loader',
			'sass-loader'
		],
		development: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
	};

	const plugins = {
		production: [
			new CleanWebpackPlugin('dist'),
			new MiniCssExtractPlugin({
				filename: `css/${BUNDLE_NAME}.bundle.css`
			})
		],
		development: [
			new HtmlWebpackPlugin({
				template: 'src/index.html'
			})
		]
	};

	const output = {
		production: { filename: `js/${BUNDLE_NAME}.bundle.js` },
		development: {}
	};

	const devServer = {
		production: {},
		development: {
			historyApiFallback: true
		}
	};

	return {
		resolve: {
			extensions: ['.js', '.css', '.scss']
		},
		optimization: optimization[environment],
		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: cssRules[environment]
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: 'babel-loader'
				},
				{
					test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
					use: ['file-loader']
				}
			]
		},
		plugins: plugins[environment],
		output: output[environment],
		devServer: devServer[environment]
	};
};
