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
        if (localStorage.getItem("role")) {
            this.role = atob(localStorage.getItem("role"));
        }
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
            try {
                const response = await axios.get(API_URL + "api/examenportfolio/get-accounts");
                this.accounts = response.data;
            } catch (error) {
                console.error("Error fetching accounts:" + error);
            }
        },
        changeRole(userId) {
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
            // Logic for deleting the item
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
            // Logic for deleting the item
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
.ownerpage-container {
    margin: 20px auto;
    max-width: 1120px;
    height:auto;
}

table {
    margin-top: 20px;
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

.end-column {
    text-align: end;
}

.add-task-form {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-input {
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.table-button {
    margin-left: 5px;
    margin-right: 5px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-task-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-task-btn:hover {
    background-color: #0056b3;
}
</style>
