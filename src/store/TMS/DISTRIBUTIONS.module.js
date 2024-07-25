import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL

export const GET_DISTRIBUTIONS = 'GET_DISTRIBUTIONS'
export const GET_DISTRIBUTIONS_OPTS = 'GET_DISTRIBUTIONS_OPTS'
export const SET_DISTRIBUTIONS = 'SET_DISTRIBUTIONS'
export const ACTION_DISTRIBUTIONS = 'ACTION_DISTRIBUTIONS'

const state = {
    DISTRIBUTIONS_DATA: true,
}

const getters = {
    GET_DISTRIBUTIONS(state) {
        return state.DISTRIBUTIONS_DATA
    },
    GET_DISTRIBUTIONS_OPTS(state) {
        return state.DISTRIBUTIONS_DATA.map((distribution) => {
            return {
                id: distribution.distribution_id,
                label: distribution.distribution_nm,
            }
        })
    },
}

const mutations = {
    SET_DISTRIBUTIONS(state, payload) {
        state.DISTRIBUTIONS_DATA = payload
    },
}

const actions = {
    async ACTION_DISTRIBUTIONS({ commit }, query) {
        try {
            const response = await axios.get(`${API_URL}/distributions/get`, {
                params: query,
            })
            commit(SET_DISTRIBUTIONS, response.data.data)
        } catch (error) {
            console.error(error)
            return error
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
