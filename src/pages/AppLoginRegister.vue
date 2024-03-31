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
            try {
                axios.put(API_URL + 'api/examenportfolio/login', { email: this.email, password: this.password })
                    .then(response => {
                        console.log(response);
                        if (response.data.statusmessage === "error") {
                            alert("Email or password is incorrect");
                        }


                        if (response.data.UserRole) {
                            let encrUserRole = btoa(response.data.UserRole);
                            localStorage.setItem("role", encrUserRole);

                            this.$router.push({
                                path: '/'
                            });
                            // TODO return to other page with the user role variable
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

.login-page {
    margin: 50px auto 20px auto;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25); /* Drop shadow */
    background-color: #FFFFFF;
    max-width: 600px;
    text-align: center;
    border-radius: 25px;
    padding-top: 5px !important;
    padding-bottom: 15px;
}

.title {
    margin-top: 20px;
    font-family: 'Quicksand', sans-serif;
    font-size: 50px;
}

.form-group {
    width: 80%;
    margin: 5px auto;
    display:flex;
    justify-content: space-between;
}

.label-login {
    width: 20px;
}

input[type="text"],
input[type="password"] {
    width: 300px;
    padding: 10px;
    font-size: 16px;
}

button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 18px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

</style>