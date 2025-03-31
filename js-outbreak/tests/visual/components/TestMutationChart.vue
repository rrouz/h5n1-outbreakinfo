<template>
  <div class="test-container">
    <h1>Mutation Chart Component Test</h1>
    <div class="search-controls">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search mutations..."
        class="search-input"
      />
    </div>
    
    <div class="chart-wrapper">
      <MutationChart
        :data="filteredData"
        :columns="columns"
        :barColor="currentColor"
        initialSortKey="frequency"
        initialSortOrder="desc"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MutationChart from '../../../src/components/MutationChart.vue'
import { colorPalette } from '../../../src/utils/colorSchemes'

// Use the same orange color as in the TimeSeries component
const currentColor = colorPalette[3]; // Orange

// Define the columns for the mutation table
const columns = [
  { key: 'id', label: 'SRA', format: 'text' },
  { key: 'frequency', label: 'Frequency', format: 'decimal', class: 'numeric' }
];

// Sample mutation data
const mutationData = ref([
  { id: 'SRR28834957', mutation: 'HA:Q238R', frequency: 0.043478 },
  { id: 'SRR29455627', mutation: 'HA:Q238R', frequency: 0.020619 },
  { id: 'SRR31347721', mutation: 'HA:Q238R', frequency: 0.015748 },
  { id: 'SRR31596965', mutation: 'HA:Q238R', frequency: 0.015748 },
  { id: 'SRR28834903', mutation: 'HA:Q238R', frequency: 0.014925 },
  { id: 'SRR28834954', mutation: 'HA:Q238R', frequency: 0.014634 },
  { id: 'SRR31820865', mutation: 'HA:Q238R', frequency: 0.013513 }
]);

// Search functionality
const searchQuery = ref('');

const filteredData = computed(() => {
  if (!searchQuery.value) return mutationData.value;
  
  const query = searchQuery.value.toLowerCase();
  return mutationData.value.filter(item => 
    item.id.toLowerCase().includes(query)
  );
});

// Function to add a random row for testing
function addRandomRow() {
  const srrNumber = Math.floor(Math.random() * 99999999);
  const frequency = Math.random() * 0.05;
  
  mutationData.value.push({
    id: `SRR${srrNumber}`,
    mutation: 'HA:Q238R',
    frequency: frequency
  });
}
</script>