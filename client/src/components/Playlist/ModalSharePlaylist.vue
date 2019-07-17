<template>
    <modal name="modal-share-playlist" height="auto">
        <div class="share-playlist">
            <div class="title">Share</div>
            <div class="description">Generate a link to share your playlist</div>
            <div class="input-block">
                <input type="text" v-model="link" placeholder="Link" readonly="readonly">
                <div class="actions">
                    <Button @click.native="generate">Generate</Button>
                    <Button @click.native="copy" :class="copied ? 'disabled' : ''">{{copied ? 'Copied' : 'Copy'}}</Button>
                </div>
            </div>
            <div class="bottom-buttons">
                <Button type="link" @click.native="close">Ok</Button>
            </div>
        </div>
    </modal>
</template>

<script>
    import Button from "../shared/Button";
    import {SITE_URL} from "../../store/utils";
    export default {
        name: "ShareDialog",
        components: {Button},
        props: ['playlistId', 'sharedLink'],
        watch: {
            sharedLink(value) {
                this.link = `${SITE_URL}/playlists/${value}`;
            }
        },
        data() {
            return {
                link: this.sharedLink,
                copied: false
            }
        },
        methods: {
            async copy() {
                try {
                    await navigator.clipboard.writeText(this.link);
                    this.copied = true;
                } catch (err) {
                    console.log(err);
                }
            },
            async generate() {
                const {sharedLink} = await this.$store.dispatch("generateSharePlaylistLink", {playlistId: this.playlistId});
                this.link = `${SITE_URL}/playlists/${sharedLink}`;
                this.copied = false;
            },
            close() {
                this.$modal.hide("modal-share-playlist")
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

        .input-block {
            display: flex;
            flex-direction: column;

            input {
                flex-grow: 1;
            }

            .actions {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;

                .btn {
                    margin-right: 20px;
                }
            }
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
