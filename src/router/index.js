import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';

import AuthenticationService from '../services/AuthenticationService.js';
Vue.use(Router);
import { baseHost } from '../services/hostconfig';
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';
}
const router = new Router({
  // mode: 'history',
  mode: 'hash',
  // base: process.env.BASE_URL,
  base: '/mapproxyView',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue'),
      redirect: { name: 'logs' },
      children: [
        {
          path: 'nodes',
          name: 'nodes',
          meta: { activeName: 'nodes' },
          component: () => import('@/views/serviceNodes/ServiceNodes.vue')
        },
        {
          path: 'logs',
          name: 'logs',
          meta: { activeName: 'logs' },
          component: () => import('@/views/runLogs/RunLogs.vue')
        },
        {
          path: 'configs',
          name: 'configs',
          meta: { activeName: 'configs' },
          component: () => import('@/views/configFiles/ConfigFiles.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login')
    }
  ]
});
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  debugger
  AuthenticationService.getUserInfo()
    .then(res => {
      debugger
      if (res.data) {
        next();
      } else {
        const loginUrl =
          'http://192.168.15.158:8099' +
          `/mapproxy/sooLogin.html?host=${window.location.href.split("?")[0]}`;
        if (getQueryString('code')) {
          axios
            .get(
              'http://192.168.15.158:8099/mapproxy/sooLogin/saveToken?code=' +
                getQueryString('code')
            )
            .then(res => {
              if (res.data.msg) {
                next();
              } else {
                window.location.href = loginUrl;
              }
            });
        } else {
          window.location.href = loginUrl;
        }
      }
    })
    .catch(err => {
      const loginUrl =
          'http://192.168.15.158:8099' +
          `/mapproxy/sooLogin.html?host=${window.location.href.split("?")[0]}`;
      if (getQueryString('code')) {
        axios
          .get(
            'http://192.168.15.158:8099/mapproxy/sooLogin/saveToken?code=' +
              getQueryString('code')
          )
          .then(res => {
            if (res.msg) {
              next();
            } else {
              window.location.href = loginUrl;
            }
          });
      } else {
        window.location.href = loginUrl;
      }
    });
  // AuthenticationService.saveToken(getQueryString('code')).then(res => {
  //   if (res) {
  //     next();
  //   } else {
  //     window.location.href = loginUrl;
  //   }
  // }).catch(error => {
  //   console.log(error);
  // });
  // if (getQueryString('code')) {
  //   next();
  // } else {
  //   window.location.href =
  //     'http://192.168.15.158:8099' +
  //     '/mapproxy/sooLogin.html?host=' +
  //     window.location.href;
  // }
});
export default router;
