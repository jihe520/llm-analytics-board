<script setup>
import { ref, watch,onMounted } from 'vue'
import html2canvas from 'html2canvas'
import CalHeatmap from '@/components/CalHeatmap.vue';
import WordCloud from '@/components/WordCloud.vue';
import { useChatDataStore } from '@/store/chatData';
import { Icon } from '@iconify/vue'
import BarChart from '@/components/BarChart.vue';
import StatsGrid from '@/components/StatsGrid.vue';
import Header from '@/components/Header.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';

const chatDataStore = useChatDataStore();

// 头像profile相关
const props = defineProps({
  avatar: {
    type: String,
    default: 'avatar1.svg'
  },
  username: {
    type: String,
    default: 'Sanjin'
  }
});


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
      [ '对话',  45 ],
      [ '问题',  35 ],
      [ '学习',  30 ],
      [ '工作',  25 ],
      [ '生活',  20 ],
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

// 功能按钮
// 下载卡片相关
const cardRef = ref(null)
const downloadCard = async () => {
  if (!cardRef.value) return
  const canvas = await html2canvas(cardRef.value)
  const link = document.createElement('a')
  link.download = 'chat-analysis.png'
  link.href = canvas.toDataURL()
  link.click()
}
// 将卡片写入剪切板
const toClipBoard = async () => {
  if (!cardRef.value) return
  try {
    const canvas = await html2canvas(cardRef.value)
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
    <div 
      ref="cardRef"
      class="bg-white rounded-lg shadow-xl p-6 min-h-[400px] relative max-sm:"
    >
      <Header :avatar="props.avatar" :username="props.username"></Header>
      
      <div class="space-y-6">
        <!-- StatsGrid  -->
        <StatsGrid></StatsGrid>

        <!-- 热力图将在这里渲染 -->
        <CalHeatmap :data="dailyData" />
        
        <!-- 词云图和甜甜圈图并排显示 -->
        <div class="flex gap-4">
          <div class="w-1/2">
            <WordCloud :keywords="keywords"></WordCloud>
          </div>
          <div class="w-1/2">
            <DoughnutChart :chartData="modelData" />
          </div>
        </div>

        <!-- 时间分布图将在这里渲染 -->
        <BarChart :chartData="hourlyData"></BarChart>

      </div>
    </div>

    <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
      <button
        @click="downloadCard"
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Icon icon="material-symbols:download" />
        DownLoad
      </button>

      <button
        @click="toClipBoard"
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Icon icon="material-symbols:content-copy" />
        ClipBoard
      </button>
    </div>
</template>