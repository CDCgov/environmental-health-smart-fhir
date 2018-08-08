<template>
  <div class="center">
    <v-select
      :options="selectOptions"
      @input="$emit('date-selected', $event && $event.value)"
      placeholder="Select encounter to see historic Air Quality Data">
    </v-select>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import moment from 'moment';

export default {
  name: 'encounters',
  components: {
    vSelect
  },
  props: {
    encounters: {
      type: Array
    }
  },
  computed: {
    selectOptions() {
      // format encounters for vue-select ({ label, value })
      return this.encounters.map(e => {
        const startDate =
          e.period &&
          e.period.start &&
          moment(e.period.start).format('YYYY-MM-DD');
        if (!startDate) {
          return null;
        }
        const value = startDate;
        // generate label:
        let label = startDate;
        if (e.period.end && e.period.end !== e.period.start) {
          const endDate = moment(e.period.end).format('YYYY-MM-DD');
          if (endDate === startDate) {
            const startTime = moment(e.period.start).format('hh:mm a');
            const endTime = moment(e.period.end).format('hh:mm a');
            label += ` ${startTime} - ${endTime}`;
            //time
          } else {
            // start and end on different dates
            label += ` - ${endDate}`;
          }
        }
        if (e.class) {
          label += `; ${e.class}`;
        }
        if (e.type && e.type[0].text) {
          label += `; ${e.type[0].text}`;
        }
        if (e.reason && e.reason[0].text) {
          label += `; ${e.reason[0].text}`;
        }
        return { label, value };
      });
    }
  }
};
</script>

<style>
.center {
  text-align: center;
}
.v-select,
.dropdown-toggle {
  width: 800px;
}
</style>
