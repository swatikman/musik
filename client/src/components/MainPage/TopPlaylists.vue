<template>
    <div class="top-playlists">
        <div class="top-playlists-title">Top shared playlists</div>
        <div class="top-playlists-list">
            <div v-for="playlist in playlists" class="top-playlists-list-item">
                <div class="playlist-image" @click="toPlaylist(playlist.id)">
                </div>
                <span class="playlist-description name" @click="toPlaylist(playlist.id)">{{playlist.name}}</span>
                <span class="playlist-description user">{{playlist.owner.displayName}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopPlaylists",
        created() {
            this.$store.dispatch('fetchPopularPlaylists');
        },
        computed: {
            playlists() {
                return this.$store.getters.getPlaylists()
            }
        },
        methods: {
            toPlaylist(id) {
                this.$router.push(`/playlist/${id}`)
            }
        }
    }
</script>

<style scoped lang="scss">
    .top-playlists {
        display: flex;
        flex-direction: column;

        .top-playlists-title {
            margin-top: 20px;
            margin-left: 20px;
            font-size: 28px;
            font-weight: bold;
        }
        .top-playlists-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;

            .top-playlists-list-item {
                display: flex;
                flex-direction: column;
                padding: 10px 0;
                margin: 20px;
                width: 168px;

                .playlist-image {
                    width: 168px;
                    height: 168px;
                    background: #00B7FF;
                    cursor: pointer;
                    margin-bottom: 5px;

                    &:hover {
                        opacity: 0.7;
                    }
                }

                .playlist-description {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    text-align: right;
                    cursor: pointer;

                    &.name {
                        font-size: 20px;
                        margin-bottom: 5px;
                    }

                    &.user {
                        font-size: 16px;
                        opacity: 0.7;
                    }

                    &:hover {
                        opacity: 0.5;
                    }
                }
            }
        }
    }
</style>
