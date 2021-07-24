import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component:() => import('@/views/Home/Home.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User/User.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About/About.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/Setting/Setting.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/product-list',
      name: 'product-list',
      component: () => import('@/views/Product/ProductList.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/Product/ProductDetail.vue'),
      meta: {
        index: 3
      }
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/Category/Category.vue'),
      meta: {
        index: 1
      }
    },
     {
      path: '/cart',
      name: 'cart',
      component: () => import( '@/views/Cart/Cart.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/create-order',
      name: 'create-order',
      component: () => import( '@/views/Order/CreateOrder.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/address',
      name: 'address',
      component: () => import( '@/views/Address/Address.vue'),
      meta: {
        index: 2
      }
    },
     {
      path: '/address-edit',
      name: 'address-edit',
      component: () => import('@/views/Address/AddressEdit.vue'),
      meta: {
        index: 3
      }
    },
     {
      path: '/order',
      name: 'order',
      component: () => import('@/views/Order/Order.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: () => import('@/views/Order/OrderDetail.vue'),
      meta: {
        index: 3
      }
    },
  ]
})

export default router;
