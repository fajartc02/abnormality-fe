<template>
  <div id="chart">
    <apexchart type="bar" height="100%" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts'
export default {
  name: 'AbnormalityGraph',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: 'bar',
          stacked: true
        },
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [],
        },
      },
    }
  },
  props: {
    yearMonth: {
      type: String,
      default: '2022-01'
    },
    groupBy: {
      type: String,
      default: 'shop' // shop, department, overall
    },
    categoryId: {
      type: Number,
      default: null
    },
    filter: {
      type: Object,
    }
  },
  watch: {
    yearMonth() {
      this.getGraphData();
    },
    filter: {
      deep: true,
      handler() {
        console.log(this.filter)
        this.getGraphData(this.filter);
      }
    }
  },
  methods: {
    async getGraphData(filter) {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/problems/graph`, {
          params: {
            yearMonth: this.yearMonth,
            groupBy: this.groupBy,
            categoryId: this.categoryId,
            filter
          }
        })
        this.resetupChart(response.data.data.series, response.data.data);
      } catch (error) {
        this.$swal('Error', 'Error on getting graph data', 'error')
      }
    },
    resetupChart(series, { categories, colors, legends, stacked }) {
      this.series = series
      this.$emit('emit-legend', legends)
      this.chartOptions = {
        chart: {
          type: 'bar',
          stacked: stacked
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#333']
          },
        },
        legend: {
          show: false,
        },
        colors: colors,
        xaxis: {
          categories: categories,

        },
      }
    }
  },
  mounted() {
    this.getGraphData();
  }
}
</script>
<style>
.color-0 {
  color: #ff0000;
}
</style>
