<template>
    <div class="test-prevalence-chart">
        <h1>Prevalence Chart Test</h1>
        <PrevalenceChart :demixedData="testData" />
    </div>
</template>

<script setup lang="ts">
import PrevalenceChart from '../../../src/components/PrevalenceChart.vue'

// Sample test data
const testData = [
    {
        lineages: ['lineage1', 'lineage2', 'lineage3'],
        abundances: [0.6, 0.3, 0.1]
    },
    {
        lineages: ['lineage1', 'lineage2', 'lineage4'],
        abundances: [0.7, 0.2, 0.1]
    },
    {
        lineages: ['lineage2', 'lineage3', 'lineage4'],
        abundances: [0.5, 0.3, 0.2]
    },
    {
        lineages: ['lineage1', 'lineage3', 'lineage4'],
        abundances: [0.4, 0.4, 0.2]
    }
]
</script>

<style scoped>
.test-prevalence-chart {
    padding: 20px;
}
</style> 