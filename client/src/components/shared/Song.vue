<template>
    <div class="song">
        <div class="left">
            <font-awesome-icon class="play-btn" icon="play"></font-awesome-icon>
            <span class="description"><span class="singer">{{song.singer}}</span> - <span class="name">{{song.name}}</span></span>
        </div>
        <div class="right">
            <span>03:46</span>
            <font-awesome-icon class="song-actions" icon="ellipsis-v" @click="showActions()"></font-awesome-icon>
        </div>
        <SongActions v-if="actions" @hide="hideActions" @add="add" @delete="remove"/>
    </div>
</template>

<script>
    import SongActions from "./SongActions";
    export default {
        name: "Song",
        components: {SongActions},
        props: ['song'],
        data() {
            return {
                actions: false,
                id: this.song.id
            }
        },
        methods: {
            showActions() {
                this.actions = true
            },
            hideActions() {
                this.actions = false;
            },
            add() {
                this.$emit('add', this.id)
            },
            remove() {
                this.$emit('delete', this.id)
            }
        }
    }
</script>

<style scoped lang="scss">
    .song {
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        border-bottom: 1px solid #c8c8c8;
        position: relative;

        .left {
            .play-btn {
                margin-right: 20px;
                cursor: pointer;
                color: #555;
            }

            .description {
                font-size: 16px;

                .singer {
                    color: #555;
                }

                .name {
                    color: #999;
                }
            }
        }

        .right {
            display: flex;
            align-items: center;

            * {
                margin-left: 20px;
            }

            .song-actions {
                cursor: pointer;
                color: #555;
            }
        }
    }
</style>
