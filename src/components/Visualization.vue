<template>
  <svg id="viz" width="700" height="700" />
</template>

<script>
import ephtrackingViz from 'ephtracking-viz';

export default {
  name: 'visualization',
  async mounted() {
    // const options = {
    //   type: 'bubble',
    //   title: 'Smoking and COPD',
    //   data: {
    //     x: {
    //       measureId: '561',
    //       label: 'Percent of current adult smokers'
    //     },
    //     y: {
    //       measureId: '648',
    //       label: 'Crude rate of hospitalizations for COPD among persons 25 and over per 10,000 population'
    //     },
    //     temporal: '2011-2014'
    //   }
    // }

    const options = {
        type: 'line-chart',
        data: {
          measureId: '293',
          temporal: '2001-2018',
          stratificationLevelId: '2',
          geographicTypeIdFilter: '2',
          geographicItemsFilter: ['13089'],
          isSmoothed: '0'
        }
      };

    ephtrackingViz.createVisualization('#viz', options);
  }
}
</script>

<style>
</style>