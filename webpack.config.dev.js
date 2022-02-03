// elemento dentro de node
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	// punto de entrada de la app
	entry: './src/index.js',
	// output que va a dar la salida dist -> distribution
	output: {
		// donde se va a guardar el proyecto
		path: path.resolve(__dirname, 'dist'),
		// nombre de donde se va a guardar el min
		filename: '[name].[contenthash].js',
		// change de  images
    	assetModuleFilename: 'assets/images/[hash][ext][query]'
	},
    // guarda la configuracion a desarrollo
    mode: 'development',
    // activar watcher de los cambios en webpack
    watch: true,
	resolve: {
		// extension que va a leer el archivo
		extensions: ['.js'],
		// añadir alias a las carpetas
		// sirve para hacer imports por ejemplo desde
		// import { util } from '@util/x_util.js'
		alias: {
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@template': path.resolve(__dirname, 'src/templates/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@images': path.resolve(__dirname, 'src/assets/images/'),
		}
	},
	module: {
		rules: [
			{
			test: /\.m?js$/,
			// excluir node modules
        	exclude: /node_modules/,
			// se esta trabajando con babel-loader
			use: {
				loader: 'babel-loader'
			  },
			},
			{
				test: /\.css|\.styl$/i,
				use: [MiniCssExtractPlugin.loader,'css-loader','stylus-loader']
			},
			{
				// loader de imagenes de webpack
				test: /\.png/,
				type: 'asset/resource',
			},
			// loader para fuentes woff
			{
			  test: /\.(woff|woff2)$/,
			  use: {
				loader: 'url-loader',
				options: {
				  limit: 10000,
				  mimetype: "application/font-woff",
				  name: "[name].[contenthash].[ext]",
				  outputPath: "./assets/fonts/",
				  publicPath: "../assets/fonts/",
				  esModule: false,
				},
			  },
			}
		],
	},
	// seccion de plugins
	plugins: [
		new HtmlWebpackPlugin({
			// configuraciones del plugin
			// insercion de los elementos
			inject: true,
			// pasar la direccion del template
			template: './public/index.html',
			// resultado del html
			filename: './index.html',
		}),
		// add css to plugins
		new MiniCssExtractPlugin({
			filename: 'assets/[name].[contenthash].css'
		}),
		new CopyPlugin({
			// elementos a copiar
			patterns: [
				{
					// paste images to images in dist
					from: path.resolve(__dirname, 'src', 'assets/images'),
					to: 'assets/images',
				}
			]
		}),
		// inicializando las variables de entorno
		new Dotenv(),
	],
}
