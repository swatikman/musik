<template>
    <div class="songs-list">
        <Song v-for="song in songs" :key="song.id" :song="song" @add="addToPlaylist" @delete="deleteSong" />
    </div>
</template>

<script>
    import Song from "./Song";
    export default {
        name: "Songs",
        components: {Song},
        created: function() {
            this.fetchData();
        },
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
                songs
            }
        },
        methods: {
            fetchData() {
                this.$http.get('http://172.20.0.2:3000/api/songs?type=my', {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                    .then(({body}) => {
                        this.songs = body;
                    })
                    .catch(e => {
                        console.log(3, e);
                    })
            },
            addToPlaylist(songId) {
                console.log(123, songId)
            },
            deleteSong(songId) {
                console.log(124, songId)
            }
        }
    }
</script>

<style scoped lang="scss">
    .songs-list {
        border: 1px solid #ddd;
    }
</style>
