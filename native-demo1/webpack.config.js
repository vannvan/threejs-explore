const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getEntry = function () {
  var entry = {}
  let pageList = []
  var files = glob.sync(path.resolve(__dirname, './src/*/index.js')) //你的入口文件相对于当前的路径
  files.forEach((file) => {
    var key = file.split('/').splice(-2, 1)[0]
    entry[key] = file
    pageList.push(key)
    // console.log('key', key)
  })
  return { entry, pageList }
}
const { entry, pageList } = getEntry()

module.exports = {
  mode: 'development',
  entry: entry,
  output: {
    filename: '[name]/js/vender.[hash].js',
    path: __dirname + '/dist',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...pageList.map((file) => {
      return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `./src/${file}/index.html`),
        filename: `${file}.html`,
        chunks: [file], // 与入口文件对应的模块名
      })
    }),
  ],
  devServer: {
    //配置服务端口号
    port: 8091,
    // 打开热更新开关
    hot: true,
    //设置基本目录结构
    // contentBase: path.resolve(__dirname, 'dist'),
    //服务器的IP地址，可以使用IP也可以使用localhost
    host: 'localhost',
    //服务端压缩是否开启
    // compress: true,
    // watchFiles: ['./demo.html', './index.html'],
  },
}
