import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL

export const GET_MACHINES = 'GET_MACHINES'
export const GET_MACHINES_OPTS = 'GET_MACHINES_OPTS'
export const SET_MACHINES = 'SET_MACHINES'
export const ACTION_MACHINES = 'ACTION_MACHINES'

const state = {
    MACHINES_DATA: [],
}

const getters = {
    GET_MACHINES(state) {
        return state.MACHINES_DATA
    },
    GET_MACHINES_OPTS(state) {
        return state.MACHINES_DATA.map((machine) => {
            return {
                id: machine.machine_id,
                label: machine.machine_nm,
            }
        })
    },
}

const mutations = {
    SET_MACHINES(state, payload) {
        state.MACHINES_DATA = payload
    },
}

const actions = {
    async ACTION_MACHINES({ commit }, query) {
        try {
            console.log('CALL ACTION MACHINES')
            const response = await axios.get(`${API_URL}/machines/get`, {
                params: query,
            })
            console.log(response.data.data)
            commit(SET_MACHINES, response.data.data.data)
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
