<template>
  <div class="column is-one-quarter">
    <div class="tile">
      <article class="tile notification" :class="classObject" @click="showAirQuality(condition)">
        <div class="content">
          <p class="title">{{condition.code.text}}</p>
          <p class="subtitle">{{condition.onsetDateTime | formatDate}}</p>
          <small>{{condition.clinicalStatus}}, {{condition.verificationStatus}}</small>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    condition: {
      type: Object
    }
  },
  methods: {
    showAirQuality(condition) {
      if (/asthma/i.test(condition.code.text)) {
        this.$emit('set-date', condition.onsetDateTime);
      }
    }
  },
  filters: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD');
    }
  },
  computed: {
    classObject() {
      // case insensitve regex
      if (/asthma/i.test(this.condition.code.text)) {
        return 'is-danger';
      } else {
        return 'is-warning';
      }
    }
  }
};
</script>
