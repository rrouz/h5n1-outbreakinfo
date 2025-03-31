<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { defaultColor } from '../utils/colorSchemes';
import * as Plot from '@observablehq/plot';

const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  frequencyKey: { type: String, default: 'frequency' },
  height: { type: Number, default: 500 },
  width: { type: Number, default: 800 },
  marginLeft: { type: Number, default: 50 },
  marginBottom: { type: Number, default: 50 },
  barColor: { type: String, default: defaultColor },
  xLabel: { type: String, default: 'Frequency' },
  yLabel: { type: String, default: '' },
  bins: { type: Array, default: () => [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1] },
  initialSortKey: { type: String, default: '' },
  initialSortOrder: { type: String, default: 'desc' },
  xMin: { type: Number, default: 0 },
  xMax: { type: Number, default: 1 }
});

const chartContainer = ref(null);
const sortKey = ref(props.initialSortKey);
const sortOrder = ref(props.initialSortOrder);

// Create frequency bins for histogram
function createFrequencyBins() {
  const binWidth = (props.xMax - props.xMin) / (props.bins.length - 1);
  const bins = Array.from({ length: props.bins.length }, (_, i) => props.xMin + (i * binWidth));
  const counts = Array(bins.length).fill(0);
  
  props.data.forEach(item => {
    const freq = parseFloat(item[props.frequencyKey]) || 0;
    
    for (let i = 0; i < bins.length; i++) {
      const max = i === bins.length - 1 ? props.xMax : bins[i + 1];
      if (freq >= bins[i] && freq < max) {
        counts[i]++;
        break;
      }
    }
  });
  
  return bins.map((bin, index) => {
    const nextBin = index < bins.length - 1 ? bins[index + 1] : props.xMax;
    const label = `${bin.toFixed(2)}-${nextBin.toFixed(2)}`;
    return { key: label, value: counts[index] };
  });
}

// Sort the data
function getSortedData() {
  if (!sortKey.value) return [...props.data];
  
  return [...props.data].sort((a, b) => {
    let aVal = a[sortKey.value];
    let bVal = b[sortKey.value];
    
    // Handle numeric comparison
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder.value === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    // String comparison
    aVal = String(aVal || '').toLowerCase();
    bVal = String(bVal || '').toLowerCase();
    
    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1;
    return 0;
  });
}

// Format cell values
function formatValue(value, format) {
  if (value == null) return '';
  
  switch (format) {
    case 'number': return typeof value === 'number' ? value.toLocaleString() : value;
    case 'decimal': return typeof value === 'number' ? value.toFixed(2) : value;
    case 'percent': return typeof value === 'number' ? (value * 100).toFixed(1) + '%' : value;
    default: return value;
  }
}

function sortTable(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'desc';
  }
  renderChart();
}

function renderChart() {
  if (!props.data || !props.data.length || !chartContainer.value) return;

  chartContainer.value.innerHTML = '';
  
  const frequencyData = createFrequencyBins();
  const sortedData = getSortedData();
  
  const layout = document.createElement('div');
  layout.className = 'histogram-table-layout';
  layout.style.display = 'flex';
  layout.style.width = '100%';
  
  const chartPanel = document.createElement('div');
  chartPanel.style.padding = '20px 0 0 0';
  
  // Sample count
  const sampleCount = document.createElement('div');
  sampleCount.style.padding = '0 0 10px 20px';
  sampleCount.style.fontWeight = 'bold';
  sampleCount.textContent = `${props.data.length} Sample${props.data.length !== 1 ? 's' : ''}`;
  chartPanel.appendChild(sampleCount);
  
  const barChart = Plot.plot({
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
    height: props.height * 0.8,
    width: props.width * 0.4,
    x: {
      tickRotate: 45, 
      label: props.xLabel,
      domain: [props.xMin, props.xMax],
      ticks: props.bins.length
    },
    y: {
      grid: true, 
      label: props.yLabel
    },
    marks: [
      Plot.rectY(props.data, 
        Plot.binX(
          {y: "count"},
          {
            x: d => parseFloat(d[props.frequencyKey]) || 0,
            thresholds: props.bins,
            fill: props.barColor
          }
        )
      ),
      Plot.ruleY([0])
    ]
  });
  
  chartPanel.appendChild(barChart);
  
  const tablePanel = document.createElement('div');
  tablePanel.style.flex = '1';
  tablePanel.style.padding = '20px';
  tablePanel.style.overflowX = 'auto';
  
  const table = document.createElement('table');
  table.style.width = '100%';
  
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  props.columns.forEach(column => {
    const th = document.createElement('th');
    th.style.textAlign = 'left';
    th.style.padding = '8px 16px';
    th.style.cursor = 'pointer';
    
    th.textContent = column.label;
    
    if (sortKey.value === column.key) {
      const sortIcon = sortOrder.value === 'asc' ? '↑' : '↓';
      th.textContent += ` ${sortIcon}`;
    }
    
    th.addEventListener('click', () => sortTable(column.key));
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  const tbody = document.createElement('tbody');
  
  sortedData.forEach(row => {
    const tr = document.createElement('tr');
    
    props.columns.forEach(column => {
      const td = document.createElement('td');
      td.style.padding = '8px 16px';
      
      if (column.class === 'numeric') {
        td.style.textAlign = 'right';
      }
      
      td.textContent = formatValue(row[column.key], column.format);
      tr.appendChild(td);
    });
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  tablePanel.appendChild(table);
  
  layout.appendChild(chartPanel);
  layout.appendChild(tablePanel);
  chartContainer.value.appendChild(layout);
}

onMounted(() => {
  if (props.initialSortKey) {
    sortKey.value = props.initialSortKey;
    sortOrder.value = props.initialSortOrder;
  } else if (props.columns.length > 0) {
    sortKey.value = props.columns[0].key;
  }
  
  renderChart();
});

watch(() => props.data, renderChart, { deep: true });
watch(() => props.barColor, renderChart);

onBeforeUnmount(() => {
  if (chartContainer.value) {
    chartContainer.value.innerHTML = '';
  }
});
</script>