
export default {
    state: {
        loading: false,
        error: ''
    },
    mutations: {
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
        SET_ERROR(state, error) {
            state.error = error
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
