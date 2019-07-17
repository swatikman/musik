<template>
    <modal name="modal-new-playlist" height="auto">
        <div class="new-playlist">
            <form>
                <input type="text" placeholder="Name" class="playlist-name" v-model="name">
                <div>
                    <input type="radio" value=true id="public" v-model="sharedWithAll">
                    <label for="public">Public</label>
                    <input type="radio" value=false id="private" v-model="sharedWithAll">
                    <label for="private">Private</label>
                </div>
                <Button @click.native="createPlaylist">Create</Button>
            </form>
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
                search: '',
                foundTracks: []
            }
        },
        watch: {
            search(search) {
                this.searchTracks(search);
            }
        },
        methods: {
            searchTracks(query) {
                const foundTracks = [];
                for (let i = 0; i < 10; i++) {
                    foundTracks.push(`${i} Track - ${query}`);
                }
                this.foundTracks = foundTracks;
            },
            async createPlaylist() {
                const data = {name: this.name, sharedWithAll: this.sharedWithAll};
                try {
                    await this.$store.dispatch('createPlaylist', {data});
                    console.log('good')
                } catch (e) {
                    console.log('bad', e)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .new-playlist {
        form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .playlist-name {
                padding: 7px;
            }
        }
    }
</style>
