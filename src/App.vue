<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap">
    <Navbar />
    <Homepage />
</template>

<script>
import Navbar from "@/components/AppNavbar.vue";
import Homepage from "@/components/AppHomepage.vue";


export default {
    name: 'App',
    components: {
        Navbar,
        Homepage
    }
}
</script>

<style>

</style>