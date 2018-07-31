<template>
  <div id="app" class="section">
    <pulse-loader v-if="loading"></pulse-loader>
    <error v-else-if="error" :error="error"></error>
    <div v-else>
      <patient-demographics :patient="patient"></patient-demographics>
      <hr>
      <conditions :conditions="conditions"></conditions>
      <hr>
      <ozone-visualization :patient="patient"></ozone-visualization>
    </div>
  </div>
</template>

<script>
import 'bulma/css/bulma.css';
import 'bulma-timeline';
import 'bulma-switch';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import smartClient from './smartClient';

import PatientDemographics from './components/PatientDemographics';
import Conditions from './components/Conditions';
import OzoneVisualization from './components/OzoneVisualization';
import Error from './components/Error';

export default {
  name: 'app',
  components: {
    PatientDemographics,
    Conditions,
    PulseLoader,
    OzoneVisualization,
    Error
  },
  data() {
    return {
      patient: null,
      conditions: null,
      loading: true,
      error: null
    };
  },
  async mounted() {
    try {
      const smart = await smartClient();
      this.patient = await smart.patient.read();
      this.conditions = await smart.patient.api.fetchAll({ type: 'Condition' });
    } catch (resp) {
      this.error = resp.error || resp;
    }
    this.loading = false;
  }
};
</script>

<style>
.tile .title {
  font-size: 18px;
}

.tile .subtitle {
  font-size: 16px;
}

.tile p.subtitle {
  margin-bottom: 8px;
}
</style>
