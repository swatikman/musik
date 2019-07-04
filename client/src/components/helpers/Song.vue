<template>
    <div class="song">
        <div class="left">
            <font-awesome-icon class="play-btn" icon="play"></font-awesome-icon>
            <span class="description"><span class="singer">{{song.singer}}</span> - <span class="name">{{song.name}}</span></span>
        </div>
        <div class="right">
            <span>03:46</span>
            <font-awesome-icon class="song-actions" icon="ellipsis-v"></font-awesome-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Song",
        props: ['song'],
        data() {
            return {
                singer: 'Britney Spears',
                name: 'Oh Baby Baby'
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

        .left {
            .play-btn {
                margin-right: 20px;
                cursor: pointer;
                color: #555;
            }

            .description {
                font-size: 20px;

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
