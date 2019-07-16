<template>
    <div class="songs">
        <div class="songs-title">Top songs</div>
        <Songs :songs="songs" />
    </div>
</template>

<script>
    import Songs from "./shared/Songs";
    export default {
        name: "TopSongs",
        components: {Songs},
        data() {
            const songs = [];
            for (let i = 0; i < 20; i++) {
                songs.push({
                    id: i,
                    singer: 'Britney Spears',
                    name: 'Oh Baby Baby'
                })
            }
            return {
                songs,
                selectedSongId: ''
            }
        },
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
