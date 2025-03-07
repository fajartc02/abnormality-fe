<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Followup Problem Record EPKD</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card p-2">
          <div class="d-flex justify-content-between">
            <CInputGroup>
              <CInputGroupText>Month</CInputGroupText>
              <CFormInput type="month" v-model="filter.date" />
            </CInputGroup>
            <CInputGroup>
              <CInputGroupText>Line</CInputGroupText>
              <CFormSelect v-model="filter.line_id">
                <option selected value="null">All</option>
                <option v-for="line in linesOpts" :key="line.id" :value="line.id">{{ line.label }}</option>
              </CFormSelect>
            </CInputGroup>
            <CInputGroup>
              <CInputGroupText>Shift</CInputGroupText>
              <CFormSelect v-model="filter.shift_id">
                <option selected value="null">All</option>
                <option v-for="shift in shiftsOpts" :key="shift.id" :value="shift.id">{{ shift.label }}</option>
              </CFormSelect>
            </CInputGroup>
            <CInputGroup>
              <CInputGroupText>Category</CInputGroupText>
              <CFormSelect v-model="filter.category_id">
                <option selected value="null">All</option>
                <option v-for="category in categoriesOpts" :key="category.id" :value="category.id">{{ category.label }}
                </option>
              </CFormSelect>
            </CInputGroup>
            <CInputGroup>
              <CInputGroupText>PIC</CInputGroupText>
              <CFormSelect v-model="filter.department_id">
                <option selected value="null">All</option>
                <option v-for="department in departementsOpts" :key="department.id" :value="department.id">{{
                  department.label }}
                </option>
              </CFormSelect>
            </CInputGroup>
            <CInputGroup>
              <CInputGroupText>Status</CInputGroupText>
              <CFormSelect v-model="filter.status_id">
                <option selected value="null">All</option>
                <option v-for="status in statusesOpts" :key="status.id" :value="status.id">{{ status.label }}
                </option>
              </CFormSelect>
            </CInputGroup>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <!-- NEW FEATURE -->
      <!-- <div class="col-12 col-md-12 col-lg-12">
        <AbnormalityLegend :label="'Total Summary Problem (Yearly)'" :legends="legendWeekly" />
        <div class="card">
          <AbnormalityGraph :groupBy="'yearly'" :yearMonth="filter.date" @emit-legend="getLegendWeekly" />
        </div>
      </div> -->
      <div class="col-12 col-md-6 col-lg-7">
        <AbnormalityLegend :label="'Total Summary Problem (Weekly)'" :legends="legendWeekly" />
        <div class="card">
          <AbnormalityGraph :filter="filter" :groupBy="'overall'" :yearMonth="filter.date"
            @emit-legend="getLegendWeekly" />
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-5">
        <AbnormalityLegend :label="'Follow by Supporting'" :legends="legendDepartment" />
        <div class="card">
          <AbnormalityGraph :filter="filter" :groupBy="'department'" :yearMonth="filter.date"
            @emit-legend="getLegendDepartment" />
        </div>
      </div>
    </div>

    <div class="row mt-2 mb-3">
      <div class="col-12 col-lg-4">
        <AbnormalityLegend :label="''" :legends="legendShop" />
        <div class="d-flex">
          <div class="card shadow-none w-50 align-items-center justify-content-center">
            <h3 class="my-auto px-1">Red Tag</h3>
          </div>
          <div class="card shadow-none w-100 h-100 ml-1 p-0">
            <AbnormalityGraph :filter="filter" :groupBy="'shop'" :yearMonth="filter.date" @emit-legend="getLegendShop"
              :categoryId="1" />
          </div>
        </div>
        <div class="d-flex">
          <div class="card shadow-none mt-1 w-50 align-items-center justify-content-center">
            <h3 class="my-auto px-1">Quality 80%</h3>
          </div>
          <div class="card shadow-none mt-1 w-100 h-100 ml-1 p-0">
            <AbnormalityGraph :filter="filter" :groupBy="'shop'" :yearMonth="filter.date" @emit-legend="getLegendShop"
              :categoryId="2" />
          </div>
        </div>
        <div class="d-flex">
          <div class="card shadow-none mt-1 w-50 align-items-center justify-content-center">
            <h3 class="my-auto px-1">Temuan Mgt</h3>
          </div>
          <div class="card shadow-none mt-1 w-100 h-100 ml-1 p-0">
            <AbnormalityGraph :filter="filter" :groupBy="'shop'" :yearMonth="filter.date" @emit-legend="getLegendShop"
              :categoryId="3" />
          </div>
        </div>
        <div class="d-flex">
          <div class="card shadow-none mt-1 w-50 align-items-center justify-content-center">
            <h3 class="my-auto px-1">Ergonomic & Difficulty Job</h3>
          </div>
          <div class="card shadow-none mt-1 w-100 h-100 ml-1 p-0">
            <AbnormalityGraph :filter="filter" :groupBy="'shop'" :yearMonth="filter.date" @emit-legend="getLegendShop"
              :categoryId="4" />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-8">
        <AbnormalityLegend :label="'Detail Problem'" />
        <div class="card overflow-auto">
          <AbnormalityTable :filter="filter" @emit-delete="triggerUpdateGraph" :yearMonth="filter.date" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import AbnormalityGraph from '@/components/AbnormalityGraph.vue';
