<template>
    <div :class="btnClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Button",
        props: {
            type: {
                default: '',
            }
        },
        computed: {
            btnClass() {
                let btnClass = 'btn-normal';
                switch (this.type) {
                    case 'danger':
                        btnClass = 'btn-danger';
                        break;
                }
                return ['btn', btnClass].join(' ')
            }
        }
    }
</script>

<style scoped lang="scss">
    .btn {
        display: inline-flex;
        border-radius: 5px;
        padding: 5px 20px;
        font-size: 20px;
        cursor: pointer;
        color: white;
        text-align: center;

        &.btn-normal {
            border: 1px solid rgba(#36c3fe, 0.5);
            background: #36c3fe;
            &:hover {
                background: white;
                color: #36c3fe;
            }
        }

        &.btn-danger {
            background: indianred;
            border: 1px solid rgba(indianred, 0.5);
            &:hover {
                background: white;
                color: indianred;
            }
        }


    }
</style>
