<template>
    <div class="playlists">
        <div class="playlists-list">
            <MyPlaylist v-for="playlist in playlists" :playlist="playlist"/>
        </div>
    </div>
</template>

<script>
    import Song from "../shared/Song";
    import MyPlaylist from "./MyPlaylist";

    export default {
        name: "MyPlaylists",
        components: {MyPlaylist, Song},
        created() {
            this.$store.dispatch("fetchMyPlaylists")
        },
        computed: {
            playlists() {
                return this.$store.getters.myPlaylists()
            }
        }
    }
</script>

<style scoped lang="scss">
    .playlists {
        display: flex;

        .playlists-list {
            border: 1px solid #ddd;

            .playlists-item {
                display: flex;
                flex-direction: row;
                padding: 20px;
                margin: 20px;

                .playlist-image {
                    width: 200px;
                    height: 200px;
                    background: darkslategray;
                    margin-right: 20px;
                }

                .playlist-info {
                    display: flex;
                    flex-direction: column;
                    min-width: 400px;

                    .playlist-name {
                        color: lighten(#555, 30%);
                        font-size: 24px;
                        margin-left: 20px;

                        &:hover {
                            color: #555;

                        }
                    }

                    .playlist-username {
                        color: #999;
                        margin-left: 20px;
                    }
                }
            }
        }
    }
</style>
