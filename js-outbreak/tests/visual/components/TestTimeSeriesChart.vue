<template>
  <div class="test-container">
    <h1>TimeSeries Component Test</h1>
      <TimeSeriesChart
        :data="chartData"
        valueKey="val"
        :lineColor="currentColor"
      />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { colorPalette } from '../../../src/utils/colorSchemes'
import TimeSeriesChart from "../../../src/components/TimeSeriesChart.vue";

const width = ref(800)
const height = ref(400)
const currentColor = colorPalette[3];

const chartData = ref([
  { key: "2023-01-01", val: 42 },
  { key: "2023-01-15", val: 56 },
  { key: "2023-02-01", val: 48 },
  { key: "2023-02-15", val: 65 },
  { key: "2023-03-01", val: 72 },
  { key: "2023-03-15", val: 63 },
  { key: "2023-04-01", val: 80 },
  { key: "2023-04-15", val: 95 },
  { key: "2023-05-01", val: 88 },
  { key: "2023-05-15", val: 105 },
  { key: "2023-06-01", val: 112 },
  { key: "2023-06-15", val: 98 },
  { key: "2023-07-01", val: 120 },
  { key: "2023-07-15", val: 135 },
  { key: "2023-08-01", val: 128 },
  { key: "2023-08-15", val: 145 },
  { key: "2023-09-01", val: 152 },
  { key: "2023-09-15", val: 143 },
  { key: "2023-10-01", val: 163 },
  { key: "2023-10-15", val: 175 }
]);

</script>