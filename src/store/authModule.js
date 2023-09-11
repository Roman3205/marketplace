let authModule = {
    state: () => ({
        accessToken: null
    }),

    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token
        }
    },

    getters: {
        getAccessToken(state) {
            return state.accessToken
        }
    },

    actions: {
        updateAccessToken({commit}, token) {
            commit('setAccessToken', token)
            localStorage.setItem('token', token)
        },

        loadToken({commit}) {
            let token = localStorage.token || localStorage.getItem('token')
            if(token) {
                commit('setAccessToken', token)
            }
        }
    },

    namespaced: true
}

export default authModule