<template>
    <div class="songs-list">
        <Song v-for="song in songs" :key="song.id" :song="song" @add="addToPlaylist" @delete="deleteSong" />
        <ModalAddToPlaylist :song-id="selectedSongId"/>
    </div>
</template>

<script>
    import Song from "./Song";
    import ModalAddToPlaylist from "./ModalAddToPlaylist";
    import {BASE_URL} from "../../store/utils";
    export default {
        name: "Songs",
        components: {ModalAddToPlaylist, Song},
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
                songs,
                selectedSongId: ''
            }
        },
        methods: {
            fetchData() {
                this.$http.get(`${BASE_URL}/api/songs?type=my`, {
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
                this.selectedSongId = songId;
                this.$modal.show('add-to-playlist');
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
