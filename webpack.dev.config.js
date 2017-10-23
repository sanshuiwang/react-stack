const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
  /*错误信息是不是提示的很详细,我们在srouce里面能看到我们写的代码，也能打断点调试哦~*/
  devtool: 'inline-source-map',
  /*入口*/
  /*建议babel-plugin-react-transform：代替react-hot-loader的插件*/
  entry: {
    app: [
      "babel-polyfill",
      'react-hot-loader/patch',
      path.join(__dirname,'src/index.js')
    ]
  },
  /*输出到dist文件夹，输出文件名字为bundle.js*/
  /*webpack-dev-server，使npm start打包后的文件存在内存中，你看不到的。*/
  output: {
    /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
    filename: '[name].[hash].js'
  },
  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  /*css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能；
   *style-loader将所有的计算后的样式加入页面中；二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中*/
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader','postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader','sass-loader','postcss-loader']
      }
   ]
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
     new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge({
  customizeArray(a,b,key) {
    /*entry.app不合并，全替换*/
    if(key === 'entry.app'){
      return b;
    }
    return undefined;
  }
})(commonConfig,devConfig);
