<!-- src/dev/TestChartsContainer.vue -->
<template>
    <div class="test-container">
        <h1>Charts Testing Dashboard</h1>
        
        <div class="tab-controls">
            <button 
                v-for="(tab, index) in tabs" 
                :key="index"
                @click="currentTab = tab.id"
                :class="{ 'active-tab': currentTab === tab.id }"
                class="tab-button"
            >
                {{ tab.name }}
            </button>
        </div>
        
        <div class="tab-content">
            <div v-if="currentTab === 'all'" class="all-charts-view">
                <div class="chart-component">
                    <TestBarChart />
                </div>
                
                <div class="chart-component">
                    <TestScatterChart />
                </div>

                <!-- Add new components here -->
            </div>
        
            <div v-else-if="currentTab === 'bar'" class="single-chart-view">
                <TestBarChart />
            </div>
            
            <div v-else-if="currentTab === 'scatter'" class="single-chart-view">
                <TestScatterChart />
            </div>

            <!-- Add new component tabs here -->

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TestBarChart from './TestBarChart.vue'
import TestScatterChart from './TestScatterChart.vue'

// Tab configuration
const tabs = [
{ id: 'all', name: 'All Charts' },
{ id: 'bar', name: 'Bar Chart' },
{ id: 'scatter', name: 'Scatter Chart' }
// Add new components here
]

const currentTab = ref('all')

</script>

<style scoped>
.test-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

h2 {
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
    margin-top: 20px;
    margin-bottom: 15px;
}

.global-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.tab-controls {
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
}

.tab-button {
    padding: 10px 20px;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;
}

.tab-button:hover {
    background-color: #f5f5f5;
}

.active-tab {
    border-bottom: 3px solid #4CAF50;
    font-weight: bold;
}

.tab-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chart-component {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
}

.chart-component:last-child {
    margin-bottom: 0;
}

</style>