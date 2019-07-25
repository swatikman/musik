<template>
    <modal name="modal-new-playlist" height="auto">
        <div class="new-playlist">
            <div class="title">Create new playlist</div>
            <div class="playlist-name">
                <div class="playlist-name-label">Name:</div>
                <input type="text" placeholder="Name" v-model="name">
            </div>
            <div class="playlist-visibility">
                <input type="radio" value=true id="public" v-model="sharedWithAll">
                <label for="public">Public</label>
                <input type="radio" value=false id="private" v-model="sharedWithAll">
                <label for="private">Private</label>
            </div>
            <div class="bottom-buttons">
                <Button @click.native="cancel">Cancel</Button>
                <Button @click.native="createPlaylist">Create</Button>
            </div>
        </div>
    </modal>
</template>

<script>
    import Button from "../shared/Button";

    export default {
        name: "ModalNewPlaylist",
        components: {Button},
        data() {
            return {
                sharedWithAll: false,
                name: '',
            }
        },
        methods: {
            async createPlaylist() {
                const data = {name: this.name, sharedWithAll: this.sharedWithAll};
                try {
                    await this.$store.dispatch('createPlaylist', {data});
                    this.$modal.hide('modal-new-playlist');
                } catch (e) {
                    console.log('bad', e)
                }
            },
            cancel() {
                this.$modal.hide('modal-new-playlist');
            }
        }
    }
</script>

<style scoped lang="scss">
    .new-playlist {
        display: flex;
        flex-direction: column;
        padding: 20px;

        .title {
            font-size: 36px;
        }

        .playlist-name {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            font-size: 20px;

            input {
                border: 1px solid rgba(0, 0, 0, 0.5);
                padding: 8px;
                border-radius: 5px;
                margin: 10px 0;
                font-size: 16px;
            }
        }

        .playlist-visibility {
            margin-bottom: 10px;

            span {
                font-size: 20px;
            }
        }

        .bottom-buttons {
            display: flex;
            justify-content: flex-end;

            * {
                margin-left: 20px;
            }
        }
    }
</style>
