<template>
    <div class="login-container">
        <div class="login-title">Sign in</div>
        <form class="login-form">
            <div v-if="error !== null" class="error">{{error}}</div>
            <input type="text" v-model="email" placeholder="Email"/>
            <input type="password" v-model="password" placeholder="Password"/>
            <Button @click.native="submit()">Submit</Button>
            <router-link to="/forgot-password" class="forgot-password" tag="span">Forgot password?</router-link>
        </form>
    </div>
</template>

<script>
    import Button from "./shared/Button";
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        name: 'sign-in',
        components: {Button},
        data() {
            return {
                email: '',
                password: '',
                error: null
            };
        },
        methods: {
            submit() {
                if (!this.isValid()) {
                    return;
                }
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(res => {
                        this.$router.push('/');
                    })
                    .catch(e => {
                        this.error = e.message;
                    })
            },
            isValid() {
                if (!this.email || !this.password) {
                    this.error = 'Email and password should not be empty';
                    return false;
                }
                this.error = null;
                return true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .login-container {
        margin: 60px auto 0;
        max-width: 542px;

        .login-title {
            font-size: 36px;
            margin-bottom: 10px;
            text-align: center;
        }

        .login-form {
            display: flex;
            flex-direction: column;
            margin: auto;
            align-items: flex-start;

            .error {
                width: 100%;
                background: #D8000C;
                color: #ffffff;
                padding: 10px;
            }

            input {
                width: 100%;
                border: 1px solid rgba(0, 0, 0, 0.5);
                padding: 8px;
                border-radius: 5px;
                margin: 10px 0px;
                font-size: 16px;
            }

            .btn {
                margin: 10px 0;
            }

            .forgot-password {
                color: #00B7FF;

                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
        }
    }
</style>
