<template>
  <div class="w-full h-[200px] mx-auto">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { Chart } from 'chart.js/auto'
import { onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/store/themeStore'

// 定义 props
const props = defineProps({
  chartData: {
    type: Array,
    default: () => [65, 59, 80, 81, 56, 55, 40]
  },
  chartLabels: {
    type: Array,
    default: () => ['', '1:00', '', '3:00', '', '5:00', '', '7:00', '', '9:00', '', '11:00', '', '13:00', '', '15:00', '', '17:00', '', '19:00', '', '21:00', '', '23:00']
  },
  title: {
    type: String,
    default: '对话时段分布'
  }
})

// 图表实例引用
const chartInstance = ref(null)
const chartCanvas = ref(null)

const themeStore = useThemeStore()

const initChart = () => {
  const data = {
    labels: props.chartLabels,
    datasets: [{
      label: '对话数量',
      data: props.chartData,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      borderRadius: 5,
      borderSkipped: false,
    }]
  }

  const config = {
    type: 'bar',
    data: data,
    options: themeStore.currentThemeConfig.barChartsOptions
  }

  // 销毁旧的图表实例
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }

  // 创建新的图表实例
  chartInstance.value = new Chart(chartCanvas.value, config)
}

// 监听数据变化
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
  initChart()
})
</script>