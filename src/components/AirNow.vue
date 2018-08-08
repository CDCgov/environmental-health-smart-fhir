<template>
  <div class="div--airnow">
    <pulse-loader v-if="loading"></pulse-loader>
    <p v-else-if="airnow.length === 0">no historic air quality data available for patient's zip code and selected date</p>
    <air-now-tile v-else v-for="(aqi, index) in airnow" :key="index" :airQualityIndicator="aqi"></air-now-tile>
  </div>
</template>

<script>
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

import AirNowTile from './AirNowTile';

export default {
  name: 'air-now',
  components: {
    AirNowTile,
    PulseLoader
  },
  props: {
    patient: {
      type: Object
    },
    selectedDate: {
      type: String
    }
  },
  data() {
    return {
      loading: true,
      error: null,
      airnow: null
    };
  },
  mounted() {
    this.$_fetchAirQualityData();
  },
  watch: {
    selectedDate(newDate, oldDate) {
      if (newDate !== oldDate) {
        this.selectedDate = newDate;
        this.$_fetchAirQualityData();
      }
    }
  },
  methods: {
    async $_fetchAirQualityData() {
      if (this.selectedDate) {
        const postalCodes = this.patient.address
          .map(p => p.postalCode)
          .filter(p => p && p.length === 5);
        if (postalCodes.length > 0) {
          // workaround: airnowapi hasen't enabled CORS, use cors-anywhere proxy
          const url = `https://cors-anywhere.herokuapp.com/http://www.airnowapi.org/aq/observation/zipCode/historical/?format=application/json&zipCode=${
            postalCodes[0]
          }&distance=25&date=${this.selectedDate}T00-0000&API_KEY=${
            process.env.VUE_APP_AIR_NOW_TOKEN
          }`;
          try {
            const response = await axios.get(url, {
              proxy: {
                port: 80
              }
            });
            if (response.status === 200) {
              this.airnow = response.data;
            } else {
              this.error = response.status;
            }
          } catch (error) {
            this.error = error.message || error;
          }
        } else {
          this.error = 'Patient has no postal code';
        }
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.div--airnow {
  margin-top: 1rem;
}
</style>
