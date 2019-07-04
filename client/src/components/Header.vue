<template>
    <div class="header">
        <router-link to="/" class="header-title" tag="span">musik</router-link>
        <div class="right-actions">
            <router-link to="/sign-in">
                <Button>Sign in</Button>
            </router-link>
            <router-link to="/sign-up">
                <Button>Sign up</Button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import Button from "./helpers/Button";

    export default {
        name: "Header",
        components: {Button}
    }
</script>

<style scoped lang="scss">
    .header {
        background: #ddd;
        padding: 10px 30px;
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

            .btn {
                margin: 10px;
            }
        }
    }
</style>
