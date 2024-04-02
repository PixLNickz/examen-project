<script setup>
    import { ref } from 'vue';

    // Reactive variable to track the state of the menu
    const isMenuOpen = ref(false);

    // Function to toggle the menu state
    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    };
</script>

<template>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="navbar-logo">
                <router-link to="/">
                    <img class="navbar-logo-img" src="../assets/logo.png" alt="">
                </router-link>
            </div>
            <div class="navbar-menu">
                <div class="hamburger-menu" @click="toggleMenu">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
                <div class="menu-dropdown" :class="{ 'is-active': isMenuOpen }">
                    <div class="navbar-end">
                        <router-link to="/admin-dashboard">Dashboard</router-link>
                        <router-link to="/owner-dashboard">Owner's Dashboard</router-link>
                        <router-link to="/login-register">Login</router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>

</style>
