import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL

export const GET_TOOL_STD = 'GET_TOOL_STD'
export const GET_TOOL_STD_OPTS = 'GET_TOOL_STD_OPTS'
export const SET_TOOL_STD = 'SET_TOOL_STD'
export const ACTION_TOOL_STD = 'ACTION_TOOL_STD'

const state = {
    TOOL_STD_DATA: [],
}

const getters = {
    GET_TOOL_STD(state) {
        return state.TOOL_STD_DATA
    },
    GET_TOOL_STD_OPTS(state) {
        return state.TOOL_STD_DATA.map((toolType) => {
            return {
                id: toolType.tool_type_id,
                label: toolType.tool_type_nm,
            }
        })
    },
}

const mutations = {
    SET_TOOL_STD(state, payload) {
        state.TOOL_STD_DATA = payload
    },
}

const actions = {
    async ACTION_TOOL_STD({ commit }, query) {
        try {
            const response = await axios.get(`${API_URL}/tool-types/get-standard`, {
                params: query,
            })
            commit(SET_TOOL_STD, response.data.data.data)
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