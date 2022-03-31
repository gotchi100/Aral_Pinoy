<template>
  <Pie
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
import { Pie } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartId: {
      type: String,
      default: 'pie-chart'
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
