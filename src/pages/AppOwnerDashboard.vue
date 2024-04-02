<template>

    <div class="ownerpage-container">
        <h1 class="title">Owner's Dashboard</h1>
        <table>
            <thead>
            <tr>
                <th>_id</th>
                <th>TaskContent</th>
                <th>TaskTitle</th>
                <th>TaskPriority</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="task in tasks" :key="task.id">
                <td>{{ task._id }}</td>
                <td>{{ task.TaskContent }}</td>
                <td>{{ task.TaskTitle }}</td>
                <td>{{ task.TaskPriority }}</td>
                <td class="end-column">
                    <button class="table-button" @click="deleteTask(task._id)">Delete task</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="add-task-form">
            <div class="form-group">
                <label for="taskTitle">Task Title:</label>
                <input type="text" id="taskTitle" v-model="newTaskTitle" class="task-input">
            </div>
            <div class="form-group">
                <label for="taskContent">Task Description:</label>
                <input type="text" id="taskContent" v-model="newTaskContent" class="task-input">
            </div>
            <div class="form-group">
                <label for="taskColor">Task Color:</label>
                <input type="color" v-model="newTaskColor">
            </div>
            <div class="form-group">
                <label for="taskPriority">Task Priority:</label>
                <input type="text" id="taskPriority" v-model="newTaskPriority" class="task-input">
            </div>
            <button @click="addTask" class="add-task-btn">Add task</button>
        </div>
        <table>
            <thead>
            <tr>
                <th>_id</th>
                <th>UserEmail</th>
                <th>UserRole</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in accounts" :key="user.id">
                <td>{{ user._id }}</td>
                <td>{{ user.UserEmail }}</td>
                <td>{{ user.UserRole }}</td>
                <td class="end-column">
                    <button class="table-button" @click="changeRole(user._id)">Change user role</button>
                    <button class="table-button" @click="deleteUser(user._id)">Delete user</button>
                </td>
            </tr>
            </tbody>
        </table>
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
            newTaskColor: '#FFFFFF',
            newTaskPriority: '',
            tasks: [],
            accounts: [],
            role: null
        };
    },
    mounted() {
        // Decrypt role from localstorage
        if (localStorage.getItem("role")) {
            this.role = atob(localStorage.getItem("role"));
        }
        // Check if allowed role
        if (this.role === "owner") {
            this.refreshData();
            this.getAccounts();
        } else {
            alert("Sorry, you dont have access to this page");
            this.$router.push({
                path: '/'
            });
        }
    },
    methods: {
        async refreshData() {
            // Calls API to get data of notes from database
            try {
                const response = await axios.get(
                    API_URL + "api/examenportfolio/get-notes"
                );
                this.tasks = response.data;
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        },
        async getAccounts() {
            // Calls API to get data of accounts from database
            try {
                const response = await axios.get(API_URL + "api/examenportfolio/get-accounts");
                this.accounts = response.data;
            } catch (error) {
                console.error("Error fetching accounts:" + error);
            }
        },
        changeRole(userId) {
            // Calling API to change account role depending on which role it has at the moment
            try {
                axios.put(API_URL + "api/examenportfolio/change-role", { _id: userId })
                    .then(response => {
                        console.log(response.data);
                        this.getAccounts();
                    })
                    .catch(error => {
                        console.error('Error changing role:', error);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteUser(userId) {
            // Calling API to delete user with given userId
            console.log("Deleting user with ID:", userId);
            try {
                axios.delete(API_URL + "api/examenportfolio/delete-user", { data: { _id: userId }})
                    .then(response => {
                        console.log(response.data);
                        this.refreshData();
                    })
                    .catch(error => {
                        console.error('Error removing user:', error);
                    });
            } catch (error) {
                console.error(error);
            }

        },
        async deleteTask(taskId) {
            // Calling API to delete task with given taskId
            console.log("Deleting item with ID:", taskId);
            try {
                axios.delete(API_URL + "api/examenportfolio/delete-notes", { data: { _id: taskId }})
                    .then(response => {
                        console.log(response.data);
                        this.refreshData();
                    })
                    .catch(error => {
                        console.error('Error removing task:', error);
                    });
            } catch (error) {
                console.error(error)
            }
        },
        addTask() {
            // Calling API to add task with given data if owner
            if (this.role === "owner") {
                try {
                    axios.post(API_URL + "api/examenportfolio/add-notes", {
                        TaskTitle: this.newTaskTitle,
                        TaskContent: this.newTaskContent,
                        TaskColor: this.newTaskColor,
                        TaskPriority: this.newTaskPriority
                    })
                        .then(response => {
                            console.log(response.data);
                            this.newTaskTitle = '';
                            this.newTaskContent = '';
                            this.newTaskColor = '#FFFFFF';
                            this.newTaskPriority = '';
                            this.refreshData();
                        })
                        .catch(error => {
                            console.error('Error adding notes:', error);
                        });
                } catch (error) {
                    console.error(error);
                }
            } else {
                alert("Sorry, you dont have access to this page");
                this.$router.push({
                    path: '/'
                });
            }
        }
    }
};
</script>

<style scoped>

</style>
