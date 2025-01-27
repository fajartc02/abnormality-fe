<template>
  <div class="card p-2" style="z-index: 1;font-size: 20px;">
    <CRow v-if="fieldsInput.length > 0" class="align-items-start">
      <CCol class="mt-1" v-for="(field, i) in fieldsInput" :key="i" :md="field.size ? field.size : 3" sm="12">
        <template v-if="field.type !== 'option' && field.type !== 'treeselect' && field.type !== 'textarea'">
          <CFormInput size="lg" v-model="field.value" :type="field.type" :label="field.title"
            :placeholder="field.placeholder" :disabled="field.disabled" />
        </template>
        <template v-else>
          <CFormTextarea size="lg" v-if="field.type === 'textarea'" v-model="field.value" :label="field.title"
            :placeholder="field.placeholder" :disabled="field.disabled">
          </CFormTextarea>
          <CFormSelect size="lg" v-model="field.value" v-else-if="field.type === 'option'" :label="field.title">
            <option selected value=null>{{ field.placeholder }}</option>
            <option v-for="option in field.options" :key="option" :value="option.id">{{ option.label }}</option>
          </CFormSelect>
          <div v-else-if="field.type === 'treeselect'">
            <label class="form-label">{{ field.title }}</label>
            <Treeselect size="lg" v-model="field.value" :options="field.options" :clearable="true" />
          </div>
          <!-- <div v-else-if="field.type === 'button'" class="d-flex justify-content-between">
            <button v-for="btn in field.options" :key="btn" class="btn btn-primary" @click="emitInput(field, btn)"></button>
          </div> -->
        </template>
      </CCol>
    </CRow>
    <CRow class="mt-3">
      <CCol class="d-flex justify-content-evenly" md="6" sm="12">
        <CButton class="w-100" v-if="!isEdit" color="success" @click="$emit('emit-input', form)">Submit</CButton>
        <CButton class="w-100" v-else color="primary" @click="$emit('emit-input-edit', form)">Update</CButton>
      </CCol>
      <CCol class="d-flex justify-content-evenly" md="6" sm="12">
        <CButton class="w-100" color="warning" @click="$router.push('/')">Cancel</CButton>
      </CCol>
    </CRow>
  </div>
</template>
<script>

import FN_CASE_CONVERTER from '@/functions/FN_CASE_CONVERTER';
import Treeselect from '@zanmato/vue3-treeselect'
import "@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css";
import moment from 'moment';

export default {
  name: 'InputComp',
  data() {
    return {
      form: {}
    }
  },
  watch: {
    fieldsInput: {
      deep: true,
      handler: function () {
        if (this.fieldsInput.length > 0) {
          for (let i = 0; i < this.fieldsInput.length; i++) {
            const isValidDate = moment(this.fieldsInput[i].value, 'YYYY-MM-DD', true).isValid();
            if (isValidDate) {
              this.form[FN_CASE_CONVERTER.toSnakeCase(this.fieldsInput[i].title.replace(/\s/g, ""))] = moment(this.fieldsInput[i].value).format('YYYY-MM-DD')
            } else {
              this.form[FN_CASE_CONVERTER.toSnakeCase(this.fieldsInput[i].title.replace(/\s/g, ""))] = this.fieldsInput[i].value
            }
          }
          if (this.isEmit) this.$emit('emit-input', this.form)
        }
      }
    }
  },
  props: {
    fieldsInput: {
      type: Array,
      default: () => [
        {
          title: 'Start Date',
          type: 'date',
          placeholder: 'input date',
          value: moment().format('YYYY-MM-DD'),
          size: 3,
          disabled: false
        },
        {
          title: 'End Date',
          type: 'date',
          placeholder: 'input date',
          value: moment().format('YYYY-MM-DD'),
          size: null,
          disabled: false
        },
        {
          title: 'Textarea',
          type: 'textarea',
          placeholder: 'input text area',
          value: '',
          size: null,
          disabled: false
        },
        {
          title: 'Line',
          type: 'option',
          placeholder: 'Select Option',
          value: null,
          options: [
            {
              id: 1,
              label: 'Line 1',
            },
            {
              id: 2,
              label: 'Line 2',
            }
          ],
          size: null,
          disabled: false
        },
        {
          title: 'Sample Code',
          type: 'treeselect',
          placeholder: 'choose your sample Code',
          value: null,
          options: [
            {
              id: 1,
              label: 'Code 1',
            },
            {
              id: 2,
              label: 'Code 2',
            }
          ],
          size: 6,
          disabled: false
        },
      ]
    },
    isEmit: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Treeselect
  }
}
</script>
<style>
.vue3-treeselect__control {
  height: 33.2px;
}
</style>
