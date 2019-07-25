<template>
    <div class="search-container">
        <div>
            <h1>Search results for <strong>"{{query}}"</strong></h1>
            <div class="search-content">
                <div class="search-options">
                    <!--<div class="search-option active">Everything</div>-->
                    <!--<div class="search-option">Songs</div>-->
                    <!--<div class="search-option">Playlists</div>-->
                    <div
                        v-for="option in searchOptions"
                        :key="option.text"
                        class="search-option"
                        :class="option.active ? 'active' : ''"
                        @click="changeSearchOptions(option.value)"
                    >{{option.text}}</div>
                </div>
                <div class="search-results">
                    <div v-for="item in searchResults" :key="item.id" >
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
        created() {
            if (this.$route.path === '/search' && this.$route.query) {
                this.$store.dispatch('setSearchOption', {searchOption: this.$route.query.type});
            }
        },
        computed: {
            query() {
                return this.$store.getters.getSearchQuery();
            },
            searchResults() {
                return this.$store.getters.getSearchResults();
            },
            searchOption() {
                return this.$store.getters.getSearchOption();
            },
            searchOptions() {
                const type = this.searchOption;
                return [{
                    text: 'Everything',
                    value: '',
                    active: !type,
                }, {
                    text: 'Songs',
                    value: 'song',
                    active: type === 'song',
                }, {
                    text: 'Playlists',
                    value: 'playlist',
                    active: type === 'playlist',
                }]
            }
        },
        watch: {
            query() {
                this.performSearch();
            },
            searchOption() {
                this.$router.push({ path: '/search', query: {...this.$route.query, type: this.searchOption}});
                this.performSearch();
            }
        },
        methods: {
            changeSearchOptions(searchOption) {
                this.$store.dispatch('setSearchOption', {searchOption});
            },
            performSearch() {
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
            background: #fcfcfc;
            padding: 20px;

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

        .search-results {
            border-left: 1px solid rgba(0, 0, 0, .2);
            padding: 0 20px;
            min-width: 800px;
        }
    }
</style>
