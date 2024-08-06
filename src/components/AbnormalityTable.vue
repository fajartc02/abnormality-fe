<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>No</th>
        <th>Tanggal</th>
        <th>Line</th>
        <th>Shift</th>
        <th>Kategori</th>
        <th>Countermeasure</th>
        <th>Problem</th>
        <th>Due Date</th>
        <th>Pic</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody v-if="problems.length > 0">
      <tr v-for="(problem, i) in problemsMapDate" :key="i">
        <td>{{ problem.no }}</td>
        <td>{{ problem.problem_date }}</td>
        <td>{{ problem.line_nm }}</td>
        <td>{{ problem.shift_nm }}</td>
        <td>{{ problem.category_nm }}</td>
        <td>{{ problem.countermeasure }}</td>
        <td>{{ problem.problem_desc }}</td>
        <td>{{ problem.countermeasure_date }}</td>
        <td>{{ problem.department_nm }}</td>
        <td class="text-center">
          <img :src="`data:image/png;base64, ${problem.img}`" alt="Tanoko image" height="30" width="30">
        </td>
        <td>
          <router-link :to="`/input-problem?problem_id=${problem.id}`" class="btn btn-primary btn-sm">Edit</router-link>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="11" class="text-center">No data</td>
      </tr>
    </tbody>
  </table>
  <AbnormalityPagination />
</template>
<script>
import axios from 'axios';
import AbnormalityPagination from './AbnormalityPagination.vue'
import moment from 'moment';
export default {
  name: 'AbnormalityTable',
  data() {
    return {
      problems: []
    }
  },
  props: {
    yearMonth: {
      type: String,
      default: null
    },
  },
  computed: {
    problemsMapDate() {
      return this.problems.map((problem) => {
        problem.countermeasure_date = moment(problem.countermeasure_date).format('YYYY-MM-DD')
        problem.problem_date = moment(problem.problem_date).format('YYYY-MM-DD')

        return problem
      })
    }
  },
  watch: {
    yearMonth() {
      this.getProblemData();
    }
  },
  methods: {
    async getProblemData() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/problems/get`, {
          params: {
            yearMonth: this.yearMonth
          }
        })
        this.problems = response.data.data
      } catch (error) {
        console.log(error);

        this.$swal('Error', 'Error on getting table data', 'error')
      }
    }
  },
  components: {
    AbnormalityPagination
  },
  mounted() {
    this.getProblemData();
  }
}
</script>
