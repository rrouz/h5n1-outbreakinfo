// Import components
import BarChart from './components/BarChart.vue'
import ScatterChart from './components/ScatterChart.vue'

// Export components
export {
    BarChart,
    ScatterChart
}

// Export default object for Vue.use()
export default {
    install: (app: any) => {
        app.component('BarChart', BarChart)
        app.component('ScatterChart', ScatterChart)
    }
}