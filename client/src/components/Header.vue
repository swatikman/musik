<template>
    <div class="header">
        <router-link to="/" class="header-title" tag="span">musik</router-link>
        <div class="right-actions">
            <template v-if="user">
                <router-link to="/my-music">
                    <div class="links">My Music</div>
                </router-link>
                <Button @click.native="logout()">Logout</Button>
            </template>
            <template v-else="user">
                <router-link to="/sign-in">
                    <Button>Sign in</Button>
                </router-link>
                <router-link to="/sign-up">
                    <Button>Sign up</Button>
                </router-link>
            </template>
        </div>
    </div>
</template>

<script>
    import Button from "./shared/Button";

    export default {
        name: "Header",
        components: {Button},
        computed: {
            user() {
                return this.$store.getters.getCurrentUser();
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        background: #ddd;
        padding: 15px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-title {
            cursor: pointer;
        }

        a {
            text-decoration: none;
        }

        .header-title {
            font-size: 36px;
            font-weight: bold;
            font-family: sans-serif;
        }

        .right-actions {
            display: flex;
            flex-direction: row;
            align-items: center;

            .btn {
                margin: 0px 20px;
            }

            .links {
                color: #36c3fe;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>
