<template>
  <div class="container">
    <h2>Input Problem</h2>
    <div class="row">
      <div class="col-12">
        <InputComp :fieldsInput="fieldsInput" :isEmit="false" @emit-input="onSubmitInput" :isEdit="isEdit"
          @emit-input-edit="onSubmitInputEdit" />
      </div>
    </div>
  </div>
</template>
<script>
import InputComp from '@/components/DinamicForm/InputComp.vue'
import InputModel from '@/components/DinamicForm/InputModel';
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'InputProblem',
  data() {
    return {
      fieldsInput: [
        InputModel('Problem Date', 'date', 'Select Date', moment().format('YYYY-MM-DD'), null, 6, false)
      ],
      isEdit: false,
      detailProblem: null
    }
  },

  methods: {
    async getLines() {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API_URL}/lines/get`);
        let dataMap = await this.dataMap(data.data);

        this.fieldsInput.push(InputModel('Line', 'option', 'Select Line', this.detailProblem?.line_id || null, dataMap, 6, false))
        this.fieldsInput.push(InputModel('Problem Loc', 'text', 'Machine / op', this.detailProblem?.problem_loc || null, null, 6, false))
      } catch (error) {
        console.log(error);

        this.$swal('Error', 'Error on fetch lines', 'error')
      }
    },
    async getShifts() {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API_URL}/shifts/get`);
        let dataMap = await this.dataMap(data.data);
        this.fieldsInput.push(InputModel('Shift', 'option', 'Select Shift', this.detailProblem?.shift_id || null, dataMap, 6, false))
      } catch (error) {
        console.log(error);

        this.$swal('Error', 'Error on fetch shifts', 'error')
      }
    },
    async getCategories() {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API_URL}/categories/get`);
        let dataMap = await this.dataMap(data.data);
        this.fieldsInput.push(InputModel('Category', 'option', 'Select Category', this.detailProblem?.category_id || null, dataMap, 6, false))
      } catch (error) {
        console.log(error);

        this.$swal('Error', 'Error on fetch shifts', 'error')
      }
    },
    async getDepartments() {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API_URL}/departments/get`);
        let dataMap = await this.dataMap(data.data);
        this.fieldsInput.push(InputModel('pic', 'option', 'Select PIC', this.detailProblem?.department_id || null, dataMap, 6, false))
      } catch (error) {
        this.$swal('Error', 'Error on fetch shifts', 'error')
      }
    },
    async getStatuses() {
      try {
        let { data } = await axios.get(`${process.env.VUE_APP_API_URL}/statuses/get`);
        let dataMap = await this.dataMap(data.data);
        this.fieldsInput.push(InputModel('Status', 'option', 'Select Status', this.detailProblem?.status_id || '1', dataMap, 6, this.detailProblem?.status_id || false))
        // this.fieldsInput.push(InputModel('Ilustration', 'file', 'Select Ilustration', this.detailProblem?.ilustration || '', dataMap, 6, this.detailProblem?.ilustration || false))
      } catch (error) {
        this.$swal('Error', 'Error on fetch shifts', 'error')
      }
    },
    async dataMap(payload, key = 'name') {
      console.log('payload', payload);
      return payload.map(item => {
        return { id: item.id, label: item[key] };
      })
    },
    async getProblemById(id) {
      try {
        const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/problems/get/${id}`);
        console.log(data.data, ': problem detail')

        this.detailProblem = data.data
      } catch (error) {
        this.$swal('Error', 'Error on fetch problem details', 'error')
      }
    },
    async onSubmitInput(payload) {
      try {
        console.log(payload)
        let obj = {
          problem_date: moment(payload.problem_date).format('YYYY-MM-DD'),
          countermeasure_date: moment(payload.countermeasure_date).format('YYYY-MM-DD'),
          problem_desc: payload.problem,
          line_id: payload.line,
          shift_id: payload.shift,
          department_id: payload.pic,
          status_id: 1,
          category_id: payload.category,
          countermeasure: payload.countermeasure,
          status_id: payload.status,
          problem_loc: payload.problem_loc
        }
        console.log(obj)

        await axios.post(`${process.env.VUE_APP_API_URL}/problems/add`, obj);
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: 'Success to submit input',
          timer: 2000,
          showConfirmButton: false
        })
        this.$router.push('/')
      } catch (error) {
        this.$swal('Error', 'Error on submit input', 'error')
      }
    },
    async onSubmitInputEdit(payload) {
      try {


        let obj = {
          problem_date: moment(payload.problem_date).format('YYYY-MM-DD'),
          countermeasure_date: moment(payload.countermeasure_date).format('YYYY-MM-DD'),
          problem_desc: payload.problem,
          line_id: payload.line,
          shift_id: payload.shift,
          department_id: payload.pic,
          category_id: payload.category,
          countermeasure: payload.countermeasure,
          status_id: payload.status,
          problem_loc: payload.problem_loc
        }

        console.log(obj);

        await axios.put(`${process.env.VUE_APP_API_URL}/problems/edit/${this.$route.query.problem_id}`, obj);
        this.$swal('Success', 'Success to edit problem', 'success')
        this.$router.push('/')
      } catch (error) {
        this.$swal('Error', 'Error to edit problem', 'error')
      }
    }
  },
  components: {
    InputComp
  },
  async mounted() {
    if (this.$route.query.problem_id) {
      this.isEdit = true
      await this.getProblemById(this.$route.query.problem_id)
    }
    await this.getLines();
    await this.getShifts();
    await this.getCategories();
    const findIndexProblemDate = this.fieldsInput.findIndex(item => item.title === 'Problem Date');
    console.log(findIndexProblemDate, ': findIndexProblemDate');
    this.fieldsInput[findIndexProblemDate] = InputModel('Problem Date', 'date', 'Select Date', moment(this.detailProblem?.problem_date).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'), null, 6, false)

    this.fieldsInput.push(InputModel('Problem', 'textarea', 'Input Problem', this.detailProblem?.problem_desc || null, null, 6, false))
    this.fieldsInput.push(InputModel('Countermeasure', 'textarea', 'Input Countermeasure', this.detailProblem?.countermeasure || null, null, 6, false))
    this.fieldsInput.push(InputModel('Countermeasure Date', 'date', 'Select Date', moment(this.detailProblem?.countermeasure_date).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'), null, 6, false))
    await this.getDepartments()
    await this.getStatuses()
  }
}
</script>
<style></style>
