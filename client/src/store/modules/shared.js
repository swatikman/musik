
export default {
    state: {
        loading: false,
        loaders: [],
        error: ''
    },
    mutations: {
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
        SET_ERROR(state, error) {
            state.error = error
        },
        ADD_LOADER(state, loader) {
            state.loaders = [...state.loaders, loader];
        },
        REMOVE_LOADER(state, loader) {
            state.loaders = state.loaders.filter(item => item !== loader);
        }
    },
    actions: {

    },
    getters: {
        isLoading(state) {
            return () => state.loading
        },
        error(state) {
            return () => state.error
        }
    }
}
