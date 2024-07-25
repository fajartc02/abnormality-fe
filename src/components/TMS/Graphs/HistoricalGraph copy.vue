<template>
  <div id="chart">
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts'
export default {
  name: "HistoricalGraph",
  data() {
    return {
      series: [{
        name: "Actual",
        data: [250, 250, 250, 250, 241, 239, 242, 242]
      }, {
        name: "Standard",
        data: [250, 250, 250, 250, 250, 250, 250, 250]
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Tool Counter Status',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['REGR#1', 'REGR#2', 'REGR#3', 'REGR#4', 'REGR#5', 'REGR#6', 'REGR#7', 'REGR#8'],
        }
      },
    }
  },
  components: {
    apexchart: VueApexCharts
  }
}
</script>
<style></style>
