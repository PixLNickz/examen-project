<template>
    <div class="homepage">
        <h1 class="title">Draobksat taskboard</h1>

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
                    <ListComponent v-for="note in getListOne" :key="note.id" :title="note.TaskTitle" :color="note.TaskColor" :content="note.TaskContent" :priority="note.TaskPriority" />
                </div>

                <div class="list-divider"></div>

                <div class="rectangle-list">
                    <ListComponent v-for="note in getListTwo" :key="note.id" :title="note.TaskTitle" :color="note.TaskColor" :content="note.TaskContent" :priority="note.TaskPriority" />
                </div>

                <div class="list-divider"></div>

                <div class="rectangle-list">
                    <ListComponent v-for="note in getListThree" :key="note.id" :title="note.TaskTitle" :color="note.TaskColor" :content="note.TaskContent" :priority="note.TaskPriority"/>
                </div>
            </div>
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