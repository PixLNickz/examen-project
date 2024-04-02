import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './pages/AppHomepage.vue';
import AdminDashboard from "./pages/AppAdminDashboard.vue";
import OwnerDashboard from "./pages/AppOwnerDashboard.vue";
import LoginRegister from "./pages/AppLoginRegister.vue";

// Routes to all pages
const routes = [
    { path: '/', component: Homepage },
    { path: '/admin-dashboard', component: AdminDashboard },
    { path: '/owner-dashboard', component: OwnerDashboard},
    { path: '/login-register', component: LoginRegister}
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;