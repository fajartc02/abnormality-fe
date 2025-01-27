<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>No</th>
        <th>Tanggal</th>
        <th>Line</th>
        <th>Shift</th>
        <th>Kategori</th>
        <th>Problem</th>
        <th>Countermeasure</th>
        <th>Due Date</th>
        <th>Pic</th>
        <th>Status</th>
        <th class="text-center" colspan="3">Action</th>
      </tr>
    </thead>
    <tbody v-if="problems.length > 0">
      <tr v-for="(problem, i) in problemsMapDate" :key="i">
        <td>{{ problem.no }}</td>
        <td>{{ problem.problem_date }}</td>
        <td>{{ problem.line_nm }}</td>
        <td>{{ problem.shift_nm }}</td>
        <td>{{ problem.category_nm }}</td>
        <td>{{ problem.problem_desc }}</td>
        <td>{{ problem.countermeasure }}</td>
        <td>{{ problem.countermeasure_date }}</td>
        <td>{{ problem.department_nm }}</td>
        <td class="text-center">
          <img :src="`data:image/png;base64, ${problem.img}`" alt="Tanoko image" height="30" width="30">
        </td>
        <td>
          <button class="btn btn-success text-light btn-sm" @click="getDetailsProblem(problem.id)">
            <i class="fas fa-eye"></i>
          </button>
        </td>
        <td>
          <router-link :to="`/input-problem?problem_id=${problem.id}`" class="btn btn-warning btn-sm">Edit</router-link>
        </td>
        <td>
          <button class="btn btn-danger text-light btn-sm" @click="deleteProblem(problem.id)">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="11" class="text-center">No data</td>
      </tr>
    </tbody>
  </table>
  <!-- <AbnormalityPagination /> -->
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
    },
    async getDetailsProblem(problemId) {
      try {
        alert('Under development :)')
      } catch (error) {

      }
    },
    async deleteProblem(id) {
      try {
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
          .then(async (result) => {
            if (result.isConfirmed) {
              await axios.delete(`${process.env.VUE_APP_API_URL}/problems/delete/${id}`);
              this.getProblemData();
              this.$emit('emit-delete', id)
              this.$swal('Deleted!', 'Problem has been deleted.', 'success')
            }
          })
      } catch (error) {
        console.log(error);
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
