<template>
  <div class="w-full h-[150px] bg-white rounded-lg p-2">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { Chart } from 'chart.js/auto'
import { onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/store/themeStore'

const props = defineProps({
  chartData: {
    type: Object,
    default: () => ({
      'gpt-3.5-turbo': 10,
      'gpt-4': 5,
    })
  },
  title: {
    type: String,
    default: '模型使用分布'
  }
})

const chartInstance = ref(null)
const chartCanvas = ref(null)

const themeStore = useThemeStore()


const initChart = () => {
  // 将数据转换为Chart.js需要的格式
  const labels = Object.keys(props.chartData)
  const data = Object.values(props.chartData)

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

watch(
  // 监听多个数据源
  [() => props.chartData, () => themeStore.currentThemeConfig],
  // 回调函数
  () => {
    initChart();
  },
  // 配置选项
  { deep: true }
);

onMounted(() => {
  initChart()
})
</script>