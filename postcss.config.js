module.exports = {
  // plugins: {
  //   'autoprefixer': {    //引入自动添加前缀插件
  //     browsers: ["last 5 versions"]
  //   },
  // }
  plugins: {
       'postcss-cssnext': {} //允许你使用未来的 CSS 特性（包括 autoprefixer）
   }
}
