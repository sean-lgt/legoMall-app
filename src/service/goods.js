/*
 * @Description: 
 * @Author: lgt
 * @Date: 2021-05-24 14:52:58
 * @LastEditTime: 2021-07-15 09:33:34
 * @LastEditors: xxx
 */
import axios from '../utils/axios'

export function getDetail(id) {
  return axios.get(`/goods/details/${id}`);
}

export function getCategory() {
  return axios.get('/categories');
}

export function search(params) {
  return axios.get('/search', { params });
}