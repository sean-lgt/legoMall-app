#  乐购商城应用 vue3+vite+vant 

## 一、初始化化配置

- 使用 vite 构建项目

  ```
  npm init vite-app 项目名
  npm install
  npm run dev
  ```

* 安装  vant3 

  ```
  npm i vant@next -S
  npm i vite-plugin-style-import -D   #编译过程中将 import 的写法自动转换为按需引入的方式#
  
  ## vant 官方推荐 rem 适配插件
  npm install lib-flexible    # 用于设置 rem 基准值
  npm install postcss-pxtorem    # css插件  将像素单位转化成rem单位  --实用
  ```

* 安装相关配置项到 package.json

  ```
  npm install vue-router@next          #安装路由
  npm install better-scroll            #移动端滚动
  npm install core-js
  npm install js-md5
  npm install vuex@next
  npm install vue2-verify     # 前端验证码插件
  npm install lib-flexible    # 移动端适配方案
  npm install axios@next
  npm install pushstate-server  #临时服务器
  npm install postcss-pxtorem    # css插件  将像素单位转化成rem单位  --实用
  ```

* 配置devDependencies

  ```
      "@vue/compiler-sfc": "^3.0.4",
      "babel-plugin-import": "^1.13.3",
      "vite": "^1.0.0-rc.13",
      "vite-plugin-style-import": "^0.9.2",
      "less": "^3.12.2",
      "less-loader": "^7.0.2",
      "postcss-pxtorem": "^5.1.1"
  ```

* 根目录新建 postcss.config.js

  ```js
  // postcss.config.js
  // 用 vite 创建项目，配置 postcss 需要使用 post.config.js，之前使用的 .postcssrc.js 已经被抛弃
  // 具体配置可以去 postcss-pxtorem 仓库看看文档
  module.exports = {
    "plugins": {
      "postcss-pxtorem": {
        rootValue: 37.5, // Vant 官方根字体大小是 37.5
        propList: ['*'],
        selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
      }
    }
  }
  ```

  