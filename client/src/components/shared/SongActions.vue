<template>
    <div class="actions">
        <div class="action" @click="$emit('add')">Add to playlist</div>
        <div class="action" @click="$emit('delete')">Delete</div>
    </div>
</template>

<script>
    export default {
        name: "SongActions",
        created: function() {
            setTimeout(() => {
                window.addEventListener('click',this.hide);
            }, 10);
        },
        destroyed: function() {
            window.removeEventListener('click',this.hide);
        },
        methods: {
            hide() {
                console.log('123');
                this.$emit('hide')
            }
        }
    }
</script>

<style scoped lang="scss">
    .actions {
        position: absolute;
        color: gray;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding: 7px;
        right: 0;
        z-index: 1;

        .action {
            cursor: pointer;

            &:after{
                content: '';
                position: absolute;
                left: 5px;
                right: 5px;
                display: block;
                height: 1px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            }

            &:last-child:after {
                border-bottom: 0;
            }
        }
    }
</style>
