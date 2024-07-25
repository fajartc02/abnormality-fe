import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL

export const GET_SYSTEM = 'GET_SYSTEM'
export const GET_SYSTEM_OPTS = 'GET_SYSTEM_OPTS'
export const SET_SYSTEM = 'SET_SYSTEM'
export const ACTION_SYSTEM = 'ACTION_SYSTEM'

const state = {
    SYSTEM_DATA: [],
}

const getters = {
    GET_SYSTEM(state) {
        return state.SYSTEM_DATA
    },
    GET_SYSTEM_OPTS(state) {
        return state.SYSTEM_DATA.map((system) => {
            return {
                id: system.system_value,
                label: system.system_value,
                selected: false,
                is_reason: system.system_value == 'LAIN LAIN' ? true : false,
            }
        })
    },
}

const mutations = {
    SET_SYSTEM(state, payload) {
        state.SYSTEM_DATA = payload
    },
}

const actions = {
    async ACTION_SYSTEM({ commit }, query) {
        try {
            const response = await axios.get(`${API_URL}/systems/get`, {
                params: query,
            })
            commit(SET_SYSTEM, response.data.data)
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
