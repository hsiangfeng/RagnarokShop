// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// 第三方套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap';
import $ from 'jquery';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VueTypedJs from 'vue-typed-js';

// 自訂
import App from './App';
import router from './router';
import currencyFilter from './filter/currency';
import timestampFilter from './filter/timestamp';

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

library.add(fab, far, fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueTypedJs);

Vue.use(VueAxios, axios);

Vue.component('Loading', Loading);

Vue.filter('currency', currencyFilter);
Vue.filter('timestamp', timestampFilter);

window.$ = $;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // window.alert('請先登入在執行此動作。');
    const url = `${process.env.APIPATH}/api/user/check`;
    axios.post(url).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
