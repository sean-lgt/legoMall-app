/*
 * @Description: 
 * @Author: lgt
 * @Date: 2021-05-10 16:36:19
 * @LastEditTime: 2021-07-14 10:50:12
 * @LastEditors: xxx
 */
 import axios from '../utils/axios'

// 获取用户信息
export function getUserInfo(){
    return axios.get('/user/info');
}

// 修改用户信息
export function EditUserInfo(params){
    return axios.post('/user/update',params);
}

// 登录
export function login(params){
    return axios.post('/user/login',params);
}

// 退出功能
export function logout(params){
    return axios.post('/user/logout');
}

// 注册功能
export function register(params){
    return axios.post('/user/register',params);
}