<template>
  <div class="test-container">
    <h1>ScatterChart Component Test</h1>
    <div>
      <h2>Basic Scatter Plot</h2>
      <ScatterChart
        :data="chartData"
        :width="width"
        :height="height"
        pointColor="currentColor"
        xKey="valueX"
        yKey="valueY"
        xLabel="valueX"
        yLabel="valueY"
      />
    </div>
    
    <div>
      <h2>Scatter Plot with Log Scale</h2>
      <ScatterChart
        :data="chartData"
        :width="width"
        :height="height"
        xKey="valueX"
        yKey="valueY"
        xLabel="valueX"
        yLabel="valueY (log scale)"
        :logScale="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScatterChart from '../../../src/components/ScatterChart.vue'
import { colorPalette } from '../../../src/utils/colorSchemes'

const width = ref(800)
const height = ref(400)
const currentColor = colorPalette[10];

const chartData = ref([
  {"valueX": 10, "valueY": 15},
  {"valueX": 12, "valueY": 7},
  {"valueX": 4, "valueY": 12},
  {"valueX": 7, "valueY": 9},
  {"valueX": 8, "valueY": 18},
  {"valueX": 13, "valueY": 3},
  {"valueX": 2, "valueY": 14},
  {"valueX": 1, "valueY": 5},
  {"valueX": 0, "valueY": 11},
  {"valueX": 17, "valueY": 2},
  {"valueX": 15, "valueY": 17},
  {"valueX": 14.5, "valueY": 8},
  {"valueX": 16.8, "valueY": 19},
  {"valueX": 22, "valueY": 6},
  {"valueX": 10.2, "valueY": 13},
  {"valueX": 13, "valueY": 1},
  {"valueX": 14.5, "valueY": 16},
  {"valueX": 19, "valueY": 4},
  {"valueX": 7.5, "valueY": 10},
  {"valueX": 6, "valueY": 20}
])

</script>