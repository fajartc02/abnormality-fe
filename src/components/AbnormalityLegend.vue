<template>
  <div class="d-flex justify-content-between align-items-center mb-1">
    <h5 class="m-0">{{ label || '' }}</h5>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex" v-if="legends.length > 0">
        <template v-for="legend in legends" :key="legend.label">
          <div class="btn p-0 mx-1 border" :style="`width: 25px;height: 15px;background-color: ${legend.color};`"></div>
          <small class="m-0">{{ legend.name }}</small>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AbnormalityLegend',
  props: {
    label: {
      type: String,
      default: () => 'label'
    },
    legends: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style></style>
