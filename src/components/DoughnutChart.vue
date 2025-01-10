<template>
  <div class="w-full h-[150px] bg-white rounded-lg p-2">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto'
import { onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/store/themeStore'

export default {
  name: 'DoughnutChart',
  props: {
    modelDistribution: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chartInstance = ref(null)
    const chartCanvas = ref(null)
    const themeStore = useThemeStore()
    const chartData = ref({})

    const initChart = () => {
      // 将数据转换为Chart.js需要的格式
      const labels = Object.keys(chartData.value)
      const data = Object.values(chartData.value)

      const config = {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
            ],
            borderWidth: 1
          }]
        },
        options: themeStore.currentThemeConfig.doughnutChartsOptions
      }

      if (chartInstance.value) {
        chartInstance.value.destroy()
      }

      chartInstance.value = new Chart(chartCanvas.value, config)
    }

    // 观察 modelDistribution 的变化
    watch(
      () => props.modelDistribution,
      (newVal) => {
        // 确保不会递归更新
        if (JSON.stringify(chartData.value) !== JSON.stringify(newVal)) {
          chartData.value = { ...newVal }
          initChart()
        }
      },
      { deep: true }
    )

    watch(
      () => [props.chartData, props.chartLabels, props.title, themeStore.currentThemeConfig],
      (newVal, oldVal) => {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return
        if (chartInstance.value) {
          chartInstance.value.destroy()
        }
        initChart()
      },
      { deep: true }
    )

    onMounted(() => {
      chartData.value = { ...props.modelDistribution }
      initChart()
    })

    return {
      chartCanvas
    }
  }
}
</script>