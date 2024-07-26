import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL
import { SET_META } from './META.module'

export const GET_MACHINES = 'GET_MACHINES'
export const GET_MACHINES_OPTS = 'GET_MACHINES_OPTS'
export const SET_MACHINES = 'SET_MACHINES'
export const ACTION_MACHINES = 'ACTION_MACHINES'
export const ACTION_EDIT_MACHINES = 'ACTION_EDIT_MACHINES'
export const ACTION_ADD_MACHINES = 'ACTION_ADD_MACHINES'

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
      // console.log('CALL ACTION MACHINES')
      const response = await axios.get(`${API_URL}/machines/get`, {
        params: query,
      })

      commit(SET_META, response.data.data.meta)
      commit(SET_MACHINES, response.data.data.data)
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async ACTION_ADD_MACHINES({ commit, dispatch }, payload) {
    try {
      const response = await axios.post(`${API_URL}/machines/add`, payload)
      commit(SET_MACHINES, response.data.data)
      dispatch(ACTION_MACHINES)
    } catch (error) {}
  },
  async ACTION_EDIT_MACHINES({ commit, dispatch }, payload) {
    try {
      const response = await axios.post(
        `${API_URL}/machines/edit:${payload.machine_id}`,
        payload,
      )
      console.log(response)
      commit(SET_MACHINES, response.data.data)
      dispatch(ACTION_MACHINES)
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
