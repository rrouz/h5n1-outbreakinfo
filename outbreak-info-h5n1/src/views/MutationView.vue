<template>
    <div class="mutation-view">
      <h1>Search for samples with a given mutation</h1>
      
      <div class="search-container">
        <div class="input-group">
          <input 
            type="text" 
            v-model="aaQuery" 
            placeholder="HA:Q238R"
            class="form-control"
            @keyup.enter="searchMutation"
          />
          <button class="btn btn-primary" @click="searchMutation">Submit</button>
        </div>
      </div>
      
      <div v-if="isLoading" class="loading-message">
        Loading data...
      </div>
      
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-else-if="mutationResults.length > 0" class="results-container">
        <MutationChart
          :data="mutationResults"
          :columns="tableColumns"
          :frequencyKey="'frequency'"
          :barColor="chartColor"
          initialSortKey="frequency"
          initialSortOrder="desc"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { MutationChart, outbreakInfoColorPalette } from 'outbreakInfo';
  import { getMutationFrequency } from '../services/postgresApi.js';
  
  const chartColor = outbreakInfoColorPalette[3]; 
  
  const aaQuery = ref('HA:Q238R');
  const ntQuery = ref('');
  const isLoading = ref(false);
  const error = ref(null);
  const mutationResults = ref([]);

  const tableColumns = [
    { key: 'sra_id', label: 'SRA', format: 'text' },
    { key: 'frequency', label: 'Frequency', format: 'decimal', class: 'numeric' },
  ];
  
  async function searchMutation() {
    if (!aaQuery.value.trim()) return;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      // Call the Postgres API with amino acid query
      const results = await getMutationFrequency(aaQuery.value, ntQuery.value);
      
      mutationResults.value = results;
      
      if (mutationResults.value.length === 0) {
        error.value = `No results found for "${aaQuery.value}"`;
      }
      
    } catch (err) {
      console.error('Error searching mutation:', err);
      error.value = err.message || 'Failed to search for mutation. Please try again.';
      mutationResults.value = [];
    } finally {
      isLoading.value = false;
    }
  }
  
  onMounted(searchMutation);
  </script>
  
  <style scoped>
  .mutation-view {
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .search-container {
    margin: 1.5rem 0;
  }
  
  .input-group {
    display: flex;
    gap: 0.5rem;
  }
  
  .form-control {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex-grow: 1;
  }
  
  .btn-primary {
    background-color: var(--primary-color, #2c3e50);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .loading-message, .error-message {
    margin: 2rem 0;
    padding: 1rem;
    text-align: center;
  }
  
  .error-message {
    color: #dc3545;
    background-color: #f8d7da;
    border-radius: 4px;
  }
  
  .results-container {
    margin-top: 1.5rem;
  }
  </style>