<template>
  <div>
    <encounters :encounters="encounters" @date-selected="selectedDate=$event"></encounters>
    <air-now v-if="selectedDate" :patient="patient" :selectedDate="selectedDate"></air-now>
  </div>
</template>

<script>
import AirNow from './AirNow';
import Encounters from './Encounters';

export default {
  name: 'encounters-air-quality',
  components: {
    AirNow,
    Encounters
  },
  props: {
    patient: {
      type: Object
    },
    encounters: {
      type: Array
    }
  },
  data() {
    return {
      selectedDate: null
    };
  }
};
</script>
