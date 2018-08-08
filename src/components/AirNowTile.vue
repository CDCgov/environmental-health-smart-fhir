<template>
  <div class="column is-one-quarter">
    <div class="tile">
      <article class="tile notification" :class="classObject">
        <div class="content">
          <p class="title">{{airQualityIndicator.ParameterName}}</p>
          <p class="subtitle">{{airQualityIndicator.Category.Name}} ({{airQualityIndicator.AQI}})</p>
          <a :href="`https://www.openstreetmap.org/?mlat=${airQualityIndicator.Latitude}&mlon=${airQualityIndicator.Longitude}`" target="_blank">
            Reporting area: {{airQualityIndicator.ReportingArea}}, {{airQualityIndicator.StateCode}}
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'air-now-tile',
  props: {
    airQualityIndicator: {
      type: Object
    }
  },
  computed: {
    classObject() {
      switch (this.airQualityIndicator.Category.Number) {
        case 1:
          return 'is-success';
        case 2:
          return 'is-info';
        case 3:
          return 'is-link';
        case 4:
          return 'is-primary';
        case 5:
          return 'is-warning';
        case 6:
          return 'is-danger';
        default:
          return '';
      }
    }
  }
};
</script>
