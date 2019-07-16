<template>
    <modal name="share-playlist" height="auto">
        <div class="share-playlist">
            <div class="title">Share</div>
            <div class="description">Fill email of someone you want to share</div>
            <input type="text" v-model="email" placeholder="Email">
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
        name: "ShareDialog",
        components: {Button},
        data() {
            return {
                email: ""
            }
        },
        methods: {
            submit() {
                console.log(this.email);
            },
            cancel() {
                this.$modal.hide("share-playlist")
            },
            submit() {
                this.$emit('submit')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .share-playlist {
        display: flex;
        flex-direction: column;
        padding: 20px;

        .title {
            font-size: 36px;
        }

        .description {

        }

        input {
            border: 1px solid rgba(0, 0, 0, 0.5);
            padding: 8px;
            border-radius: 5px;
            margin: 10px 0;
            font-size: 16px;
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
