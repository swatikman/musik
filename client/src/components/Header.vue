<template>
    <div class="header">
        <router-link to="/" class="header-title" tag="span">musik</router-link>
        <header-search />
        <div class="right-actions">
            <template v-if="user">
                <router-link to="/my-profile">
                    <div class="links">My Profile</div>
                </router-link>
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
    import HeaderSearch from "./HeaderSearch";

    export default {
        name: "Header",
        components: {HeaderSearch, Button},
        computed: {
            user() {
                return this.$store.getters.getCurrentUser();
            },
        },
        methods: {
            async logout() {
                await this.$store.dispatch('logout');
                this.$router.push('/');
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
                margin-right: 20px;
            }

            .links {
                color: #36c3fe;
                margin-right: 20px;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>
