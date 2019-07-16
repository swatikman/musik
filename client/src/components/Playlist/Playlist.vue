<template>
    <div class="playlist-container">
        <div class="playlist-header">
            <div class="title">{{playlist.name}}</div>
            <div class="actions">
                <Button @click.native="share">Share</Button>
                <Button @click.native="edit">Edit</Button>
                <Button @click.native="deletePlaylist" type="danger">Delete</Button>
            </div>
        </div>
        <div class="playlist-content">
            <Songs :songs="playlist.songs"></Songs>
        </div>
        <ModalSharePlaylist />
        <ModalEditPlaylist />
        <ModalConfirm title="Delete playlist" description="Are you sure you want to delete this playlist?" />
    </div>
</template>

<script>
    import Button from "../shared/Button";
    import Songs from "../shared/Songs";
    import ModalSharePlaylist from "./ModalSharePlaylist";
    import ModalEditPlaylist from "./ModalEditPlaylist";
    import ModalConfirm from "../shared/ModalConfirm";

    export default {
        name: "Playlist",
        components: {ModalConfirm, ModalEditPlaylist, ModalSharePlaylist, Button, Songs},
        created() {
            this.fetch();
        },
        data() {
            return {
                playlist: {}
            }
        },
        methods: {
            async fetch() {
                try {
                    const {data} = await this.$store.dispatch("fetchPlaylist", {id: this.$route.params.id});
                    this.playlist = data;
                } catch (e) {
                    console.log(e)
                }
            },
            share() {
                this.$modal.show('modal-share-playlist');
            },
            edit() {
                this.$modal.show('modal-edit-playlist');
            },
            deletePlaylist() {
                this.$modal.show('modal-confirm')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .playlist-container {
        display: flex;
        flex-direction: column;
        max-width: 1210px;
        margin: auto;

        .playlist-header {
            display: flex;
            flex-direction: column;
            margin: 50px 0;

            .title {
                font-size: 36px;
            }

            .actions {
                display: flex;
                flex-direction: row;

                * {
                    margin-right: 20px;
                }
            }
        }

        .playlist-content {

        }
    }
</style>
