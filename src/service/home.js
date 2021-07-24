/*
 * @Description: 
 * @Author: lgt
 * @Date: 2021-04-23 17:09:29
 * @LastEditTime: 2021-07-14 09:42:22
 * @LastEditors: xxx
 */

import axios from '../utils/axios'

export function getHome() {
    return axios.get('/index-infos')
}