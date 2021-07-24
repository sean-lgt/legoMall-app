import axios from 'axios';
import router from '@/router/index';
import { getLocal } from '../common/js/utils';
import config from '~/config';
import { Toast } from 'vant'

//设置默认 URL

axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl;
// 是否携带 cookie 目前没啥用，使用的是 token 鉴权
axios.defaults.withCreadentials = true;
// 请求头 headers 信息
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
const tokenKey = getLocal('token') || ''
axios.defaults.headers['authorization'] ='Bearer '+tokenKey;
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器，内部根据返回值，重新组装，统一管理
axios.interceptors.response.use(res=>{
    // if(typeof res.data !== 'object'){
    //     Toast.fail('服务端异常，请稍后重试！');
    //     return Promise.reject(res);
    // }
    // 如果接口返回的状态码不是200
    if(res.data.resultCode != 200){
        console.log("sss")
        
        if(res.data.resultCode == 401){
            // 状态码为419 说明登录过期或者未登录
            router.push({path:'/login'});
            // const errMSg = tokenKey != ''?'登录失效aaa':'请先登录'
            // Toast.fail(errMSg);
            return false;
        }else if(res.data.errMessage){
             Toast.fail(res.data.errMessage);
        }
        return Promise.reject(res.data);
    }
    return res.data;
})

export default axios;
