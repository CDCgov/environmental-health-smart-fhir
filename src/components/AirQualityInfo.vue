<template>
  <div>
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': view === 'summary' }" @click="toggleView"><a>Air Quality Indicators (AQI)</a></li>
        <li :class="{ 'is-active': view === 'daily' }" @click="toggleView"><a>Daily AQI for Encounters</a></li>
      </ul>
    </div>
    <ozone-visualization v-if="view === 'summary'" :patient="patient"></ozone-visualization>
    <encounters-air-quality :encounters="encounters" v-else-if="view === 'daily'" :patient="patient" ></encounters-air-quality>
  </div>

</template>

<script>
import OzoneVisualization from './OzoneVisualization';
import AirNow from './AirNow';
import EncountersAirQuality from './EncountersAirQuality';

export default {
  name: 'air-quality-info',
  components: {
    AirNow,
    OzoneVisualization,
    EncountersAirQuality
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
      view: 'summary' // or daily
    };
  },
  methods: {
    toggleView() {
      this.view = this.view === 'summary' ? 'daily' : 'summary';
    }
  }
};
</script>