import AbnormalityTable from '@/components/AbnormalityTable.vue';
import AbnormalityLegend from '@/components/AbnormalityLegend.vue';
import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
    return {
      filter: {
        date: moment().format('YYYY-MM'),
        line_id: null,
        shift_id: null,
        category_id: null,
        status_id: null,
        department_id: null
      },
      data: {
        title: 'Grafik'
      },
      legendWeekly: [],
      legendDepartment: [],
      legendShop: [],
      linesOpts: [],
      shiftsOpts: [],
      categoriesOpts: [],
      statusesOpts: [],
      departementsOpts: []
    }
  },
  methods: {
    getLegendWeekly(data) {
      this.legendWeekly = data
    },
    getLegendDepartment(data) {
      this.legendDepartment = data
    },
    getLegendShop(data) {
      this.legendShop = data
    },
    triggerUpdateGraph() {
      this.filter.date = moment().format('YYYY-MM')
    },
    async dataMap(payload, key = 'name') {
      return payload.map(item => {
        return { id: item.id, label: item[key] };
      })
    },
    async getLines() {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API_URL}/lines/get`);
        let dataMap = await this.dataMap(data.data);

        this.linesOpts = dataMap
      } catch (error) {
        console.log(error);
        this.$swal('Error', 'Error on fetch lines', 'error')
      }
    },
    async getShifts() {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API_URL}/shifts/get`);
        let dataMap = await this.dataMap(data.data);

        this.shiftsOpts = dataMap
      } catch (error) {
        console.log(error);

        this.$swal('Error', 'Error on fetch shifts', 'error')
      }
    },
    async getCategories() {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API_URL}/categories/get`);
        let dataMap = await this.dataMap(data.data);

        this.categoriesOpts = dataMap
      } catch (error) {
        console.log(error);

        this.$swal('Error', 'Error on fetch shifts', 'error')
      }
    },
    async getStatuses() {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API_URL}/statuses/get`);
        let dataMap = await this.dataMap(data.data);

        this.statusesOpts = dataMap
      } catch (error) {
        this.$swal('Error', 'Error on fetch shifts', 'error')
      }
    },
    async getDepartments() {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API_URL}/departments/get`);
        let dataMap = await this.dataMap(data.data);

        this.departementsOpts = dataMap
      } catch (error) {
        this.$swal('Error', 'Error on fetch shifts', 'error')
      }
    },
  },
  components: {
    AbnormalityGraph,
    AbnormalityTable,
    AbnormalityLegend
  },
  mounted() {
    this.getLines()
    this.getShifts()
    this.getCategories()
    this.getStatuses()
    this.getDepartments()
  }
}
</script>
<style></style>
