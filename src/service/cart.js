/*
 * @Description: 
 * @Author: lgt
 * @Date: 2021-06-05 23:16:09
 * @LastEditTime: 2021-07-14 16:45:14
 * @LastEditors: xxx
 */
import axios from '../utils/axios'

export function addCart(params) {
  return axios.post('/shop-cart/add', params);
}

export function modifyCart(params) {
  return axios.post('/shop-cart/update', params);
}

export function getCart(params) {
  return axios.get('/shop-cart/list', { params });
}

export function deleteCartItem(id) {
  return axios.post(`/shop-cart/delete/${id}`);
}

export function getByCartItemIds(params) {
  return axios.get('/shop-cart/settle', { params });
}