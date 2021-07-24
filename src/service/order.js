/*
 * @Description: 
 * @Author: lgt
 * @Date: 2021-06-06 11:51:28
 * @LastEditTime: 2021-07-23 20:43:18
 * @LastEditors: xxx
 */
import axios from '../utils/axios'

export function createOrder(params) {
  return axios.post('/order/create', params);
}

export function getOrderList(params) {
  return axios.get('/order/list', { params });
}

export function getOrderDetail(id) {
  return axios.get(`/order/detail/${id}`);
}

export function cancelOrder(id) {
  return axios.put(`/order/${id}/cancel`);
}

export function confirmOrder(id) {
  return axios.put(`/order/${id}/finish`)
}

export function payOrder(params) {
  return axios.post('/order/payFor',params)
}