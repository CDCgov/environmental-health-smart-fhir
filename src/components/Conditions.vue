<template>

  <div class="container accordion">
    <h1 class="title is-4 toggle">Conditions</h1>
      <a class="button is-small button--toggle" @click="toggleView">{{toggleLabel}}</a>
      <div class="field field--asthma">
        <input id="showOnlyAsthma" type="checkbox" name="showOnlyAsthma" class="switch is-small" @click="toggleAsthma" v-model="onlyAsthma">
        <label for="showOnlyAsthma">Show only asthma related conditions</label>
      </div>
      <!-- TILES -->
      <div v-show="view === 'tiles'" class="columns is-multiline">
        <condition-tile
          v-for="condition in sortedConditions"
          :key="condition.id"
          :condition="condition">
        </condition-tile>        
      </div>
      <!-- TIMELINE -->
      <div v-show="view === 'timeline'" class="timeline">
        <div v-for="(condition, key) in sortedConditions" :key="condition.id">

          <header v-if="key==0" class="timeline-header">
            <span class="tag is-medium is-primary">{{condition.onsetDateTime | getYear}}</span>
          </header>

          <header v-if="key > 0 && yearChange(key)" class="timeline-header">
            <span class="tag is-primary">{{condition.onsetDateTime | getYear}}</span>
          </header>

          <timeline-item :condition="condition"></timeline-item>
          
          <header v-if="key==sortedConditions.length - 1" class="timeline-header">
            <span class="tag is-medium is-primary">First record</span>
          </header>
      </div>
    </div>
  </div>
</template>


<script>
import moment from 'moment';

import ConditionTile from './ConditionTile';
import TimelineItem from './TimelineItem';

export default {
  props: {
    conditions: {
      type: Array
    }
  },
  data() {
    return {
      view: 'tiles',
      onlyAsthma: false
    };
  },
  computed: {
    sortedConditions() {
      let conditions = this.conditions;
      if (this.onlyAsthma) {
        conditions = this.conditions.filter(c => /asthma/i.test(c.code.text));
      }
      // slice: return a shallow copy before sorting, sort is in-place algorithm
      return conditions.slice().sort((a, b) => {
        var dateA = new Date(a.onsetDateTime);
        var dateB = new Date(b.onsetDateTime);
        return dateB - dateA;
      });
    },
    toggleLabel() {
      if (this.view === 'tiles') {
        return 'Show as Timeline';
      }
      return 'Show as Tiles';
    }
  },
  filters: {
    getYear(date) {
      return moment(date).format('YYYY');
    }
  },
  methods: {
    yearChange(key) {
      if (key === 0 || key === this.conditions.length - 1) {
        return false;
      }
      const dateA = new Date(this.sortedConditions[key].onsetDateTime);
      const dateB = new Date(this.sortedConditions[key - 1].onsetDateTime);
      if (dateA.getFullYear() !== dateB.getFullYear()) {
        return true;
      }
      return false;
    },

    toggleView() {
      if (this.view === 'tiles') {
        this.view = 'timeline';
      } else {
        this.view = 'tiles';
      }
    },
    toggleAsthma() {
      this.onlyAsthma = !this.onlyAsthma;
    }
  },
  components: {
    ConditionTile,
    TimelineItem
  }
};
</script>

<style>
.button--toggle {
  margin-top: -1.25rem;
}

.field--asthma {
  align-self: inline;
}
</style>
