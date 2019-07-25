<template>
    <div class="playlists-item">
        <div class="playlist-image">

        </div>
        <div class="playlist-info">
            <div class="playlist-name-wrapper">
                <router-link class="playlist-name" :to="'/playlist/' + playlist.id">{{playlist.name}}</router-link>
                <font-awesome-icon
                    v-if="playlist.sharedWithAll == false"
                    class="private-btn"
                    icon="lock"
                    title="Private"/>
            </div>
            <div class="playlist-username">{{playlist.username}}</div>
            <Song v-for="song in playlist.songs" :key="song.id" :song="song"></Song>
        </div>
    </div>
</template>

<script>
    import Song from "../shared/Song";

    export default {
        name: "MyPlaylist",
        components: {Song},
        props: ['playlist']
    }
</script>

<style scoped lang="scss">
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
            cursor: pointer;
        }

        .playlist-info {
            display: flex;
            flex-direction: column;
            min-width: 400px;

            .playlist-name-wrapper {
                display: flex;
                align-items: center;

                .playlist-name {
                    color: lighten(#555, 30%);
                    font-size: 24px;
                    margin-left: 20px;

                    &:hover {
                        color: #555;
                    }
                }

                .private-btn {
                    margin-left: 10px;
                    width: 15px;
                    height: 15px;
                    color: indianred;
                }
            }

            .playlist-username {
                color: #999;
                margin-left: 20px;
            }
        }
    }
</style>
