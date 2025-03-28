<template>
  <div class="release-date-view">
    <h1>Samples by Release Date</h1>
    
    <div v-if="isLoading">Loading data...</div>
    <div v-else-if="error">{{ error }}</div>
    
    <TimeSeriesChart
      v-else
      :data="chartData"
      :dateKey="'key'"
      :valueKey="'value'"
      :height="500"
      xLabel="Release Date"
      yLabel="Count"
      :lineColor="outbreakInfoColorPalette[3]"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TimeSeriesChart, outbreakInfoColorPalette } from 'outbreakInfo';
import { getSampleReleaseDate } from '../services/postgresApi.js';

const chartData = ref([]);
const isLoading = ref(false);
const error = ref(null);

async function loadData() {
  isLoading.value = true;
  error.value = null;
  
  try {
    const rawData = await getSampleReleaseDate();
    
    // Group the data by day to smooth the chart
    const groupedByDay = {};
    
    rawData.forEach(item => {
      // Extract just the date part (YYYY-MM-DD)
      const dateObj = new Date(item.key);
      const dateKey = dateObj.toISOString().split('T')[0];
      
      if (!groupedByDay[dateKey]) {
        groupedByDay[dateKey] = 0;
      }
      groupedByDay[dateKey] += item.value;
    });
    
    // Convert back to array format
    chartData.value = Object.entries(groupedByDay).map(([key, value]) => ({
      key: new Date(key),
      value: value
    })).sort((a, b) => a.key - b.key);
    
  } catch (err) {
    console.error('Error loading release date data:', err);
    error.value = 'Failed to load data. Please try again later.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadData);
</script>

<style scoped>
.release-date-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}
</style>