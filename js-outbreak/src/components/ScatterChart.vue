<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as Plot from '@observablehq/plot';

const props = defineProps({
  data: { type: Array, required: true },
  xKey: { type: String, default: 'x' },
  yKey: { type: String, default: 'y' },
  pointColor: { type: String, default: 'indianred' },
  height: { type: Number, default: 500 },
  width: { type: Number, default: 800 },
  marginLeft: { type: Number, default: 50 },
  marginBottom: { type: Number, default: 50 },
  xLabel: { type: String, default: 'valueX' },
  yLabel: { type: String, default: 'valueY' },
  xGrid: { type: Boolean, default: true },
  yGrid: { type: Boolean, default: true },
  logScale: { type: Boolean, default: false },
  tipFormatString: { type: String, default: '' }
});

const chartContainer = ref(null);

function getTipFormat(d) {
  if (props.tipFormatString) {
    return props.tipFormatString
      .replace('{x}', d[props.xKey])
      .replace('{y}', d[props.yKey]);
  }
  return `${props.xKey}: ${d[props.xKey]}\n${props.yKey}: ${d[props.yKey]}`;
}

function renderChart() {
  if (!props.data || props.data.length === 0 || !chartContainer.value) return;

  chartContainer.value.innerHTML = '';
  
  const xConfig = {
    label: props.xLabel,
    grid: props.xGrid
  };
  
  const yConfig = {
    label: props.yLabel,
    grid: props.yGrid
  };
  
  if (props.logScale) {
    yConfig.type = 'log';
  }
  
  // Create chart
  const chart = Plot.plot({
    marginLeft: props.marginLeft,
    marginBottom: props.marginBottom,
    height: props.height,
    width: props.width,
    x: xConfig,
    y: yConfig,
    marks: [
      Plot.ruleY([(props.logScale) ? 1 : 0]),
      Plot.ruleX([0]),
      Plot.dot(props.data, { 
        x: props.xKey,
        y: props.yKey,
        fill: props.pointColor
      }),
      Plot.tip(props.data, Plot.pointer({
        x: props.xKey,
        y: props.yKey,
        title: getTipFormat
      }))
    ]
  });
  
  chartContainer.value.appendChild(chart);
}

onMounted(renderChart);
watch(() => props.data, renderChart, { deep: true });
watch(() => props.logScale, renderChart);
watch(() => props.xKey, renderChart);
watch(() => props.yKey, renderChart);

onBeforeUnmount(() => {
  if (chartContainer.value) {
    chartContainer.value.innerHTML = '';
  }
});
</script>