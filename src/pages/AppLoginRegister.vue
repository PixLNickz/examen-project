<template>
    <div class="login-page">
        <h1 class="title">Login</h1>
        <div class="form-group">
            <label for="username" class="label-login">Email:</label>
            <input type="text" id="username" v-model="email" required>
        </div>
        <div class="form-group">
            <label for="password" class="label-login">Password:</label>
            <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" @click="login">Login</button>
        <button type="submit" @click="signup">Sign up</button>
    </div>
</template>

<script>
import axios from 'axios';
const API_URL = "http://localhost:5038/";

export default {
    name: "AppLoginRegister",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            // Sends API call to see if the user input email and password are correct
            try {
                axios.put(API_URL + 'api/examenportfolio/login', { email: this.email, password: this.password })
                    .then(response => {
                        if (response.data.statusmessage === "error") {
                            alert("Email or password is incorrect");
                        }

                        if (response.data.UserRole) {
                            // Encrypts localstorage account role
                            let encrUserRole = btoa(response.data.UserRole);
                            // Sets localstorage to encrypted role
                            localStorage.setItem("role", encrUserRole);

                            this.$router.push({
                                path: '/'
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        },
        signup() {
            // Sends API call to add account with password and email fromm user input
            try {
                axios.post(API_URL + 'api/examenportfolio/signup', { email: this.email, password: this.password })
                    .then(response => {
                        console.log(response);
                    });
            } catch (error) {
                console.error(error);
            }
        }
    }

}
</script>

<style scoped>

</style>