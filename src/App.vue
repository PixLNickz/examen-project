<template>
    <div class="page-container">
        <Navbar />
        <Homepage />
    </div>
    <Footer />
</template>

<script>
import Navbar from "@/components/AppNavbar.vue";
import Homepage from "@/components/AppHomepage.vue";
import Footer from "@/components/AppFooter.vue";


export default {
    name: 'App',
    components: {
        Navbar,
        Homepage,
        Footer
    }
}
</script>

<style>
.page-container {
    /* Set minimum height to occupy full screen */
    min-height: calc(100vh - 34px); /* Adjust as needed */
    /* Assuming the footer has a height of 100px */
}
</style>