<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>No</th>
        <th>Tanggal</th>
        <th>Line</th>
        <th>Shift</th>
        <th>Kategori</th>
        <th>Finding Lokasi</th>
        <th>Problem</th>
        <th>Picture (before)</th>
        <th>Countermeasure</th>
        <th>Picture (after)</th>
        <th>Due Date</th>
        <th>Pic</th>
        <th>Priority</th>
        <th>Status</th>
        <th class="text-center" colspan="3">Action</th>
      </tr>
    </thead>
    <tbody v-if="problems.length > 0">
      <tr v-for="(problem, i) in problems" :key="i">
        <td :class="problem.status_id === 4 ? 'closed' : ''">{{ problem.no }}</td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">{{ problem.problem_date }}</td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">{{ problem.line_nm }}</td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">{{ problem.shift_nm }}</td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">{{ problem.category_nm }}</td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">{{ problem.problem_loc }}</td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">{{ problem.problem_desc }}</td>
        <td :class="problem.status_id === 4 ? 'closed text-center' : 'text-center'">
          <img v-if="problem.image" :src="problem.image" width="100" @click="getDetailsProblem(problem.image)"
            alt="img_problem" style="cursor: pointer;">
          <small v-else>-</small>
        </td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">{{ problem.countermeasure }}</td>
        <td :class="problem.status_id === 4 ? 'closed text-center' : 'text-center'">
          <img v-if="problem.image_cm" :src="problem.image_cm" width="100" @click="getDetailsProblem(problem.image_cm)"
            alt="image_cm" style="cursor: pointer;">
          <small v-else>-</small>
        </td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">{{ problem.countermeasure_date }}</td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">{{ problem.department_nm }}</td>
        <td :class="problem.status_id === 4 ? 'closed text-center' : 'text-center'">
          <i v-if="problem.is_priority" class="fas fa-check"></i>
        </td>
        <td :class="`text-center ${problem.status_id === 4 ? 'closed' : ''}`">
          <img :src="`data:image/png;base64, ${problem.img}`" alt="Tanoko image" height="30" width="30">
        </td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">
          <button class="btn btn-success text-light btn-sm" @click="getDetailsProblem(problem.image)"
            :disabled="!problem.image">
            <i class="fas fa-eye"></i>
          </button>
        </td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">
          <router-link :to="`/input-problem?problem_id=${problem.id}`" class="btn btn-warning btn-sm">Edit</router-link>
        </td>
        <td :class="problem.status_id === 4 ? 'closed' : ''">
          <button class="btn btn-danger text-light btn-sm" @click="deleteProblem(problem.id)">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="14" class="text-center">No data</td>
      </tr>
    </tbody>
  </table>

  <AbnormalityPagination @emit-pagination="(paginate) => paginateFilter = paginate" :totalPages="totalPages" />
</template>
<script>
import axios from 'axios';
import AbnormalityPagination from './AbnormalityPagination.vue'
import moment from 'moment';

export default {
  name: 'AbnormalityTable',
  data() {
    return {
      problems: [],
      totalPages: 1,
      paginateFilter: {},
      selectedImg: null,
      imageModal: false
    }
  },
  props: {
    yearMonth: {
      type: String,
      default: null
    },
    filter: {
      type: Object,
      default: null
    }
  },
  watch: {
    yearMonth() {
      this.getProblemData();
    },
    filter: {
      deep: true,
      handler() {
        this.getProblemData(this.filter);
      }
    },
    paginateFilter: {
      deep: true,
      handler() {
        this.getProblemData(this.filter);
      }
    }
  },
  methods: {
    async getProblemData(filter) {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/problems/get`, {
          params: {
            yearMonth: this.yearMonth,
            filter: {
              ...filter,
              ...this.paginateFilter
            }
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.problems = response?.data?.data?.data
        this.totalPages = response?.data?.data?.totalPages
        await this.problemsMapDate()
      } catch (error) {
        this.$swal('Error', 'Error on getting table data', 'error')
      }
    },
    problemsMapDate() {
      this.problems = this.problems.map((problem) => {
        problem.countermeasure_date = moment(problem.countermeasure_date).format('YYYY-MM-DD')
        problem.problem_date = moment(problem.problem_date).format('YYYY-MM-DD')

        return problem
      })
    },
    async getDetailsProblem(imagePath) {
      try {
        this.$emit('emit-modal', imagePath)
      } catch (error) {
        console.log(error);
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
              await axios.delete(`${process.env.VUE_APP_API_URL}/problems/delete/${id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              });
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

<style>
.closed {
  background-color: #00ff6a !important
}
</style>
