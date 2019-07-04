<template>
    <div class="playlists">
        <div class="playlists-list">
            <div v-for="playlist in playlists" class="playlists-item">
                <div class="playlist-image">

                </div>
                <div class="playlist-info">
                    <div class="playlist-name">
                        {{playlist.name}}
                    </div>
                    <div class="playlist-username">
                        {{playlist.username}}
                    </div>
                    <Song v-for="song in playlist.songs" :song="song"></Song>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Song from "./helpers/Song";
    export default {
        name: "Playlists",
        components: {Song},
        data() {
            const playlists = [];
            for (let i = 0; i < 10; i++) {
                playlists.push({
                    name: 'MY FAVOURITE SONGS',
                    username: 'Jacob Peralta99',
                    songs: [
                        {
                            name: '123',
                            singer: '123',
                            length: 180
                        }, {
                            name: '123',
                            singer: '123',
                            length: 180
                        }, {
                            name: '123',
                            singer: '123',
                            length: 180
                        }, {
                            name: '123',
                            singer: '123',
                            length: 180
                        }, {
                            name: '123',
                            singer: '123',
                            length: 180
                        }
                    ]
                })
            }
            return {
                playlists
            }
        }
    }
</script>

<style scoped lang="scss">
    .playlists {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 50px 0;

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
                    width: 900px;

                    .playlist-name {
                        color: #555
                    }

                    .playlist-username {
                        color: #999
                    }
                }
            }
        }
    }
</style>
