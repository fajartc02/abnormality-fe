<template>
  <CSidebar class="bg-white" position="fixed" :unfoldable="sidebarUnfoldable" :visible="sidebarVisible" @visible-change="(event) =>
    $store.commit({
      type: 'updateSidebarVisible',
      value: event,
    })
    ">
    <CSidebarBrand>
      <img src="../assets/brand/Toyota_logo.png" class="img-fluid sidebar-brand-full" width="200" height="200" />
      <img src="../assets/brand/Toyota_logo.png" class="sidebar-brand-narrow" width="36" height="10" />
    </CSidebarBrand>
    <AppSidebarNav v-bind:nav="nav" />
    <CSidebarToggler id="SidebarToggler" class="d-none d-lg-flex submenu-background"
      @click="$store.commit('toggleUnfoldable')" />
  </CSidebar>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from '@/standalone/assets/brand/logo-negative'
import { sygnet } from '@/standalone/assets/brand/sygnet'
import utils from '@/utils/CommonUtils'
import api from '@/apis/CommonAPI'
import navtemplate from '@/_nav.js'
import { CNavGroup } from '@coreui/vue'

var strAuthorizedNav = ''
var appAuthorized = {}
const generateNav = async (newAuthorizedData, isChild) => {
  strAuthorizedNav += '['
  let newAuthorizedDataLength = newAuthorizedData.length
  for (var i = 0; i < newAuthorizedDataLength; i++) {
    let currentNewAuthorizedData = newAuthorizedData[i]
    if (
      currentNewAuthorizedData.children &&
      currentNewAuthorizedData.children.length > 0
    ) {
      strAuthorizedNav += '{'
      strAuthorizedNav += ' "component": "CNavGroup",'
      strAuthorizedNav +=
        ' "name": "' +
        (isChild ? '' : '') +
        currentNewAuthorizedData.displayText +
        '",'
      strAuthorizedNav += ' "to": "' + currentNewAuthorizedData.path + '",'
      strAuthorizedNav += ' "icon": "' + currentNewAuthorizedData.icon + '",'
      strAuthorizedNav +=
        ' "parentId": "' + currentNewAuthorizedData.parentId + '",'
      strAuthorizedNav += ' "items": '
      generateNav(currentNewAuthorizedData.children, true)
      strAuthorizedNav += '},'
    } else {
      strAuthorizedNav += '{'
      strAuthorizedNav += ' "component": "CNavItem",'
      strAuthorizedNav +=
        ' "name": "' +
        (isChild ? '' : '') +
        currentNewAuthorizedData.displayText +
        '",'
      strAuthorizedNav += ' "to": "' + currentNewAuthorizedData.path + '",'
      strAuthorizedNav += ' "icon": "' + currentNewAuthorizedData.icon + '",'
      strAuthorizedNav +=
        ' "parentId": "' + currentNewAuthorizedData.parentId + '",'
      strAuthorizedNav +=
        ' "applicationId": "' + currentNewAuthorizedData.applicationId + '",'
      strAuthorizedNav +=
        ' "linkProps": { "queryParams": { "applicationId": "' +
        currentNewAuthorizedData.applicationId +
        '", "functionId": "' +
        currentNewAuthorizedData.functionId +
        '" } }'
      strAuthorizedNav += '},'
    }
  }
  strAuthorizedNav += ']'
}

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  data() {
    return {
      nav: [
        {
          component: 'CNavItem',
          name: 'Dashboard',
          to: '/dashboard',
          // icon: 'cilMap',
          parentId: 'ROOT',
        },
        {
          component: 'CNavItem',
          name: 'Input Problem',
          to: '/input-problem',
          // icon: 'cilMap',
          parentId: 'ROOT',
        },

        // {
        //   component: 'CNavItem',
        //   to: '/contoh',
        //   name: 'Contoh',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/gauge-control',
        //   name: 'Gauge Control',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/gauge-control/detail/:id',
        //   name: 'Gauge Control Detail',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/gauge-control/add',
        //   name: 'Gauge Control Add',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/gauge-control/edit/:id',
        //   name: 'Gauge Control Edit',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/calibration-item/:idGauge',
        //   name: 'Calibration Item',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/calibration-item/add/:idGauge',
        //   name: 'Calibration Item Add',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/calibration-item/edit/:id',
        //   name: 'Calibration Item Edit',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/monthly-planning',
        //   name: 'Monthly Planning',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/daily-management',
        //   name: 'Daily Management',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/monthly-planning-holiday',
        //   name: 'Monthly Planning Holiday',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/monthly-planning-holiday/add',
        //   name: 'Monthly Planning Holiday Add',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/monthly-planning-holiday/edit/:id',
        //   name: 'Monthly Planning Holiday Edit',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/custom-planning',
        //   name: 'Custom Planning',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/custom-planning/add',
        //   name: 'Custom Planning',
        //   icon: '',
        //   parentId: 'ROOT',
        // },
        // {
        //   component: 'CNavItem',
        //   to: '/qdc/custom-planning/edit/:id',
        //   name: 'Custom Planning',
        //   icon: '',
        //   parentId: 'ROOT',
        // }

        /*define other in here*/
      ],
    }
  },
  setup() {
    const store = useStore()
    return {
      logoNegative,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
  // async created() {
  //   let authorizedView = await api.scQueryApi('/api/common/menu-authorized', 'POST', '');
  //   strAuthorizedNav = '';
  //   if (authorizedView.data) {
  //     await generateNav(authorizedView.data.children)
  //     let jsonAuthorizedNavJSON = JSON.parse('{"value": ' + strAuthorizedNav.replaceAll('},]', '}]') + '}');

  //     //this.nav = this.nav.concat(jsonAuthorizedNavJSON.value);
  //     // this.nav=navtemplate;
  //   }
  //   setInterval(async () => {
  //     let authorizedView = await api.scQueryApi('/api/common/user-info', 'POST', '');
  //   }, 60 * 1000);

  //   //this.$router.push('/dc/dashboard');
  // }
}
</script>

<style>
.submenu-background {
  background-color: #f8f9fa !important;
}
</style>
