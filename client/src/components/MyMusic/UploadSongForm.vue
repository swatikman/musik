<template>
    <div v-if="show">
        <form v-if="!uploaded" class="upload-file-form">
            <div v-if="error">{{error}}</div>
            <input type="text" class="input-song" v-model="singer" placeholder="Singer">
            <input type="text" class="input-song" v-model="name" placeholder="Song name">
            <div class="dropbox">
                <input type="file" class="input-file" @change="filesChange($event.target.files)">
                <span v-if="file === null">Drag song file here</span>
                <span v-if="file">Your file: <strong>{{file.name}}</strong></span>
            </div>
            <Button @click.native="submit">Upload</Button>
        </form>
        <div v-else class="song-upload-success">
            <p>Song successfully uploaded</p>
        </div>
    </div>

</template>

<script>
    import Button from "../shared/Button";
    export default {
        name: "UploadSongForm",
        components: {Button},
        props: ['show'],
        watch: {
            show: function(newVal, oldVal) {
                if (newVal) {
                    this.error = '';
                    this.singer = '';
                    this.name = '';
                    this.file = null;
                    this.uploaded = false;
                }
            }
        },
        data() {
            return {
                error: '',
                singer: '',
                name: '',
                file: null,
                uploaded: false
            }
        },
        methods: {
            filesChange(file) {
                this.file = file[0];
            },
            submit() {
                if (!this.isValid()) {
                    return;
                }

                const formData = new FormData();
                formData.append("name", this.name);
                formData.append("singer", this.singer);
                formData.append("file", this.file, this.file.name);

                this.$http.post('http://172.20.0.2:3000/api/songs', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: localStorage.getItem("token")
                    }
                }).then(res => {
                    this.uploaded = true;
                    this.$emit('uploaded');
                }).catch(e => {
                    this.error = "Error, can't upload song to server";
                })
            },
            isValid() {
                if (!this.singer || !this.name) {
                    this.error = 'Singer and song name should be not empty';
                    return false;
                }
                this.error = '';

                return true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .upload-file-form {
        width: 500px;

        .input-song {
            width: calc(100% + -18px);
            padding: 7px;
            font-size: 18px;
            margin-bottom: 10px;
        }

        .dropbox {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
            position: relative;
            background: #00B7FF;
            border-radius: 5px;
            outline: 2px dashed green;
            outline-offset: -10px;
            margin-bottom: 10px;

            span {
                font-size: 20px;
                color: white;
                text-align: center;
                max-width: 400px;
            }

            .input-file {
                cursor: pointer;
                width: 100%;
                height: 200px;
                position: absolute;
                opacity: 0;


            }
        }
    }

    .song-upload-success {
        width: 500px;
        background: #00B7FF;

        p {
            padding: 50px 20px;
            font-size: 28px;
            color: white;
            text-align: center;
        }
    }
</style>
