<template>
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
</template>

<script>
    import Button from "../shared/Button";
    export default {
        name: "NewPlaylist",
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
            createPlaylist() {
                const data = {name: this.name, sharedWithAll: this.sharedWithAll};
                this.$http.post('http://172.20.0.2:3000/api/playlists', data, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }).then(res => {
                    // TODO: do something
                }).catch(e => {
                })
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
