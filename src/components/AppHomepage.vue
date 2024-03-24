<template>
    <div class="homepage">
        <!-- Title -->
        <h1 class="title">Titel lijst</h1>

        <!-- Three rectangles items next to each other -->
        <div class="rectangle-container">
            <div class="rectangle-item">
                <span class="number">5</span>
                To-Do
                <span class="dot" style="background-color: #00A;"></span>
            </div>
            <div class="rectangle-item">
                <span class="number">5</span>
                In Progress
                <span class="dot" style="background-color: #A60;"></span>
            </div>
            <div class="rectangle-item">
                <span class="number">5</span>
                Finished
                <span class="dot" style="background-color: #0A0"></span>
            </div>
        </div>

        <!-- Bigger item below -->
        <div class="rectangle-list-container">
            <div class="list-container">
                <!-- First list -->
                <div class="rectangle-list" v-for="note in getListOne" :key="note.id">
                    <ListComponent :title="note.TaskTitle"/>
                </div>

                <!-- Line between lists -->
                <div class="list-divider"></div>
                <!-- Second list -->
                <div class="rectangle-list" v-for="note in getListTwo" :key="note.id">
                    <ListComponent :title="note.TaskTitle"/>
                </div>

                <!-- Line between lists -->
                <div class="list-divider"></div>

                <!-- Third list -->
                <div class="rectangle-list" v-for="note in getListThree" :key="note.id">
                    <ListComponent :title="note.TaskTitle"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script>
import ListComponent from "@/components/AppListComponent.vue";

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
            list1: [],
            list2: [],
            list3: []
        }
    },
    mounted() {
        console.log(this.notes);
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