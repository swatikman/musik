<template>
    <div class="songs">
        <div class="songs-title">Top songs</div>
        <Songs />
    </div>
</template>

<script>
    import Songs from "./shared/Songs";
    export default {
        name: "TopSongs",
        components: {Songs},
        data() {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    .songs {

        .songs-title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 20px;
        }
    }
</style>
