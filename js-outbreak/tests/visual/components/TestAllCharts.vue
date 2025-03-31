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

                <div class="chart-component">
                  <TestTimeSeriesChart />
                </div>

                <div class="chart-component">
                  <TestMutationChart />
                </div>

                <div class="chart-component">
                  <TestPrevalenceChart />
                </div>

                <!-- Add new components here -->
                
            </div>
        
            <div v-else-if="currentTab === 'bar'" class="single-chart-view">
                <TestBarChart />
            </div>
            
            <div v-else-if="currentTab === 'scatter'" class="single-chart-view">
                <TestScatterChart />
            </div>

            <div v-else-if="currentTab === 'time-series'" class="single-chart-view">
                <TestTimeSeriesChart />
            </div>

            <div v-else-if="currentTab === 'mutation'" class="single-chart-view">
                <TestMutationChart />
            </div>

            <div v-else-if="currentTab === 'prevalence'" class="single-chart-view">
                <TestPrevalenceChart />
            </div>

            <!-- Add new component tabs here -->

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TestBarChart from './TestBarChart.vue'
import TestScatterChart from './TestScatterChart.vue'
import TestTimeSeriesChart from "./TestTimeSeriesChart.vue";
import TestMutationChart from './TestMutationChart.vue';
import TestPrevalenceChart from './TestPrevalenceChart.vue'

// Tab configuration
const tabs = [
{ id: 'all', name: 'All Charts' },
{ id: 'bar', name: 'Bar Chart' },
{ id: 'scatter', name: 'Scatter Chart' },
{ id: 'time-series', name: 'Times Series Chart' },
{ id: 'mutation', name: 'Mutation Chart' },
{ id: 'prevalence', name: 'Prevalence Chart' }
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