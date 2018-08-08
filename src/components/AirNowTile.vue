<template>
  <div class="column is-one-quarter">
    <div class="tile">
      <article class="tile notification">
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
  }
};
</script>
