<template>
    <div class="search-container">
        <div>
            <h1>Search results for <strong>"{{query}}"</strong></h1>
            <div class="search-content">
                <div class="search-options">
                    <div class="search-option active">Everything</div>
                    <div class="search-option">Songs</div>
                    <div class="search-option">Playlists</div>
                </div>
                <div>
                    <div v-for="item in searchResults" :key="item.id">
                        <div v-if="item.type === 'playlist'">
                            <MyPlaylist :playlist="item" />
                        </div>
                        <div v-if="item.type === 'song'">
                            <Song :song="item"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Song from "../shared/Song";
    import MyPlaylist from "../MyMusic/MyPlaylist";
    export default {
        name: "SearchPage",
        components: {MyPlaylist, Song},
        computed: {
            query() {
                return this.$store.getters.getSearchQuery();
            },
            searchResults() {
                return this.$store.getters.getSearchResults();
            }
        },
        watch: {
            query(newValue) {
                this.$store.dispatch('fetchSearchAll')
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        .search-content {
            display: flex;
            flex-direction: row;
            justify-content: center;

            .search-options {
                display: flex;
                flex-direction: column;
                margin-right: 50px;

                .search-option {
                    font-size: 20px;
                    padding: 8px 150px 8px 40px;
                    cursor: pointer;

                    &.active {
                        background: #00B7FF;
                        color: #ffffff
                    }
                }
            }
        }
    }
</style>
