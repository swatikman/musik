<template>
    <div class="top-songs">
        <div class="top-songs-title">Top songs</div>
        <div class="top-songs-list">
            <Song v-for="song in topSongs" :song="song" ></Song>
        </div>
    </div>
</template>

<script>
    import Song from "./helpers/Song";
    export default {
        name: "TopSongs",
        components: {Song},
        data() {
            const topSongs = [];
            for (let i = 0; i < 20; i++) {
                topSongs.push({
                    singer: 'Britney Spears',
                    name: 'Oh Baby Baby'
                })
            }
            return {
                topSongs
            }
        }
    }
</script>

<style scoped lang="scss">
    .top-songs {

        .top-songs-title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .top-songs-list {
            border: 1px solid #ddd;
        }
    }
</style>
