import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './components/AppHomepage.vue';
import AdminDashboard from "./pages/AppAdminDashboard.vue";
import LoginRegister from "./pages/AppLoginRegister.vue";

const routes = [
    { path: '/', component: Homepage },
    { path: '/admin-dashboard', component: AdminDashboard },
    { path: '/login-register', component: LoginRegister}
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;