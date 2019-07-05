<template>
    <div class="my-music-container">
        <div class="my-playlists">
            <div class="title">Your playlists</div>
            <Button>Add new playlist</Button>
            <Playlists/>
        </div>
        <div class="my-songs">
            <div class="title">Uploaded songs</div>
            <Button @click.native="toggleUploadNewSong()">{{showUploadNewSong?'Cancel':'Upload new song'}}</Button>
            <UploadSongForm @uploaded="onSongUpload" :show="showUploadNewSong"/>
            <Songs/>
        </div>
    </div>
</template>

<script>
    import Playlists from "../Playlists";
    import Button from "../shared/Button";
    import UploadSongForm from "./UploadSongForm";
    import Songs from "../shared/Songs";

    export default {
        name: "MyMusic",
        components: {Songs, UploadSongForm, Button, Playlists},
        data() {
            return {
                showUploadNewSong: false,
            }
        },
        methods: {
            toggleUploadNewSong() {
                this.showUploadNewSong = !this.showUploadNewSong;
            },
            onSongUpload() {
                setTimeout(() => {
                    this.showUploadNewSong = false;
                }, 2000);
            }
        }
    }
</script>

<style scoped lang="scss">
    .my-music-container {
        display: flex;

        .title {
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            width: 100%;
        }

        .my-playlists {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 50%;
            margin-left: 50px;

            .btn {
                margin-bottom: 20px;
            }
        }

        .my-songs {
            width: 50%;

            .btn {
                margin-bottom: 20px;
            }

            .songs-list {
                margin-right: 50px;
            }
        }
    }
</style>
