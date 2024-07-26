<template>
  <CModal scrollable :visible="modalShow" @close="() => { $emit('modal-show', false) }">
    <CModalHeader>
      <CModalTitle>Regrinding Tool</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="card p-2 mb-4" style="z-index: 2">
        <template v-for="(item) in form" :key="item.tool_type_std_id">
          <CInputGroup class="mb-1">
            <!-- Start:: LABEL CONDITIONS -->
            <CInputGroupText v-if="!item.value" style="width: 150px">
              {{ item.measuring_portion }}
            </CInputGroupText>

            <CInputGroupText v-if="(+item.value <= +item.upper_limit && +item.value >= +item.lower_limit) && item.value"
              class="text-light bg-success" style="width: 150px">
              {{ item.measuring_portion }}
            </CInputGroupText>

            <CInputGroupText
              v-else-if="(+item.value >= +item.upper_limit || +item.value <= +item.lower_limit) && item.value"
              class="text-light bg-danger" style="width: 150px">
              {{ item.measuring_portion }}
            </CInputGroupText>
            <!-- END:: LABEL CONDITIONS -->
            <CFormInput type="number" v-model="item.value" />
            <CInputGroupText style="width: 50px">
              {{ item.units }}
            </CInputGroupText>
          </CInputGroup>
          <small class="text-muted">STD: {{ +item.lower_limit }} ~ {{ +item.upper_limit }} {{ item.units }}
          </small>
          <!-- GET USERS -->
        </template>
      </div>
      <CInputGroup class="mb-4">
        <CInputGroupText style="width: 150px">
          PIC
        </CInputGroupText>
        <treeselect class="form-control p-0" v-model="selectedPIC" :options="users" />
      </CInputGroup>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { $emit('modal-show', false) }">Close</CButton>
      <CButton v-if="form" color="primary" @click="submitCheck" :disabled="!isAllFilled">Save</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import Treeselect from "@zanmato/vue3-treeselect";
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";

import MOCK_USERS_TREESELECT from "@/mock/USERS_TREESELECT.mock";

import { GET_META } from "@/store/TMS/META.module";
import { ACTION_TOOL_STD, GET_TOOL_STD } from "@/store/TMS/TOOL_STD.module";
import { ACTION_ADD_TOOL_HISTORY, ACTION_TOOL_DETAILS, GET_TOOL_DETAILS } from "@/store/TMS/TOOLS.module";

import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";
import { mapGetters } from "vuex";
import { ACTION_USERS, GET_USERS_OPTS } from "@/store/TMS/USERS.module";

export default {
  name: "RegrindingAction",
  data() {
    return {
      users: MOCK_USERS_TREESELECT,
      is_qr_avail: true,
      form: null,
      selectedPIC: null
    }
  },
  components: {
    Treeselect
  },
  methods: {
    async submitCheck() {
      try {
        this.$swal.showLoading()
        const checkData = await this.form.map(item => {
          const upperLimit = +item.upper_limit
          const lowerLimit = +item.lower_limit
          const system_judgment = +item.value <= upperLimit && +item.value >= lowerLimit ? 'OK' : 'NG'
          return {
            tool_type_std_id: item.tool_type_std_id,
            measuring_portion: item.measuring_portion,
            system_judgment,
            value_check: item.value,
            upper_limit: item.upper_limit,
            lower_limit: item.lower_limit
          }
        })

        let payloadData = {
          headerData: {
            tool_id: this.GET_TOOL_DETAILS.tool_id,
            distribution_id: '0', // Repair in TR
            system_activity: 'REGRINDING',
            act_counter: `${this.GET_TOOL_DETAILS.act_counter}`,
            pic_check: this.selectedPIC,
            regrinding_count: this.GET_TOOL_DETAILS.regrinding_count,
            system_problem: this.GET_TOOL_DETAILS.system_problem
          },
          checkData
        }

        await this.$store.dispatch(ACTION_ADD_TOOL_HISTORY, payloadData)
        await this.$store.dispatch(ACTION_TOOL_DETAILS, { tool_qr: this.GET_TOOL_DETAILS.tool_qr })
        await this.$store.dispatch(ACTION_TOOL_STD, { tool_type_id: this.tool_type_id, meta: this.GET_META, system_std_used: 'TR' })
        this.$emit('modal-show', false)
        this.$swal.hideLoading()
        this.clearForm()
      } catch (error) {
        console.error(error)
        alert(error)
      }
    },
    clearForm() {
      this.form = this.GET_TOOL_STD
      this.selectedPIC = null
    }
  },
  computed: {
    ...mapGetters([GET_TOOL_STD, GET_META, GET_TOOL_DETAILS, GET_USERS_OPTS]),
    isAllFilled() {
      const isValueFill = this.form.filter(item => item.value)
      return isValueFill.length == this.form.length
    },
    isAllStdOk() {
      const isStandard = this.form.filter(function (item) {
        const upperLimit = +item.upper_limit
        const lowerLimit = +item.lower_limit

        if (+item.value <= upperLimit && +item.value >= lowerLimit) {
          return item
        }
      })
      return isStandard.length == this.form.length
    }
  },
  watch: {
    modalShow: function () {
      if (this.modalShow) {
        this.$store.dispatch(ACTION_TOOL_STD, { tool_type_id: this.tool_type_id, meta: this.GET_META, system_std_used: 'TR' })
      }
    },
    tool_type_id: function () {
      console.log(this.tool_type_id);
      if (this.tool_type_id)
        this.$store.dispatch(ACTION_TOOL_STD, { tool_type_id: this.tool_type_id, meta: this.GET_META, system_std_used: 'TR' })
    },
    GET_TOOL_STD: function () {
      if (this.GET_TOOL_STD.length > 0) {
        this.form = this.GET_TOOL_STD
      }
    },
    GET_USERS_OPTS: function () {
      if (this.GET_USERS_OPTS.length > 0) {
        this.users = this.GET_USERS_OPTS
      }
    }
  },
  props: {
    modalShow: {
      type: Boolean,
      default: false
    },
    tool_type_id: {
      type: Number,
      default: null
    }
  },
  mounted() {
    this.$store.dispatch(ACTION_USERS, { meta: this.GET_META })
  }
}
</script>
<style></style>
