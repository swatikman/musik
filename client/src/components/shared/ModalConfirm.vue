<template>
    <modal name="modal-confirm" height="auto">
        <div class="modal-confirm">
            <div class="title">
                {{ title }}
            </div>
            <div class="description">
                {{ description }}
            </div>
            <div class="buttons">
                <Button>Cancel</Button>
                <Button>Submit</Button>
            </div>
        </div>
    </modal>
</template>

<script>
    import Button from "./Button";

    export default {
        name: "ModalConfirm",
        props: ['title', 'description'],
        components: {Button}
    }
</script>

<style lang="scss" scoped>
    .modal-confirm {

        padding: 20px;

        .title {
            font-size: 36px;
        }

        .description {
            margin-bottom: 20px;
        }

        .buttons {
            display: flex;
            justify-content: flex-end;

            * {
                margin-left: 20px;
            }
        }
    }
</style>
