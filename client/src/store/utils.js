export const BASE_URL = 'http://localhost:8080';

export const loadingPromise = (commit, loader, promise) => {
    return new Promise(async (resolve, reject) => {
        commit('ADD_LOADER', loader);
        try {
            const data = await new Promise(promise);
            resolve(data);
        } catch (e) {
            reject(e)
        }
        commit('REMOVE_LOADER', loader);
    })
};

