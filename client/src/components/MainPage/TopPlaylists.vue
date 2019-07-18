<template>
    <div class="top-playlists">
        <div class="top-playlists-title">Top shared playlists</div>
        <div class="top-playlists-list">
            <div v-for="playlist in playlists" class="top-playlists-list-item">
                <div class="playlist-image">
                </div>
                <span class="playlist-description name">{{playlist.name}}</span>
                <span class="playlist-description user">{{playlist.username}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopPlaylists",
        data() {
            const playlists = [];
            for (let i = 0; i < 10; i++) {
                playlists.push({
                    name: 'Energy Music',
                    username: 'User#2528'
                })
            }
            return {
                playlists
            }
        },
        methods: {

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
                }
            }
        }
    }
</style>
