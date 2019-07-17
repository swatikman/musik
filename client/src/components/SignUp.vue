<template>
    <div class="sign-up-container" :class="loading">
        <div class="sign-up-title">Sign up</div>
        <form class="sign-up-form" v-if="!success">
            <div v-if="error !== null" class="error">{{error}}</div>
            <input type="text" v-model="email" placeholder="Email"/>
            <input type="text" v-model="name" placeholder="Name"/>
            <input type="password" v-model="password" placeholder="Password"/>
            <input type="password" v-model="password2" placeholder="Re-enter your password"/>
            <Button @click.native="submit()">Submit</Button>
        </form>
        <div class="success-block" v-else="success">
            <div class="success-block-text">Letter was sent to your email</div>
            <router-link to="/sign-in">Back to Sign In</router-link>
        </div>
    </div>
</template>

<script>
    import Button from "./shared/Button";

    export default {
        name: 'sign-up',
        components: {Button},
        computed: {
            loading() {
                return this.$store.getters.isLoading() ? 'disabled' : '';
            }
        },
        data() {
            return {
                email: '',
                name: '',
                password: '',
                password2: '',
                error: null,
                success: false
            };
        },
        methods: {
            async submit() {
                if (!this.isValid()) {
                    return;
                }
                const {email, name, password} = this;
                try {
                    await this.$store.dispatch("signUp", {email, name, password});
                    this.success = true;
                } catch (e) {
                    this.error = e;
                }
            },
            isValid() {
                if (!this.email) {
                    this.error = 'Email should not be empty';
                    return false;
                }
                if (!this.name) {
                    this.error = 'Name should not be empty';
                    return false;
                }
                if (!this.password) {
                    this.error = 'Password should not be empty';
                    return false;
                }
                if (!this.password2) {
                    this.error = 'Second password should not be empty';
                    return false;
                }
                if (this.password !== this.password2) {
                    this.error = 'Passwords should be equal';
                    return false;
                }

                this.error = null;
                return true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .sign-up-container {
        margin: 60px auto 0;
        max-width: 542px;
        position: relative;

        .sign-up-title {
            font-size: 36px;
            margin-bottom: 10px;
            text-align: center;
        }

        .sign-up-form {
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
                margin: 10px 0;
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

    .success-block {
        border: 1px solid #abc;
        padding: 30px;
        margin-top: 40px;

        .success-block-text {
            font-size: 24px;
        }

        a {
            font-size: 20px;

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
