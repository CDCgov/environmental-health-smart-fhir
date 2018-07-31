<template>
  <div class="column is-one-quarter">
    <div class="tile">
      <article class="tile notification" :class="classObject">
        <div class="content">
          <p class="title">{{condition.code.text}}</p>
          <p class="subtitle">{{condition.onsetDateTime}}</p>
          <small>{{condition.clinicalStatus}}, {{condition.verificationStatus}}</small>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    condition: {
      type: Object
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

<style>
</style>
