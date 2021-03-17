import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home | HMA' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: 'Dashboard | HMA' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { title: 'About | HMA' },
  },
  {
    path: '/admin-login',
    name: 'Admin',
    component: () => import('../views/Admin/Login.vue'),
    meta: { title: 'Admin | HMA' },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin/Dashboard.vue'),
    meta: { title: 'Admin | HMA' },
  },
  {
    path: '/patient',
    name: 'Admin_View_User',
    component: () => import('../views/Admin/View_User.vue'),
    meta: { title: 'Admin Dashboard' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
