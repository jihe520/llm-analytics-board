<script setup>
import { ref, watch, onMounted } from 'vue'
import html2canvas from 'html2canvas'
import CalHeatmap from '@/components/CalHeatmap.vue';
import WordCloud from '@/components/WordCloud.vue';
import { useChatDataStore } from '@/store/chatData';
import { Icon } from '@iconify/vue'
import BarChart from '@/components/BarChart.vue';
import StatsGrid from '@/components/StatsGrid.vue';
import Header from '@/components/Header.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import dayjs from 'dayjs';

const chatDataStore = useChatDataStore();

// 热力图相关
const dailyData = ref([

]);
// dataProcessed事件监听
watch(() => chatDataStore.dailyData, (newData) => {
  dailyData.value = newData;
});

// Bar Chart
const hourlyData = ref([65, 59, 80, 81, 56, 55, 40]);
// 添加对 hourlyDistribution 的监听
watch(() => chatDataStore.hourlyDistribution, (newData) => {
  hourlyData.value = newData;
});

// 词云图
const keywords = ref([
  ['对话', 45],
  ['问题', 35],
  ['学习', 30],
  ['工作', 25],
  ['生活', 20],
])
watch(() => chatDataStore.contentTopics, (newData) => {
  keywords.value = newData
}, { deep: true });

// 添加模型分布数据
const modelData = ref({
  'gpt-3.5-turbo': 10,
  'gpt-4': 5,
})
watch(() => chatDataStore.modelDistribution, (newData) => {
  modelData.value = newData
}, { deep: true })

// 功能按钮相关
const cardRef = ref(null)

// 统一的截图逻辑
const captureCard = async () => {
  if (!cardRef.value) return

  // 添加小延迟确保SVG完全加载
  await new Promise(resolve => setTimeout(resolve, 100))

  return await html2canvas(cardRef.value, {
    useCORS: true,
    allowTaint: true,
    scale: 4 // 提高图片质量
  })
}

// 下载卡片
const downloadCard = async () => {
  try {
    const canvas = await captureCard()
    const link = document.createElement('a')
    link.download = 'chat-analysis.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (err) {
    console.error('下载失败:', err)
  }
}

// 将卡片写入剪切板
const toClipBoard = async () => {
  try {
    const canvas = await captureCard()
    canvas.toBlob(async (blob) => {
      const clipboardItem = new ClipboardItem({ 'image/png': blob })
      await navigator.clipboard.write([clipboardItem])
    })
  } catch (err) {
    console.error('写入剪贴板失败:', err)
  }
}

onMounted(() => {
  // dailyData 随机生成
  dailyData.value = Array.from({ length: 365 }, (_, i) => ({
    date: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
    value: Math.floor(Math.random() * 40) + 1
  }));
})

</script>

<template>
  <div ref="cardRef"
    class="bg-white backdrop-blur-sm rounded-2xl shadow-lg p-6 min-h-[350px] relative w-[95vw] md:w-[600px] max-w-[600px] border border-gray-100">
    <Header></Header>

    <div class="space-y-4">
      <StatsGrid></StatsGrid>
      <div class="flex justify-center w-full">
        <CalHeatmap :data="dailyData" class="scale-90 transform" />
      </div>

      <div class="flex gap-3">
        <div class="w-1/2">
          <WordCloud :keywords="keywords"></WordCloud>
        </div>
        <div class="w-1/2">
          <DoughnutChart :modelDistribution="modelData" />
        </div>
      </div>

      <BarChart :chartData="hourlyData"></BarChart>
    </div>
  </div>

  <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
    <button @click="downloadCard"
      class="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
      <Icon icon="material-symbols:download" class="w-4 h-4" />
      DownLoad
    </button>

    <button @click="toClipBoard"
      class="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
      <Icon icon="material-symbols:content-copy" class="w-4 h-4" />
      ClipBoard
    </button>
  </div>
</template>