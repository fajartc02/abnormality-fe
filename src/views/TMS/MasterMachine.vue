<template>
  <div class="modal" tabindex="-1" id="modalAddMachine">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Machine</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="machineName" class="form-label">Machine Name</label>
              <input
                type="text"
                class="form-control"
                id="machineName"
                v-model="machineName"
              />
            </div>
            <div class="mb-3">
              <label for="maker" class="form-label">Maker</label>
              <input
                type="text"
                class="form-control"
                id="maker"
                v-model="maker"
              />
            </div>
            <div class="mb-3">
              <label for="machineDescription" class="form-label">OP NO</label>
              <input
                type="text"
                class="form-control"
                id="machineDescription"
                v-model="opNo"
              />
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="addMachineTMS()"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" tabindex="-1" id="modalEditMachineTMS">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Machine</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="machineName" class="form-label">Machine Name</label>
              <input
                type="text"
                class="form-control"
                id="machineName"
                v-model="editedMachine.machine_nm"
              />
            </div>
            <div class="mb-3">
              <label for="cell" class="form-label">Maker</label>
              <input
                type="text"
                class="form-control"
                id="cell"
                v-model="editedMachine.maker"
              />
            </div>
            <div class="mb-3">
              <label for="maker" class="form-label">OP NO</label>
              <input
                type="text"
                class="form-control"
                id="maker"
                v-model="editedMachine.op_no"
              />
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="saveEditMachine()"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" tabindex="-1" id="modalDeleteMachineTMS">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Machine</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this machine?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="ActiondeleteMachineTMS()"
            data-bs-dismiss="modal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="card p-2 mb-2">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="text-center m-0">Master Machine</h4>
        <CButton
          type="button"
          color="secondary"
          variant="outline"
          data-bs-toggle="modal"
          data-bs-target="#modalAddMachine"
          >Add Machine
        </CButton>
      </div>
    </div>

    <div class="card mt-2">
      <div class="card-body">
        <table
          style="text-align: center"
          class="table table-bordered table-striped"
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Machine Name</th>
              <th>Maker</th>
              <th>OP NO</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(machines, machine_id) in GET_MACHINES"
              :key="machine_id"
            >
              <td>{{ machines.no }}</td>
              <td>{{ machines.machine_nm }}</td>
              <td>{{ machines.maker }}</td>
              <td>{{ machines.op_no }}</td>
              <td>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditMachineTMS"
                  class="btn btn-primary"
                  @click="editMachineTMS(machines)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#modalDeleteMachineTMS"
                  class="btn btn-danger ms-2"
                  @click="deleteMachineTMS(machines)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer">
          <div class="d-flex justify-content-between">
            <div>
              <label class="m-0">Show</label>
              <select class="form-select" v-model="meta.itemsPerPage">
                <option
                  v-for="itemsPerPage in [10, 25, 50, 100]"
                  :key="itemsPerPage"
                  :value="itemsPerPage"
                >
                  {{ itemsPerPage }}
                </option>
              </select>
            </div>
            <div>
              <label class="m-0">Page</label>
              <PaginationMaster
                :currentPage="meta.currentPage"
                :totalData="meta.totalData"
                :itemsPerPage="meta.itemsPerPage"
                @page-changed="handlePageChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ACTION_ADD_MACHINES,
  ACTION_EDIT_MACHINES,
  ACTION_MACHINES,
  GET_MACHINES,
} from '@/store/TMS/MACHINES.module'
import { GET_META } from '@/store/TMS/META.module'
import { mapGetters } from 'vuex'
import PaginationMaster from '@/components/TMS/Pagination/PaginationMaster.vue'
export default {
  name: 'MasterMachine',
  components: {
    PaginationMaster,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      machineName: '',
      maker: '',
      opNo: '',
      editedMachine: {
        machine_nm: '',
        machine_maker: '',
        machine_desc: '',
      },
      deletedMachine: '',
      meta: {
        totalData: 0,
        currentPage: 1,
        itemsPerPage: 10,
        totalPages: 1,
      },
    }
  },
  mounted() {
    this.$store.dispatch(ACTION_MACHINES, { meta: this.meta })
  },
  computed: {
    ...mapGetters([GET_MACHINES, GET_META]),
  },

  watch: {
    GET_META: function () {
      this.meta = this.GET_META
    },
    'meta.itemsPerPage': function () {
      this.$store.dispatch(ACTION_MACHINES, { meta: this.meta })
    },
  },

  methods: {
    handlePageChange(page) {
      this.meta.currentPage = page
      this.$store.dispatch(ACTION_MACHINES, { meta: this.meta })
    },
    addMachineTMS() {
      try {
        const payload = {
          machine_nm: this.machineName,
          line_nm: this.cell,
          machine_maker: this.maker,
          machine_desc: this.machineDescription,
        }
        console.log(payload)
        this.$store.dispatch(ACTION_ADD_MACHINES, payload)
      } catch (error) {
        console.log(error)
      }
    },

    editMachineTMS(machine) {
      this.editedMachine = machine
      console.log(this.editedMachine)
    },

    saveEditMachine() {
      try {
        console.log(this.editedMachine)
        this.$store.dispatch(ACTION_EDIT_MACHINES, this.editedMachine)
      } catch (error) {
        console.log(error)
      }
    },
    deleteMachineTMS(dataMachine) {
      this.deletedMachine = dataMachine.machine_id
      console.log('machine_id on deleteMachineTMS', this.deletedMachine)
    },

    ActiondeleteMachineTMS() {
      try {
        console.log('machine_id on ActiondeleteMachineTMS', this.deletedMachine)
        this.$store.dispatch('ActionDeleteMachineTMS', this.deletedMachine)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
