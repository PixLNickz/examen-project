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
        }
    },
    methods: {
        async refreshData() {
            try {
                const response = await axios.get(API_URL + "api/examenportfolio/get-notes");
                this.notes = response.data;
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        },
        startDrag(event, task) {
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('taskID', task.TaskId)
        },
        onDrop(event, list) {
            const taskID = event.dataTransfer.getData('taskID');
            const task = this.notes.find((task) => task.TaskId === parseInt(taskID));
            if (task) {
                axios.put(API_URL + "api/examenportfolio/edit-notes", { TaskId: task.TaskId, TaskList: list })
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
        this.refreshData();
        // console.log(this.notes);
    },
    computed: {
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