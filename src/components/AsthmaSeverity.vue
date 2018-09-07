<template>
  <div v-if="this.age <= 4">
    <asthma-severity-four></asthma-severity-four>
  </div>
  <div v-else-if="this.age <= 11">
    <asthma-severity-eleven></asthma-severity-eleven>
  </div>
  <div v-else>
    <asthma-severity-adult></asthma-severity-adult>
  </div>
</template>

<script>
import moment from 'moment';
import AsthmaSeverityFour from './AsthmaSeverityFour';
import AsthmaSeverityEleven from './AsthmaSeverityEleven';
import AsthmaSeverityAdult from './AsthmaSeverityAdult';

export default {
  name: 'asthma-severity',
  components: {
    AsthmaSeverityFour,
    AsthmaSeverityEleven,
    AsthmaSeverityAdult
  },
  props: {
    patient: {
      type: Object
    }
  },
  computed: {
    age() {
      return moment().diff(this.patient.birthDate, 'years');
    }
  }
};
</script>

<style>
</style>
