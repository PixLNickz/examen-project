<template>
    <div class="homepage">
        <h1 class="title">Titel lijst</h1>

        <div class="rectangle-container">
            <div class="rectangle-item">
                <span class="number">{{ getListOne.length }}</span>
                To-Do
                <span class="dot" style="background-color: #00A"></span>
            </div>
            <div class="rectangle-item">
                <span class="number">{{ getListTwo.length }}</span>
                In Progress
                <span class="dot" style="background-color: #A60"></span>
            </div>
            <div class="rectangle-item">
                <span class="number">{{ getListThree.length }}</span>
                Finished
                <span class="dot" style="background-color: #0A0"></span>
            </div>
        </div>

        <div class="rectangle-list-container">
            <div class="list-container">
                <div class="rectangle-list">
                    <ListComponent v-for="note in getListOne" :key="note.id" :title="note.TaskTitle" :color="note.TaskColor"/>
                </div>

                <div class="list-divider"></div>

                <div class="rectangle-list">
                    <ListComponent v-for="note in getListTwo" :key="note.id" :title="note.TaskTitle" :color="note.TaskColor"/>
                </div>

                <div class="list-divider"></div>

                <div class="rectangle-list">
                    <ListComponent v-for="note in getListThree" :key="note.id" :title="note.TaskTitle" :color="note.TaskColor"/>
                </div>
            </div>
        </div>
        <div>
            <form>
                <!-- other form elements -->
                <input type="text" id="newNotesInput" v-model="newNotes" placeholder="Enter notes">
                <button type="button" id="submitButton" @click="addNotes">Submit</button>
            </form>
        </div>
    </div>
</template>

<style>

</style>

<script>
import ListComponent from "@/components/AppListComponent.vue";
import axios from 'axios';
axios.defaults.headers.common = {
    "Content-Type": "application/json"
}
const API_URL = "http://localhost:5038/";

export default {
    name: 'AppHomepage',
    components: {
        ListComponent,
    },
    data() {
        return {
            newNotes: '',
            notes: [],
            role: null,
        }
    },
    methods: {
        async refreshData() {
            try {
                const response = await axios.get(API_URL + "api/examenportfolio/get-notes");
                this.notes = response.data;
                // console.log(response.data);
                // console.log(response);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        },
        addNotes() {
            // send request
            axios.post(API_URL + "api/examenportfolio/add-notes", { newNotes: this.newNotes })
                .then(response => {
                    console.log(response.data);
                    this.newNotes = '';
                })
                .catch(error => {
                    console.error('Error adding notes:', error);
                });
        }
    },
    mounted() {
        if (this.$route.query.role) {
            this.role = atob(this.$route.query.role);
        }
        this.refreshData();
    },
    computed: {
        getListOne() {
            return this.notes.filter((note)=>note.TaskList===1)
        },
        getListTwo() {
            return this.notes.filter((note)=>note.TaskList===2)
        },
        getListThree() {
            return this.notes.filter((note)=>note.TaskList===3)
        }
    }
}

</script>