<template>
    <div class="playlist-container" :class="loading">
        <div class="playlist-header">
            <div class="title-container">
                <div class="title">{{playlist.name}}</div>
                <font-awesome-icon
                    v-if="playlist.sharedWithAll === 'false'"
                    class="private-btn"
                    icon="lock"
                    title="Private"/>
            </div>
            <div class="actions">
                <Button @click.native="onShareClick">Share</Button>
                <Button @click.native="onEditClick">Edit</Button>
                <Button @click.native="onDeleteClick" type="danger">Delete</Button>
            </div>
        </div>
        <div class="playlist-content">
            <Songs :songs="playlist.songs"></Songs>
        </div>
        <ModalSharePlaylist :playlistId="playlist.id" :sharedLink="playlist.sharedLink"/>
        <ModalEditPlaylist :playlist="playlist" @submit="editPlaylist" />
        <ModalConfirm title="Delete playlist" description="Are you sure you want to delete this playlist?" @submit="deletePlaylist" />
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
        computed: {
            playlist() {
                return this.$store.getters.getPlaylist();
            },
            loading() {
                return this.$store.getters.isLoading() ? 'disabled' : '';
            }
        },
        destroyed() {
            this.$store.dispatch("clearPlaylist")
        },
        methods: {
            async fetch() {
                this.$store.dispatch("fetchPlaylist", {id: this.$route.params.id});
            },
            onShareClick() {
                this.$modal.show('modal-share-playlist');
            },
            onEditClick() {
                this.$modal.show('modal-edit-playlist');
            },
            onDeleteClick() {
                this.$modal.show('modal-confirm')
            },
            deletePlaylist() {
                alert('NOT IMPLEMENTED YET :(')
            },
            editPlaylist(data) {
                this.$modal.hide('modal-edit-playlist');
                this.$store.dispatch("editPlaylist", {id: this.playlist.id, data})
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

            .title-container {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 20px;

                .title {
                    font-size: 36px;
                    margin-right: 20px;
                }

                .private-btn {
                    width: 30px;
                    height: 30px;
                    color: indianred;
                }
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
