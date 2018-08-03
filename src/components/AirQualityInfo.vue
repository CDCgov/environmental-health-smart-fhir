<template>
  <div>
    <air-now v-if="selectedDate" :patient="patient" selecteDate="selectedDate"></air-now>
    <ozone-visualization v-else :patient="patient"></ozone-visualization>
  </div>

</template>

<script>
import OzoneVisualization from './OzoneVisualization';
import AirNow from './AirNow';

export default {
  name: 'air-quality-info',
  components: {
    AirNow,
    OzoneVisualization
  },
  props: {
    patient: {
      type: Object
    },
    selectedDate: {
      type: String
    }
  }
};
</script>
