<template>
    <div class="main-page-container">
        <TopPlaylists />
        <TopSongs />
    </div>
</template>

<script>
    import TopPlaylists from "./TopPlaylists";
    import TopSongs from "./TopSongs";
    export default {
        name: "MainPage",
        components: {TopSongs, TopPlaylists},
        data() {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    .main-page-container {
        padding: 10px;

        .top-songs {
            padding-left: 20px;
            max-width: 812px;
        }
    }
</style>
