<template>
  <div class="d-flex justify-content-between align-items-start">
    <CInputGroup style="width: 150px;height: 50%;">
      <CInputGroupText>
        Limit
      </CInputGroupText>
      <select class="form-select" v-model="filter.pageSize" @change="changesPagination">
        <option v-for="limit in pageSizeOpts" :key="limit" :value="limit">{{ limit }}</option>
      </select>
    </CInputGroup>
    <CInputGroup style="width: 150px;height: 50%;">
      <CInputGroupText>
        Page
      </CInputGroupText>
      <select class="form-select" v-model="filter.page" @change="changesPagination">
        <option v-for="page in totalPagesOpts" :key="page" :value="page">{{ page }}</option>
      </select>
    </CInputGroup>
  </div>


</template>

<script>
export default {
  data() {
    return {
      filter: {
        pageSize: 5,
        page: 1
      },
      pageSizeOpts: [5, 20, 50, 'All'],
      totalPagesOpts: 1
    }
  },
  watch: {
    totalPages: function () {
      this.totalPagesOpts = this.totalPages
    }
  },
  props: {
    totalData: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPages: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  methods: {
    changesPagination() {
      this.$emit('emit-pagination', this.filter)
    }
  },
  mounted() {
    this.changesPagination()
  }
}
</script>

<style scoped>
.page-item.disabled .page-link {
  pointer-events: none;
  cursor: not-allowed;
}

.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}
</style>
