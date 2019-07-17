<template>
    <modal name="modal-edit-playlist" height="auto">
        <div class="modal-edit-playlist">
            <div class="title">Edit playlist</div>
            <div class="edit-title">
                <div>Change title:</div>
                <input type="text" v-model="title"/>
            </div>
            <div class="edit-shared-with-all">
                <span>Visibility:</span>
                <input type="radio" value=true id="public" v-model="sharedWithAll">
                <label for="public">Public</label>
                <input type="radio" value=false id="private" v-model="sharedWithAll">
                <label for="private">Private</label>
            </div>
            <div class="bottom-buttons">
                <Button @click.native="cancel">Cancel</Button>
                <Button @click.native="submit">Submit</Button>
            </div>
        </div>
    </modal>
</template>

<script>
    import Button from "../shared/Button";

    export default {
        name: "ModalEditPlaylist",
        components: {Button},
        props: ['playlist'],
        watch: {
            playlist(value) {
                this.title = value.name;
                this.sharedWithAll = value.sharedWithAll;
            }
        },
        data() {
            return {
                title: '',
                sharedWithAll: false
            }
        },
        methods: {
            cancel() {
                this.$modal.hide('modal-edit-playlist')
            },
            submit() {
                this.$emit('submit', {name: this.title, sharedWithAll: this.sharedWithAll});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-edit-playlist {
        display: flex;
        flex-direction: column;
        padding: 20px;

        .title {
            font-size: 36px;
        }

        .edit-title {
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

        .edit-shared-with-all {
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
