import { createStore } from 'vuex'

import MasterDrawingModule from './TMS/MasterDrawingModule'

import focusInputModule from './TMS/focusInput.module'
import TOOL_TYPESModule from './TMS/TOOL_TYPES.module'
import TOOLSModule from './TMS/TOOLS.module'
import METAModule from './TMS/META.module'
import TOOL_STDModule from './TMS/TOOL_STD.module'
import DISTRIBUTIONSModule from './TMS/DISTRIBUTIONS.module'
import MACHINESModule from './TMS/MACHINES.module'
import SYSTEMModule from './TMS/SYSTEM.module'
import GRAPHModule from './TMS/GRAPH.module'
import LINESModule from './TMS/LINES.module'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    MasterDrawingModule,

    focusInputModule,
    TOOL_TYPESModule,
    TOOLSModule,
    METAModule,
    TOOL_STDModule,
    DISTRIBUTIONSModule,
    GRAPHModule,
    LINESModule,
    MACHINESModule,
    SYSTEMModule,
  },
})
