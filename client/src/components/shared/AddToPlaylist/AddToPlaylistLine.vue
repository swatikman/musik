<template>
    <div class="playlist">
        <router-link :to="`/playlist/${this.playlist.id}`">
            <div>{{playlist.name}}</div>
        </router-link>
        <font-awesome-icon v-if="isAdded" class="remove-btn" icon="times" @click="$emit('toggle-song', playlist.id)"/>
        <font-awesome-icon v-else="isAdded" class="plus-btn" icon="plus" @click="$emit('toggle-song', playlist.id)"/>
    </div>
</template>

<script>
    export default {
        name: "AddToPlaylistLine",
        props: ['playlist', 'songId'],
        computed: {
            isAdded() {
                return this.playlist.songs && this.playlist.songs.some(song => song.id === this.songId)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .playlist {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px;
        border: 1px solid rgba(0, 0, 0, 0.3);

        .plus-btn, .remove-btn {
            color: green;
            cursor: pointer;
        }

        a {
            color: #36c3fe;
        }
    }
</style>
