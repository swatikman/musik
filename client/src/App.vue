<template>
    <div id="app">
        <Header v-if="ready"/>
        <router-view v-if="ready"/>
        <h1 v-else="ready">Loading...</h1>
    </div>
</template>

<script>
    import Header from "./components/Header";

    export default {
        name: 'app',
        components: {Header},
        computed: {
            ready() {
                return this.$store.getters.getCurrentUser() !== undefined
            }
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');

    body {
        margin: 0;
        padding: 0;
        font-family: 'Open Sans'
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        text-decoration: none;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
</style>
