const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  /*错误信息是不是提示的很详细,我们在srouce里面能看到我们写的代码，也能打断点调试哦~*/
  devtool: 'inline-source-map',
  /*入口*/
  /*建议babel-plugin-react-transform：代替react-hot-loader的插件*/
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname,'src/index.js')
    ]
},

  /*输出到dist文件夹，输出文件名字为bundle.js*/
  /*改为hash后+路由改造后,npm start打包后的文件存在内存中，你看不到的。*/
  output: {
    path: path.join(__dirname,'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'  //路由Bundle按需加载后生成的js文件名
  },

  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  /*css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能；
   *style-loader将所有的计算后的样式加入页面中；二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中*/
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname,'src')
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192     //小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
          }
        }]
      }
   ]
  },

  /*在之前写的代码中，我们引用组件，或者页面时候，写的是相对路径~*/
  /*webpack提供了一个别名配置*/
  resolve: {
    alias: {
        pages: path.join(__dirname, 'src/pages'),
        component: path.join(__dirname, 'src/component'),
        router: path.join(__dirname, 'src/router')
    }
  },
  /*静态文件服务器*/
  /*historyApiFallback 任意的404响应都被替代为index.html*/
  /*host     host: '0.0.0.0',用手机通过局域网IP可以访问到网站*/
  /*更改文件会自动涮新页面*/
  /*hot模块热替换，不刷新页面只更换更改的地方*/
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true
  },

  /*不刷新页面只更换更改的地方HotModuleReplacementPlugin()*/
  plugins:[
    new CleanWebpackPlugin(['dist'],{
      "exclude": ['api']
    }),
     new webpack.HotModuleReplacementPlugin(),
     new HtmlWebpackPlugin({
        filename: 'index.html',   //打包后html文件
        template: path.join(__dirname, 'src/index.html')
    })
  ]
}
