<template>
    <div class="homepage">
        <h1 class="title">Admin's Dashboard</h1>

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
                <div class="rectangle-list" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
                    <ListComponent v-for="note in getListOne" :key="note.id" :title="note.TaskTitle" :color="note.TaskColor" draggable="true" @dragstart="startDrag($event, note)"/>
                </div>

                <div class="list-divider"></div>

                <div class="rectangle-list" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
                    <ListComponent v-for="note in getListTwo" :key="note.id" :title="note.TaskTitle" :color="note.TaskColor" draggable="true" @dragstart="startDrag($event, note)"/>
                </div>

                <div class="list-divider"></div>

                <div class="rectangle-list" @drop="onDrop($event, 3)" @dragenter.prevent @dragover.prevent>
                    <ListComponent v-for="note in getListThree" :key="note.id" :title="note.TaskTitle" :color="note.TaskColor" draggable="true" @dragstart="startDrag($event, note)"/>
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
            role: null
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
        },
        startDrag(event, task) {
            // Check if allowed role
            if (this.role === "admin" || this.role === "owner") {
                event.dataTransfer.dropEffect = 'move';
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('taskID', task._id);
            } else {
                alert("Sorry you are not allowed to drag items.");
            }
        },
        onDrop(event, list) {
            // On dropping a task, send API call to change tasklist of task with given ID to desired list
            const taskID = event.dataTransfer.getData('taskID');
            const task = this.notes.find((task) => task._id === taskID);
            if (task) {
                axios.put(API_URL + "api/examenportfolio/edit-notes", { _id: task._id, TaskList: list })
                    .then(response => {
                        console.log(response.data);
                        this.refreshData();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                console.error(`Item with ID ${taskID} not found.`);
            }
        }
    },
    mounted() {
        // Decrypt role from localstorage
        if (localStorage.getItem("role")) {
            this.role = atob(localStorage.getItem("role"));
        }
        // Check if allowed role
        if (this.role === "admin" || this.role === "owner") {
            this.refreshData();
        } else {
            alert("Sorry, you dont have access to this page");
            this.$router.push({
                path: '/'
            });
        }
    },
    computed: {
        // Filter depending on what list the note/task is in
        getListOne() {
            return this.notes.filter((note)=>note.TaskList === 1)
        },
        getListTwo() {
            return this.notes.filter((note)=>note.TaskList === 2)
        },
        getListThree() {
            return this.notes.filter((note)=>note.TaskList === 3)
        }
    }
}

</script>