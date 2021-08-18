/*
   PostCss 的配置文件
   PostCss 是基于 Node.js 运行的一个处理 Css 的工具
   所有它的配置文件也是运行在 Node.js 中
*/

// postCss 配置文件需要导出一个对象
module.exports = {
  //配置相关插件
  plugins: {
    //自动添加浏览器厂商声明前缀，用来兼容不同的浏览器
    //VueCli 已经在内部默认配置了 autoprefixer
    // 'autoprefixer': {
    //   //browsers 用来配置要兼容到的系统（浏览器）环境
    //   //这个配置没有问题，但是写在这个配置文件里，会有控制台编译警告，
    //   //因为 VueCli 是通过项目中的 .browserslistrc 文件来配置要兼容的环境信息的
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    //把 px 转为 rem
    'postcss-pxtorem': {
      //转换的根元素基准值
      //正常情况下按照你的设计稿来
      //
      rootValue: 37.5,

      //需要转换的 CSS 属性，* 就是所有属性都要转换。
      propList: ['*']
    }
  }
}