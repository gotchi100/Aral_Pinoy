<template>
  <trend
    :chart-data="chartData"
    :chart-id="chartId"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    :chart-options="options"
  />
</template>

<script>
import { Line as LineChart } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

export default {
  name: 'TrendChart',
  components: {
    Trend: LineChart
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartId: {
      type: String,
      default: 'trend-chart'
    },
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true
      })
    }
  }
}
</script>
