<template>
    <Songs :songs="songs" />
</template>

<script>
    import Songs from "../shared/Songs";
    export default {
        name: "MySongs",
        components: {Songs},
        created() {
            this.$store.dispatch("fetchMySongs")
        },
        computed: {
            songs() {
                return this.$store.getters.getMySongs()
            }
        }
    }
</script>

<style scoped>

</style>
