<template>
    <div class="ownerpage-container">
        <table>
            <thead>
            <tr>
                <th>_id</th>
                <th>TaskId</th>
                <th>TaskContent</th>
                <th>TaskTitle</th>
                <th>TaskProgress</th>
                <th>TaskPriority</th>
                <th>Actions</th> <!-- New column for actions -->
            </tr>
            </thead>
            <tbody>
            <tr v-for="note in notes" :key="note.id">
                <td>{{ note._id }}</td>
                <td>{{ note.TaskId }}</td>
                <td>{{ note.TaskContent }}</td>
                <td>{{ note.TaskTitle }}</td>
                <td>{{ note.TaskProgress }}</td>
                <td>{{ note.TaskPriority }}</td>
                <td>
                    <button @click="editTask(note)">Edit</button>
                    <button @click="deleteTask(note.TaskId)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div>
            <input type="text" id="newTaskInput" v-model="newTaskTitle" placeholder="Enter task title">
            <input type="text" id="newTaskInput" v-model="newTaskContent" placeholder="Enter task description">
            <input type="text" id="newTaskInput" v-model="newTaskColor" placeholder="Enter task color">
            <input type="text" id="newTaskInput" v-model="newTaskProgress" placeholder="Enter task progress">
            <input type="text" id="newTaskInput" v-model="newTaskPriority" placeholder="Enter task priority">
            <button @click="addTask">Add task</button>
        </div>

    </div>
</template>
<script>
import axios from "axios";
const API_URL = "http://localhost:5038/";

export default {
    name: "AppOwnerDashboard",
    data() {
        return {
            newTaskTitle: '',
            newTaskContent: '',
            newTaskColor: '',
            newTaskProgress: '',
            newTaskPriority: '',
            notes: []
        };
    },
    mounted() {
        this.refreshData();
    },
    methods: {
        async refreshData() {
            try {
                const response = await axios.get(
                    API_URL + "api/examenportfolio/get-notes"
                );
                this.notes = response.data;
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        },
        editTask(task) {
            // Logic for editing the item
            console.log("Editing item:", task);

        },
        async deleteTask(taskId) {
            // Logic for deleting the item
            console.log("Deleting item with ID:", taskId);
            try {
                axios.delete(API_URL + "api/examenportfolio/delete-notes", { data: { TaskId: taskId }})
                    .then(response => {
                        console.log(response.data);
                        this.refreshData();
                    })
                    .catch(error => {
                        console.error('Error adding notes:', error);
                    });
            } catch (error) {
                console.error(error)
            }

        },
        addTask() {
            console.log("adding task");
            try {
                axios.post(API_URL + "api/examenportfolio/add-notes", {
                    TaskTitle: this.newTaskTitle,
                    TaskContent: this.newTaskContent,
                    TaskColor: this.newTaskColor,
                    TaskProgress: this.newTaskProgress,
                    TaskPriority: this.newTaskPriority
                })
                    .then(response => {
                        console.log(response.data);
                        this.newTaskTitle = '';
                        this.newTaskContent = '';
                        this.newTaskColor = '';
                        this.newTaskProgress = '';
                        this.newTaskPriority = '';
                        this.refreshData();
                    })
                    .catch(error => {
                        console.error('Error adding notes:', error);
                    });
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>

<style scoped>
/* Add your table styling here */
.ownerpage-container {
    margin: 20px auto;
    max-width: 1120px;
    height:auto;
}

table {
    border-collapse: collapse;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

tbody tr:hover {
    background-color: #f1f1f1;
}
</style>
