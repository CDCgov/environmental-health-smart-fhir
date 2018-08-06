<template>
  <div>
    <air-now-tile v-for="(aqi, index) in airnow" :key="index" :airQualityIndicator="aqi"></air-now-tile>
  </div>
</template>

<script>
import axios from 'axios';
import AirNowTile from './AirNowTile';

export default {
  name: 'air-now',
  components: {
    AirNowTile
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
  async mounted() {
    try {
      const postalCodes = this.patient.address
        .map(p => p.postalCode)
        .filter(p => p && p.length === 5);
      if (postalCodes.length > 0) {
        // workaround: airnowapi hasen't enabled CORS, use cors-anywhere proxy
        const url = `https://cors-anywhere.herokuapp.com/http://www.airnowapi.org/aq/observation/zipCode/historical/?format=application/json&zipCode=${
          postalCodes[0]
        }&distance=25&date=2018-08-01T00-0000&API_KEY=${
          process.env.VUE_APP_AIR_NOW_TOKEN
        }`;
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
      } else {
        this.error = 'Patient has no postal code';
      }
    } catch (error) {
      this.error = error.message || error;
    }
    this.loading = false;
  }
};
</script>
