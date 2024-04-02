<template>
    <div class="page-container">
        <Navbar />
        <router-view></router-view>
    </div>
    <Footer />
</template>

<script>
import Navbar from "@/components/AppNavbar.vue";
import Footer from "@/components/AppFooter.vue";
import axios from 'axios';
const API_URL = "http://localhost:5038/";

export default {
    name: 'ExamenPortfolio',
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            title:"Todo App",
            notes:[]
        }
    },
    methods: {
        async refreshData() {
            // Calls API to get data of notes from database
            try {
                const response = await axios.get(API_URL + "api/examenportfolio/get-notes");
                this.notes = response.data;
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        }
    },
    mounted() {
        this.refreshData();
    }
}
</script>

<style>
.page-container {
    /* -34px because footer is 34px tall */
    min-height: calc(100vh - 34px);
}
</style>