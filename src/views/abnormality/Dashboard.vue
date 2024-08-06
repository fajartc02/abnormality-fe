<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card p-2">
          <div class="d-flex justify-content-between">
            <h2>Followup Problem Record EPKD</h2>
            <input v-model="filter.date" class="form-control" type="month" style="width: 150px;">
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-12 col-md-6 col-lg-7">
        <AbnormalityLegend :label="'Grafik Weekly Progress Problem'" :legends="legendWeekly" />
        <div class="card">
          <AbnormalityGraph :groupBy="'overall'" :yearMonth="filter.date" @emit-legend="getLegendWeekly" />
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-5">
        <AbnormalityLegend :label="'Follow by Supporting'" :legends="legendDepartment" />
        <div class="card">
          <AbnormalityGraph :groupBy="'department'" :yearMonth="filter.date" @emit-legend="getLegendDepartment" />
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
            <AbnormalityGraph :groupBy="'shop'" :yearMonth="filter.date" @emit-legend="getLegendShop" :categoryId="1" />
          </div>
        </div>
        <div class="d-flex">
          <div class="card shadow-none mt-1 w-50 align-items-center justify-content-center">
            <h3 class="my-auto px-1">Quality 80%</h3>
          </div>
          <div class="card shadow-none mt-1 w-100 h-100 ml-1 p-0">
            <AbnormalityGraph :groupBy="'shop'" :yearMonth="filter.date" @emit-legend="getLegendShop" :categoryId="2" />
          </div>
        </div>
        <div class="d-flex">
          <div class="card shadow-none mt-1 w-50 align-items-center justify-content-center">
            <h3 class="my-auto px-1">Temuan Mgt</h3>
          </div>
          <div class="card shadow-none mt-1 w-100 h-100 ml-1 p-0">
            <AbnormalityGraph :groupBy="'shop'" :yearMonth="filter.date" @emit-legend="getLegendShop" :categoryId="3" />
          </div>
        </div>
        <div class="d-flex">
          <div class="card shadow-none mt-1 w-50 align-items-center justify-content-center">
            <h3 class="my-auto px-1">Ergonomic & Difficulty Job</h3>
          </div>
          <div class="card shadow-none mt-1 w-100 h-100 ml-1 p-0">
            <AbnormalityGraph :groupBy="'shop'" :yearMonth="filter.date" @emit-legend="getLegendShop" :categoryId="4" />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-8">
        <AbnormalityLegend :label="'Detail Problem'" />
        <div class="card overflow-auto">
          <AbnormalityTable :yearMonth="filter.date" />
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

export default {
  name: 'Dashboard',
  data() {
    return {
      filter: {
        date: moment().format('YYYY-MM'),
      },
      data: {
        title: 'Grafik'
      },
      legendWeekly: [],
      legendDepartment: [],
      legendShop: []
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
    }
  },
  components: {
    AbnormalityGraph,
    AbnormalityTable,
    AbnormalityLegend
  }
}
</script>
<style></style>
