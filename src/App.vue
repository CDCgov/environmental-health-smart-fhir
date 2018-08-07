<template>
  <div id="app" class="section">
    <pulse-loader v-if="loading"></pulse-loader>
    <error v-else-if="error" :error="error"></error>
    <div v-else>
      <patient-demographics :patient="patient"></patient-demographics>
      <hr>
      <conditions @set-date="setDate" :conditions="conditions"></conditions>
      <air-quality-info :patient="patient" :encounters="encounters"></air-quality-info>
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
import AirQualityInfo from './components/AirQualityInfo';
import Error from './components/Error';

export default {
  name: 'app',
  components: {
    PatientDemographics,
    Conditions,
    PulseLoader,
    AirQualityInfo,
    Error
  },
  data() {
    return {
      patient: null,
      conditions: null,
      encounters: null,
      selectedDate: null,
      loading: true,
      error: null
    };
  },
  methods: {
    setDate(date) {
      this.selectedDate = date;
    }
  },
  async mounted() {
    try {
      const smart = await smartClient();
      this.patient = await smart.patient.read();
      this.conditions = await smart.patient.api.fetchAll({ type: 'Condition' });
      this.encounters = await smart.patient.api.fetchAll({ type: 'Encounter' });
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
