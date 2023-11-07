let authModule = {
    state: () => ({
        accessToken: null,
        tokenSeller: null,
        leaveAccount: false,
        leaveSellerAccount: false
    }),

    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token
        },

        setTokenSeller(state, token) {
            state.tokenSeller = token
        },

        setLeaveStatus(state, status) {
            state.leaveAccount = status
        },

        setLeaveSellerStatus(state, status) {
            state.leaveSellerAccount = status
        }
    },

    getters: {
        getAccessToken(state) {
            return state.accessToken
        },

        getTokenSeller(state) {
            return state.tokenSeller
        },

        getLeaveStatus(state) {
            return state.leaveAccount
        },

        getLeaveSellerStatus(state) {
            return state.leaveSellerAccount
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
            } else {
                return
            }
        },

        deleteAccessToken({commit, state}) {
            localStorage.removeItem('token')
            state.accessToken = null
            commit('setLeaveStatus', true)
        },

        updateTokenSeller({commit}, token) {
            commit('setTokenSeller', token)
            localStorage.setItem('tokenSeller', token)
        },

        loadTokenSeller({commit}) {
            let token = localStorage.tokenSeller || localStorage.getItem('tokenSeller')
            if(token) {
                commit('setTokenSeller', token)
            } else {
                return
            }
        },

        deleteTokenSeller({commit, state}) {
            localStorage.removeItem('tokenSeller')
            state.tokenSeller = null
            commit('setLeaveSellerStatus', true)
        },

        clearTokens({state}) {
            localStorage.removeItem('tokenSeller')
            localStorage.removeItem('token')
            state.accessToken = null
            state.tokenSeller = null
        }
    },

    namespaced: true
}

export default authModule