<template>
    <modal name="add-to-playlist" height="auto">
        <div class="add-to-playlist">
            <div class="title">Add song to playlist</div>
            <AddToPlaylistLine
                v-for="playlist in playlists"
                :key="playlist.id"
                :playlist="playlist"
                :song-id="songId"
                @toggle-song="toggleSongInPlaylist"/>
            </div>
    </modal>
</template>

<script>
    import AddToPlaylistLine from "./AddToPlaylistLine";
    import Vue from "vue";

    export default {
        name: "ModalAddToPlaylist",
        components: {AddToPlaylistLine},
        props: ['songId'],
        created() {
            if (this.user) {
                this.fetch();
            }
        },
        computed: {
            user() {
                return this.$store.getters.getCurrentUser()
            }
        },
        data() {
            return {
                playlists: []
            }
        },
        methods: {
            async toggleSongInPlaylist(playlistId) {
                try {
                    const data = await this.$store.dispatch('toggleSongInPlaylist',
                        {playlistId, songId: this.songId});
                    const index = this.playlists.findIndex(playlist => data.id === playlist.id);
                    Vue.set(this.playlists, index, data);
                } catch (err) {
                    console.log('Error')
                }
            },
            async fetch() {
                const {data} = await this.$store.dispatch("fetchMyPlaylists");
                this.playlists = data;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .add-to-playlist {
        padding: 20px;
        border-radius: 4px;

        .title {
            font-size: 36px;
            margin-bottom: 20px;
        }
    }
</style>
