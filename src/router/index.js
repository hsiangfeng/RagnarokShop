import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout';
import Index from '@/components/pages/Index';
import Product from '@/components/Product';
import HotProduct from '@/components/pages/HotProduct';
import Login from '@/components/Login';
import SignOut from '@/components/admin/SignOut';
import Dashboard from '@/components/admin/Dashboard';
import ProductsList from '@/components/admin/pages/ProductsList';
import ProductsCard from '@/components/admin/pages/ProductsCard';
import Coupons from '@/components/admin/pages/Coupons';
import Orders from '@/components/admin/pages/Orders';
import CustomerOrders from '@/components/admin/pages/CustomerOrders';
import CustomerCheck from '@/components/admin/pages/CustomerCheck';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    // eslint-disable-next-line no-else-return
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      name: '',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Index',
          component: Index,
        },
      ],
    },
    {
      path: '/product',
      name: '',
      component: Product,
      children: [
        {
          path: '',
          name: 'HotProduct',
          component: HotProduct,
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/sign_out',
      name: 'SignOut',
      component: SignOut,
    },
    {
      path: '/admin',
      name: '',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'ProductsList',
          component: ProductsList,
        },
        {
          path: '/productscard',
          name: 'ProductsCard',
          component: ProductsCard,
        },
        {
          path: '/coupons',
          name: 'Coupons',
          component: Coupons,
        },
        {
          path: '/orders',
          name: 'Orders',
          component: Orders,
        },
        {
          path: '/customer_orders',
          name: 'CustomerOrders',
          component: CustomerOrders,
        },
        {
          path: '/customer_crders/:orderId',
          name: 'CustomerCheck',
          component: CustomerCheck,
        },
      ],
    },
  ],
});
