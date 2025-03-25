<template>
  <div class="host-view">
    <h1>Samples by Host Distribution</h1>
    <BarChart
      :data="chartData"
      :horizontal="horizontal"
      :height="500"
      :marginLeft="180"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {BarChart} from 'outbreakInfo';
import { getHostDistribution } from '../services/postgresApi.js';

const displayLimit = ref(20);
const horizontal = ref(true);
const chartData = ref([]);

async function loadData() {
  chartData.value = await getHostDistribution(displayLimit.value);
}

onMounted(loadData);
</script>

<style scoped>
.isolation-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>