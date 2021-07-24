import { defineConfig } from 'vite'; //增加配置
import vue from '@vitejs/plugin-vue'
import vitePluginImport from 'vite-plugin-babel-import';
import styleImport from 'vite-plugin-style-import';
import path from 'path';
import alias from "@rollup/plugin-alias";
import resolve from "rollup-plugin-node-resolve";
// 项目基础url
const baseUrl ={
    development:'./',
    beta:'./',
    release:'./'
}

// 配置 vite
export default ({mode}) => defineConfig({
    css: {
      preprocessorOptions: {
        less: {
        //   javascriptEnabled: true,
          additionalData: `@import "src/common/css/mixin.less";`
        },
      },
    },
    plugins:[
        alias(),
         vue(),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => {
              return `vant/es/${name}/style`;
            },
          },
        ],
      }),
    ],
    base: baseUrl[mode],
    resolve:{
        alias:{
             '~': path.resolve(__dirname, './'),
             '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
         // 设置接口代理
         proxy: {
           '/api': {
             target: 'http://mobile.seantao5.xyz/server/api/v1/api/app',
            //  target: 'http://127.0.0.1:4002/v1/api/app',
            //  target: 'http://backend-api-01.newbee.ltd/api/v1',
             changeOrigin: true,
             rewrite: path => path.replace(/^\/api/, '')
           }
         }
   }
})
