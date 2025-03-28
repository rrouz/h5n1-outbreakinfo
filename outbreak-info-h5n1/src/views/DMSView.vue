<template>
  <div class="dms-view">
    <h2>Prevalence and phenotype of mutations in HA at host-level</h2>
    
    <div class="controls">
      <div class="field-select">
        <label>DMS Field:</label>
        <select v-model="selectedDmsField">
          <option value="ferret sera escape">Ferret sera escape</option>
          <option value="mouse sera escape">Mouse sera escape</option>
          <option value="SA26 usage increase">SA26 receptor usage increase</option>
          <option value="entry in 293T cells">Entry in 293T cells</option>
          <option value="stability">Stability</option>
        </select>
      </div>
      
      <div class="log-scale-toggle">
        <label>
          <input type="checkbox" v-model="useLogScale">
          Use Log Scale
        </label>
      </div>
    </div>
    
    <scatter-chart
      :data="chartData"
      :x-key="'dms'"
      :y-key="'count'"
      :title-key="'key'"
      :point-color="outbreakInfoColorPalette[6]"
      :x-label="'DMS value'"
      :y-label="'Number of samples'"
      :log-scale="useLogScale"
      :tip-format-string="'Mutation: {key}\nCount: {y}\nDMS: {x}'"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { ScatterChart, outbreakInfoColorPalette } from 'outbreakInfo';
import { getIntrahostVariantDMS } from '../services/elasticsearchApi.js';

const selectedDmsField = ref('ferret sera escape');
const useLogScale = ref(true);
const chartData = ref([]);

async function loadData() {
  const response = await getIntrahostVariantDMS(selectedDmsField.value);
  
  chartData.value = response.aggregations.dms_mutation_agg.buckets.map((f) => ({
    key: f.key.ref + "" + f.key.pos + "" + f.key.alt,
    dms: f.key.dms,
    count: f.doc_count
  }));
}

onMounted(loadData);
watch(() => selectedDmsField.value, loadData);
</script>

<style scoped>
.dms-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.field-select select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
}

.log-scale-toggle {
  display: flex;
  align-items: center;
}

h2 {
  margin-bottom: 1.5rem;
}
</style>