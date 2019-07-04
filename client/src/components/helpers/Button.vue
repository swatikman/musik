<template>
    <div class="btn">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Button"
    }
</script>

<style scoped lang="scss">
    .btn {
        border: 1px solid rgba(#36c3fe, 0.5);
        border-radius: 5px;
        padding: 5px 20px;
        font-size: 20px;
        cursor: pointer;
        color: white;
        background: #36c3fe;
        text-align: center;

        &:hover {
            background: white;
            color: #36c3fe;
        }
    }
</style>
