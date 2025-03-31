<template>
  <div class="container mx-auto px-4 flex flex-col items-center">
    <h2 class="my-4">H5N1 Lineage Prevalence</h2>
    <div class="w-full max-w-screen-xl">
      <div>
        <PrevalenceChart 
          v-if="demixedData.length > 0"
          :demixed-data="demixedData"
          :height="500"
          :width="1000"
          :marginLeft="150"
          :marginBottom="50"
          :boxColor="outbreakInfoColorPalette.primary"
        />
        <div v-else class="text-center">
          Loading data...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PrevalenceChart, outbreakInfoColorPalette } from 'outbreakInfo'
import { getAllDemixed } from '../services/elasticsearchApi'

const demixedData = ref([])

async function fetchData() {
  try {
    const response = await getAllDemixed()
    if (response.hits && response.hits.hits) {
      demixedData.value = response.hits.hits.map(hit => ({
        lineages: hit._source.lineages || [],
        abundances: hit._source.abundances || []
      }))
    }
  } catch (error) {
    console.error('Error fetching demixed data:', error)
  }
}

onMounted(fetchData)
</script>

<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 