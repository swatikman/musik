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
                    <Song v-for="song in playlist.songs" :key="song.id" :song="song"></Song>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Song from "./shared/Song";
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
                            id: 1,
                            name: '123',
                            singer: '123',
                            length: 180
                        }, {
                            id: 2,
                            name: '123',
                            singer: '123',
                            length: 180
                        }, {
                            id: 3,
                            name: '123',
                            singer: '123',
                            length: 180
                        }, {
                            id: 4,
                            name: '123',
                            singer: '123',
                            length: 180
                        }, {
                            id: 5,
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
                        color: #555;
                        margin-left: 20px;
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
