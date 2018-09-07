<template>
  <div class="container">
    <form-wizard
      title="Classification of Asthma Severity"
      subtitle="Children 0 - 4 years of age"
      @on-complete="showModal"
    >
      <!-- SYMPTOMS -->
      <tab-content title="Symptoms">
        <div class="control">
          <label class="radio" for="symptomsIntermittent">
            <input type="radio" id="symptomsIntermittent" value="1" v-model.number="symptoms">
            ≤2 days/week
          </label>
        </div>
        <div class="control">
          <label class="radio" for="symptomsMild">
            <input type="radio" id="symptomsMild" value="2" v-model.number="symptoms">
            >2 days/week but not daily
          </label>
        </div>
        <div class="control">
          <label class="radio" for="symptomsModerate">
            <input type="radio" id="symptomsModerate" value="3" v-model.number="symptoms">
            Daily
          </label>
        </div>
        <div class="control">
          <label class="radio" for="symptomsSevere">
            <input type="radio" id="symptomsSevere" value="4" v-model.number="symptoms">
            Throughout the day
          </label>
        </div>
      </tab-content>

      <!-- NIGHTTIME AWAKENINGS -->
      <tab-content title="Nighttime awakenings">
        <div class="control">
          <label class="radio" for="awakeningsIntermittent">
            <input type="radio" id="awakeningsIntermittent" value="1" v-model.number="awakenings">
            0
          </label>
        </div>
        <div class="control">
          <label class="radio" for="awakeningsMild">
            <input type="radio" id="awakeningsMild" value="2" v-model.number="awakenings">
            1-2x/month
          </label>
        </div>
        <div class="control">
          <label class="radio" for="awakeningsModerate">
            <input type="radio" id="awakeningsModerate" value="3" v-model.number="awakenings">
            3-4x/month
          </label>
        </div>
        <div class="control">
          <label class="radio" for="awakeningsSevere">
            <input type="radio" id="awakeningsSevere" value="4" v-model.number="awakenings">
            >1x/week
          </label>
        </div>
      </tab-content>

      <tab-content title="Short-acting beta2-agonist use for symptom control (not prevention of EIB)">
        <div class="control">
          <label class="radio" for="beta2agonistIntermittent">
            <input type="radio" id="beta2agonistIntermittent" value="1" v-model.number="beta2agonist">
            ≤2 days/week
          </label>
        </div>
        <div class="control">
          <label class="radio" for="beta2agonistMild">
            <input type="radio" id="beta2agonistMild" value="2" v-model.number="beta2agonist">
            >2 days/week but not daily
          </label>
        </div>
        <div class="control">
          <label class="radio" for="beta2agonistModerate">
            <input type="radio" id="beta2agonistModerate" value="3" v-model.number="beta2agonist">
            Daily
          </label>
        </div>
        <div class="control">
          <label class="radio" for="beta2agonistSevere">
            <input type="radio" id="beta2agonistSevere" value="4" v-model.number="beta2agonist">
            Several times per day
          </label>
        </div>
      </tab-content>

      <tab-content title="Interference with normal activity">
        <div class="control">
          <label class="radio" for="interferenceIntermittent">
            <input type="radio" id="interferenceIntermittent" value="1" v-model.number="interference">
            None
          </label>
        </div>
        <div class="control">
          <label class="radio" for="interferenceMild">
            <input type="radio" id="interferenceMild" value="2" v-model.number="interference">
            Minor limitation
          </label>
        </div>
        <div class="control">
          <label class="radio" for="interferenceModerate">
            <input type="radio" id="interferenceModerate" value="3" v-model.number="interference">
            Some limitation
          </label>
        </div>
        <div class="control">
          <label class="radio" for="interferenceSevere">
            <input type="radio" id="interferenceSevere" value="4" v-model.number="interference">
            Extremely limited
          </label>
        </div>
      </tab-content>      

      <tab-content title="Exacerbations requiring oral systemic corticosteroids">
        <div class="control">
          <label class="radio" for="exacerbationsIntermittent">
            <input type="radio" id="exacerbationsIntermittent" value="1" v-model.number="exacerbations">
            0-1/year
          </label>
        </div>
        <div class="control">
          <label class="radio" for="exacerbationsMild">
            <input type="radio" id="exacerbationsMild" value="2" v-model.number="exacerbations">
            ≥2 exacerbations in 6 months requiring oral steroids, or ≥4 wheezing episodes/1 year
            lasting > day AND risk factors for persistent asthma
          </label>
        </div>
      </tab-content>
    </form-wizard>

    <modal
      :isActive="isModalVisible"
      @close="hideModal"
    >
      <article class="tile notification">
      <div class="content">
        <p class="title">{{severity}}</p>
        <p class="subtitle">Asthma Severity</p>
      </div>
    </article>
    </modal>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

import Modal from './Modal';

export default {
  name: 'asthma-severity-four',
  components: {
    FormWizard,
    TabContent,
    Modal
  },
  data() {
    return {
      symptoms: 0,
      awakenings: 0,
      beta2agonist: 0,
      interference: 0,
      exacerbations: 0,
      isModalVisible: false
    };
  },
  computed: {
    severityCategory() {
      const highestSeverity = Math.max(
        this.symptoms,
        this.awakenings,
        this.beta2agonist,
        this.interference,
        this.exacerbations
      );
      if (highestSeverity > 1) {
        return 'Persistent';
      } else if (highestSeverity === 1) {
        return 'Intermittent';
      } else {
        return '';
      }
    },
    severityLevel() {
      // Persitent impairment define the level of severity;
      // Exacerbations (risk) has no levels for servierity, only defines intermittent/persistent
      const highestSeverity = Math.max(
        this.symptoms,
        this.awakenings,
        this.beta2agonist,
        this.interference
      );
      switch (highestSeverity) {
        case 2:
          return 'Mild';
        case 3:
          return 'Moderate';
        case 4:
          return 'Severe';
        default:
          return '';
      }
    },
    severity() {
      return this.severityLevel
        ? `${this.severityCategory} (${this.severityLevel})`
        : this.severityCategory;
    }
  },
  methods: {
    showModal: function() {
      this.isModalVisible = true;
    },
    hideModal: function() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style>
.wizard-tab-content {
  margin-left: 40px;
  margin-right: 40px;
}
</style>
