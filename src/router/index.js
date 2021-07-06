import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: 'index',
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '../views/Index/index.vue'),
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import(/* webpackChunkName: "upload" */ '../views/Upload/index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
