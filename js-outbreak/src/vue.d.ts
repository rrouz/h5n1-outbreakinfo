declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// Add a new module declaration for your library
declare module 'outbreakInfo' {
    import { DefineComponent } from 'vue'

    export const BarChart: DefineComponent<{}, {}, any>
    export const ScatterChart: DefineComponent<{}, {}, any>
    export const TimeSeriesChart: DefineComponent<{}, {}, any>
}