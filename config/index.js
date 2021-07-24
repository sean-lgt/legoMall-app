export default {
  development: {
    baseUrl: '/api' // 测试接口域名
  },
  beta: {
    // http://mobile.seantao5.xyz/server/api
    baseUrl: 'http://mobile.seantao5.xyz/server/api/v1/api/app' // 测试接口域名
    // baseUrl: ' http://backend-api-01.newbee.ltd/api/v1' // 测试接口域名
  },
  release: {
    baseUrl: 'http://mobile.seantao5.xyz/server/api/v1/api/app' // 正式接口域名
  }
}