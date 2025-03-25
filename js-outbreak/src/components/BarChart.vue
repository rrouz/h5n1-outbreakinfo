<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as Plot from '@observablehq/plot';

const props = defineProps({
  data: { type: Array, required: true },
  horizontal: { type: Boolean, default: true },
  height: { type: Number, default: 500 },
  width: { type: Number, default: 800 },
  marginLeft: { type: Number, default: 50 },
  marginBottom: { type: Number, default: 50 },
  barColor: { type: String, default: '#4682B4' },
  xLabel: { type: String, default: 'value' },
  yLabel: { type: String, default: 'key' }
});

const chartContainer = ref(null);

function renderChart() {
  if (!props.data || props.data.length === 0 || !chartContainer.value) return;

  chartContainer.value.innerHTML = '';

  // Sort data by value
  const data = [...props.data].sort((a, b) => b.value - a.value);

  // Create chart
  const chart = props.horizontal
    ? Plot.plot({
        marginLeft: props.marginLeft,
        marginBottom: props.marginBottom,
        height: props.height,
        width: props.width,
        y: {label: props.yLabel},
        x: {label: props.xLabel, grid: true},
        marks: [
          Plot.barX(data, {y: "key", x: "value", fill: props.barColor, sort: {y: "-x"}}),
          Plot.ruleX([0])
        ]
      })
    : Plot.plot({
        marginBottom: props.marginBottom,
        marginLeft: props.marginLeft,
        height: props.height,
        width: props.width,
        x: {tickRotate: 45, label: props.xLabel},
        y: {grid: true, label: props.yLabel},
        marks: [
          Plot.barY(data, {x: "key", y: "value", fill: props.barColor, sort: {x: "-y"}}),
          Plot.ruleY([0])
        ]
      });

  chartContainer.value.appendChild(chart);
}

onMounted(renderChart);
watch(() => props.data, renderChart, { deep: true });
watch(() => props.barColor, renderChart);
watch(() => props.horizontal, renderChart);

onBeforeUnmount(() => {
  if (chartContainer.value) {
    chartContainer.value.innerHTML = '';
  }
});
</script>