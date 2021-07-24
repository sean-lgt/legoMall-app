/*
 * @Description: 
 * @Author: lgt
 * @Date: 2021-06-06 15:53:23
 * @LastEditTime: 2021-06-06 15:54:22
 * @LastEditors: xxx
 */
const server = require('pushstate-server')

server.start({
    port:4008,
    directory:'./dist'
})