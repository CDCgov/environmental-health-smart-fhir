<template>
  <div>
    todo
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'air-now',
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
        const url = `http://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${
          postalCodes[0]
        }&distance=25&API_KEY=${process.env.VUE_APP_AIR_NOW_TOKEN}`;
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
