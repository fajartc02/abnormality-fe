import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL

export const GET_TOOL_TYPES = 'GET_TOOL_TYPES'
export const GET_TOOL_TYPES_OPTS = 'GET_TOOL_TYPES_OPTS'
export const SET_TOOL_TYPES = 'SET_TOOL_TYPES'
export const ACTION_TOOL_TYPES = 'ACTION_TOOL_TYPES'

const state = {
    TOOL_TYPES_DATA: true,
}

const getters = {
    GET_TOOL_TYPES(state) {
        return state.TOOL_TYPES_DATA
    },
    GET_TOOL_TYPES_OPTS(state) {
        return state.TOOL_TYPES_DATA.map((toolType) => {
            return {
                id: toolType.tool_type_id,
                label: toolType.tool_type_nm,
            }
        })
    },
}

const mutations = {
    SET_TOOL_TYPES(state, payload) {
        state.TOOL_TYPES_DATA = payload
    },
}

const actions = {
    async ACTION_TOOL_TYPES({ commit }, payload) {
        try {
            const response = await axios.get(`${API_URL}/tool-types/get`)
            commit(SET_TOOL_TYPES, response.data.data)
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