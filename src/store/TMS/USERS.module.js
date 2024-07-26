import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL

export const GET_USERS = 'GET_USERS'
export const GET_USERS_OPTS = 'GET_USERS_OPTS'
export const SET_USERS = 'SET_USERS'
export const ACTION_USERS = 'ACTION_USERS'

const state = {
    USERS_DATA: [],
}

const getters = {
    GET_USERS(state) {
        return state.USERS_DATA
    },
    GET_USERS_OPTS(state) {
        return state.USERS_DATA.map((user) => {
            return {
                id: user.fullname,
                label: `${user.noreg}-${user.fullname}`,
            }
        })
    },
}

const mutations = {
    SET_USERS(state, payload) {
        state.USERS_DATA = payload
    },
}

const actions = {
    async ACTION_USERS({ commit }, query) {
        try {
            console.log('CALL ACTION USERS')
            const response = await axios.get(`${API_URL}/users/get`, {
                params: query,
            })
            console.log(response.data.data)
            commit(SET_USERS, response.data.data)
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
