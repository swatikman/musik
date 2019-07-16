<template>
    <div class="songs-list">
        <Song v-for="song in songs" :key="song.id" :song="song" @add="addToPlaylist" @delete="deleteSong" />
        <ModalAddToPlaylist :song-id="selectedSongId"/>
    </div>
</template>

<script>
    import Song from "./Song";
    import ModalAddToPlaylist from "./AddToPlaylist/ModalAddToPlaylist";
    import {BASE_URL} from "../../store/utils";
    export default {
        name: "Songs",
        components: {ModalAddToPlaylist, Song},
        props: ["songs"],
        data() {

            return {
                selectedSongId: ''
            }
        },
        methods: {
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
