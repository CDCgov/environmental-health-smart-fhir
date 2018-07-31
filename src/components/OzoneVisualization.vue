<template>
  <div class="container">
    <h1 class="title is-5">Number of person-days with maximum 8-hour average ozone concentration over the National Ambient Air Quality Standard</h1>
    <h2 class="subtitle is-6">FIPS based on patient's postal code</h2>
    <div class="div--center">
      <svg id="viz" width="1000" height="500" />
    </div>
  </div>
</template>

<script>
import ephtrackingViz from 'ephtracking-viz';
import axios from 'axios';

export default {
  name: 'ozone-visualization',
  props: {
    patient: {
      type: Object
    }
  },
  data() {
    return {
      counties: null,
      error: null
    };
  },
  async mounted() {
    try {
      const response = await axios.get(
        `https://ephtracking.cdc.gov/DataExplorer/iblzipcounties/${
          this.patient.address[0].postalCode
        }`
      );
      if (response.status === 200) {
        this.counties = response.data.counties;
        const options = {
          type: 'line-chart',
          data: {
            measureId: '293',
            temporal: '2001-2018',
            stratificationLevelId: '2',
            geographicTypeIdFilter: '2',
            geographicItemsFilter: this.counties.map(c => c.countyFips),
            isSmoothed: '0'
          }
        };
        ephtrackingViz.createVisualization('#viz', options);
      }
    } catch (error) {
      this.error = error;
    }
  }
};
</script>

<style>
.div--center {
  text-align: center;
}
</style>
