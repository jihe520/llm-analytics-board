<script setup>
import { ref, watch } from 'vue'
import html2canvas from 'html2canvas'
import CalHeatmap from '@/components/CalHeatmap.vue';
import { useChatDataStore } from '@/store/chatData';
import { Icon } from '@iconify/vue'

const chatDataStore = useChatDataStore();
// 热力图相关

const dailyData = ref([]);
// dataProcessed事件监听
watch(() => chatDataStore.dailyData, (newData) => {
  dailyData.value = newData;
});



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


</script>

<template>
  <div class="relative">
    <div 
      ref="cardRef"
      class="bg-white rounded-lg shadow-xl p-6 w-[800px] min-h-[400px]"
    >
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">ChatGPT 对话分析报告</h1>
        <p class="text-gray-600">2024年度总结</p>
      </div>
      
      <div class="space-y-6">
        <div class="h-64 bg-gray-50 rounded-lg">
          <!-- 热力图将在这里渲染 -->
          <CalHeatmap :data="dailyData" />
        </div>
        
        <div class="h-48 bg-gray-50 rounded-lg">
          <!-- 时间分布图将在这里渲染 -->
        </div>
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
  </div>
</template>