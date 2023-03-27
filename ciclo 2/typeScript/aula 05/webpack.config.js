const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js', 
    path: __dirname + '/build',  
  },
  resolve: {
    extensions: ['.ts', '.js'], 
  },
  module: {
    rules: [
      {
        test: /\.ts$/,  
        use: 'ts-loader',  
        exclude: /node_modules/,  
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', 
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 8080,
    open: true,
  },
};