<template>
  <div class="timeline-item" :class="classObject">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <p class="heading" >{{condition.onsetDateTime | formatDate}}</p>
      <p>{{condition.code.text}}</p>
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
  filters: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD');
    }
  },
  computed: {
    classObject() {
      // case insensitve regex
      if (/asthma/i.test(this.condition.code.text)) {
        return 'is-asthma';
      }
      return '';
    }
  }
};
</script>

<style>
.is-asthma {
  font-weight: bold;
  color: hsl(348, 100%, 61%);
}
</style>
