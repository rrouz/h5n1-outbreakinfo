// Import components
import BarChart from './components/BarChart.vue'
import ScatterChart from './components/ScatterChart.vue'
import TimeSeriesChart from './components/TimeSeriesChart.vue'
import MutationChart from './components/MutationChart.vue'

// Import utilities
import { colorPalette } from './utils/colorSchemes'

// Export components
export {
    BarChart,
    ScatterChart,
    TimeSeriesChart,
    MutationChart
}

export { colorPalette as outbreakInfoColorPalette }

// Export default object for Vue.use()
export default {
    install: (app: any) => {
        app.component('BarChart', BarChart)
        app.component('ScatterChart', ScatterChart)
        app.component('TimeSeriesChart', TimeSeriesChart)
        app.component('MutationChart', MutationChart)
    }
}