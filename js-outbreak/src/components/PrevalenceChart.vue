<template>
  <div class="chart-container">
    <div class="grid grid-cols-2 gap-4">
      <div ref="boxPlotRef" class="chart-subcontainer"></div>
      <div class="chart-subcontainer">
        <BarChart 
          :data="processedData.presenceData"
          :height="height"
          :width="width"
          :marginLeft="marginLeft"
          :marginBottom="marginBottom"
          :barColor="boxColor"
          xLabel="Number of samples with more than 5% prevalence"
          yLabel="Lineage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, computed } from 'vue'
import * as Plot from '@observablehq/plot'
import { defaultColor } from '../utils/colorSchemes'
import BarChart from './BarChart.vue'

interface DemixedData {
  lineages: string[]
  abundances: number[]
}

interface LineageDistribution {
  lineage: string
  abundance: number
}

interface LineagePresence {
  key: string
  value: number
}

const props = defineProps({
  demixedData: { type: Array as () => DemixedData[], required: true },
  height: { type: Number, default: 500 },
  width: { type: Number, default: 500 },
  marginLeft: { type: Number, default: 120 },
  marginBottom: { type: Number, default: 50 },
  boxColor: { type: String, default: defaultColor }
})

const boxPlotRef = ref<HTMLDivElement>()

function calculateMedian(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

function processData() {
  const lineageDistribution: LineageDistribution[] = []
  const lineagePresence: Record<string, number> = {}

  props.demixedData.forEach(entry => {
    const { abundances, lineages } = entry

    if (lineages != null && abundances.length > 0) {
      lineages.forEach((lineage, index) => {
        const abundance = abundances[index]
        lineageDistribution.push({
          lineage,
          abundance: abundance * 100
        })

        if (abundance > 0.05) {
          lineagePresence[lineage] = (lineagePresence[lineage] || 0) + 1
        }
      })
    }
  })

  // Calculate median abundances for sorting
  const medianAbundances = Object.entries(
    lineageDistribution.reduce((acc, { lineage, abundance }) => {
      acc[lineage] = acc[lineage] || []
      acc[lineage].push(abundance)
      return acc
    }, {} as Record<string, number[]>)
  ).map(([lineage, abundances]) => ({
    lineage,
    median: calculateMedian(abundances) || 0
  }))

  // Sort lineages by median
  const sortedLineages = medianAbundances
    .sort((a, b) => b.median - a.median)
    .map(d => d.lineage)

  // Format lineage presence data for BarChart component
  const presenceData: LineagePresence[] = Object.entries(lineagePresence).map(
    ([lineage, count]) => ({
      key: lineage,
      value: count
    })
  )

  return {
    lineageDistribution,
    sortedLineages,
    presenceData
  }
}

const processedData = computed(() => processData())

function renderBoxPlot() {
  if (!props.demixedData || props.demixedData.length === 0 || !boxPlotRef.value) return

  boxPlotRef.value.innerHTML = ''

  const boxPlot = Plot.plot({
    marginLeft: props.marginLeft,
    marginBottom: props.marginBottom,
    height: props.height,
    width: props.width,
    x: {
      label: "Abundance",
      grid: true,
      domain: [0, 100],
      tickFormat: (d: number) => `${d.toFixed(0)}%`
    },
    y: {
      label: "Lineage",
      domain: processedData.value.sortedLineages
    },
    style: {
      fontSize: "12px"
    },
    marks: [
      Plot.boxX(processedData.value.lineageDistribution, {
        y: "lineage",
        x: "abundance",
        fill: props.boxColor,
        stroke: "black",
        r: 0
      })
    ]
  })

  boxPlotRef.value.appendChild(boxPlot)
}

// Expose processData for testing
defineExpose({
  processData
})

onMounted(renderBoxPlot)
watch(() => props.demixedData, renderBoxPlot, { deep: true })
watch(() => props.boxColor, renderBoxPlot)

onBeforeUnmount(() => {
  if (boxPlotRef.value) boxPlotRef.value.innerHTML = ''
})
</script>

<style scoped>
.chart-container {
  width: 100%;
}

.chart-subcontainer {
  width: 100%;
}
</style>