<template>
    <div class="search-block">
        <input
            type="text"
            class="main-input search"
            v-model="search"
            v-on:keyup.enter="performSearch"
            placeholder="Search" />
        <font-awesome-icon
            class="search-button"
            icon="search"
            @click="performSearch" />
    </div>
</template>

<script>

    export default {
        name: "HeaderSearch",
        created() {
            if (this.$route.path === '/search') {
                this.search = this.$route.query.q;
            }
        },
        watch: {
            '$route' (to, from) {
                if (to.path === '/search') {
                    this.search = to.query.q;
                }
            },
            search(newValue) {
                this.$store.dispatch('setQuery', {query: newValue})
            }
        },
        data() {
            return {
                search: '',
                searchOption: ''
            }
        },
        methods: {
            performSearch() {
                this.$router.push(`/search?q=${this.search}&type=${this.searchOption}`);
            }
        }
    }
</script>


<style scoped lang="scss">
    .search-block {
        display: flex;
        align-items: center;
        position: relative;

        .search {
            width: 500px;
        }

        .search-button {
            position: absolute;
            right: 10px;
            cursor: pointer;
        }
    }

</style>
