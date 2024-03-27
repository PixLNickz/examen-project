import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './components/AppHomepage.vue';
import AdminDashboard from "./pages/AppAdminDashboard.vue";

const routes = [
    { path: '/', component: Homepage},
    { path: '/admin-dashboard', component: AdminDashboard}
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;