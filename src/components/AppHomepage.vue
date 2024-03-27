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
    props: {
        notes: Object
    },
    components: {
        ListComponent
    },
    data() {
        return {
            newNotes: ''
        }
    },
    methods: {
        addNotes() {
            // Send a request to your API endpoint with the newNotes data
            axios.post(API_URL + "api/examenportfolio/add-notes", { newNotes: this.newNotes })
                .then(response => {
                    console.log(response.data); // Log the response from the server
                    // Optionally, you can reset the newNotes input field after successfully adding notes
                    this.newNotes = '';
                })
                .catch(error => {
                    console.error('Error adding notes:', error);
                });
        }
    },
    mounted() {
        // console.log(this.notes);
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