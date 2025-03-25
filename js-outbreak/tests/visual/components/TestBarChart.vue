<!-- src/dev/TestBarChart.vue -->
<template>
  <div class="test-container">
    <h1>BarChart Component Test</h1>
    Horizontal
    <BarChart
        :data="chartData"
        :width="width"
        :height="height"
        :barColor="currentColor"
    />

    Vertical
    <BarChart
        :data="chartData"
        :width="width"
        :height="height"
        :barColor="currentColor"
        :horizontal="false"
        xLabel="key"
        yLabel="value"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BarChart from '../../../src/components/BarChart.vue'

const width = ref(800)
const height = ref(400)
const currentColor = ref('#333333')

const chartData = ref([
  {"key": "A", "value": 15},
  {"key": "B", "value": 7},
  {"key": "C", "value": 12},
  {"key": "D", "value": 9},
  {"key": "E", "value": 18},
  {"key": "F", "value": 3},
  {"key": "G", "value": 14},
  {"key": "H", "value": 5},
  {"key": "I", "value": 11},
  {"key": "J", "value": 2},
  {"key": "K", "value": 17},
  {"key": "L", "value": 8},
  {"key": "M", "value": 19},
  {"key": "N", "value": 6},
  {"key": "O", "value": 13},
  {"key": "P", "value": 1},
  {"key": "Q", "value": 16},
  {"key": "R", "value": 4},
  {"key": "S", "value": 10},
  {"key": "T", "value": 20}
])

const randomizeData = () => {
  chartData.value = chartData.value.map(item => ({
    key: item.key,
    value: Math.floor(Math.random() * 20) + 1
  }))
}

</script>