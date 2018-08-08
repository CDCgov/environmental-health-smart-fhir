<template>
  <div>
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': view === 'summary' }" @click="toggleView"><a>Air Quality Indicators (AQI)</a></li>
        <li :class="{ 'is-active': view === 'daily' }" @click="toggleView"><a>Daily AQI for Encounters</a></li>
      </ul>
    </div>
    <p-m25-visualization v-if="view === 'summary'" :patient="patient"></p-m25-visualization>
    <encounters-air-quality :encounters="encounters" v-else-if="view === 'daily'" :patient="patient" ></encounters-air-quality>
  </div>

</template>

<script>
import PM25Visualization from './PM25Visualization';
import AirNow from './AirNow';
import EncountersAirQuality from './EncountersAirQuality';

export default {
  name: 'air-quality-info',
  components: {
    AirNow,
    PM25Visualization,
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
