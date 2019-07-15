<template>
    <modal name="add-to-playlist" height="auto">
        <div class="add-to-playlist">
            <div class="title">Add song to playlist</div>
            <div v-for="playlist in playlists" class="playlist">
                <div>{{playlist.name}}</div>
                <font-awesome-icon class="plus-btn" icon="plus" @click="addToPlaylist(playlist.id)" />
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        name: "ModalAddToPlaylist",
        props: ['songId', 'abc'],
        computed: {
            playlists() {
                return this.$store.getters.myPlaylists()
            }
        },
        methods: {
            addToPlaylist(playlistId) {
                this.$store.dispatch('addTrackToPlaylist', {playlistId, songId: this.songId})
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
        .playlist {
            display: flex;
            justify-content: space-between;
            padding: 10px 10px;
            border: 1px solid rgba(0, 0, 0, 0.3);

            .plus-btn {
                color: green;
                cursor: pointer;
            }
        }
    }
</style>
