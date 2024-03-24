<template>
    <div class="page-container">
        <Navbar />
        <Homepage :notes="notes"/>
<!--        <p v-for="note in notes" :key="note.id">-->
<!--            &lt;!&ndash;<b>- {{note.TaskTitle}} <br> {{note.TaskContent}} <br> {{note.TaskList}} <br></b> &ndash;&gt;-->
<!--            <ListComponent :title="note.TaskTitle" />-->
<!--        </p>-->
    </div>
    <Footer />
</template>

<script>
import Navbar from "@/components/AppNavbar.vue";
import Homepage from "@/components/AppHomepage.vue";
import Footer from "@/components/AppFooter.vue";
import axios from 'axios';
//import ListComponent from "@/components/AppListComponent.vue";
const API_URL = "http://localhost:5038/";

export default {
    name: 'ExamenPortfolio',
    components: {
        Navbar,
        Homepage,
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
            try {
                const response = await axios.get(API_URL + "api/examenportfolio/get-notes");
                this.notes = response.data;
                console.log(response.data);
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
    /* Set minimum height to occupy full screen */
    min-height: calc(100vh - 34px); /* Adjust as needed */
    /* Assuming the footer has a height of 100px */
}
</style>