<template>
  <div class="collection-date-view">
    <h1>Collection End Date Distribution</h1>
    
    <div v-if="isLoading">Loading data...</div>
    <div v-else-if="error">{{ error }}</div>
    
    <TimeSeriesChart
      v-else
      :data="chartData"
      :dateKey="'key'"
      :valueKey="'value'"
      :height="500"
      xLabel="Collection End Date"
      yLabel="Count"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TimeSeriesChart } from 'outbreakInfo';
import { getSamplesByCollectionEndDate } from '../services/postgresApi.js';

const chartData = ref([]);
const isLoading = ref(false);
const error = ref(null);

async function loadData() {
  isLoading.value = true;
  error.value = null;
  
  try {
    chartData.value = await getSamplesByCollectionEndDate();
  } catch (err) {
    console.error('Error loading collection end date data:', err);
    error.value = 'Failed to load data. Please try again later.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadData);
</script>

<style scoped>
.collection-date-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}
</style>