<script setup>
import { useChatDataStore } from '@/store/chatData';

const chatDataStore = useChatDataStore();

defineProps({
  position: {
    type: String,
    default: 'left' // 默认位置为左侧 , 右侧为统计
  }
})

// 上传文件相关: 对上传文件进行处理
const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return
    try {
        await chatDataStore.loadFile(file);
    }catch(err) {
        console.error(err);
    }
    
} 

</script>

<template>
  <div class="w-64 h-screen bg-white border-r border-gray-200 p-4">
    <div v-if="position === 'left'">
      <h2 class="text-lg font-semibold mb-4">上传对话记录</h2>
      <input
        type="file"
        accept=".json"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        @change="handleFileUpload"
      />
    </div>
    <div v-else>
      <h2 class="text-lg font-semibold mb-4">数据统计</h2>
      <div class="space-y-4">
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-medium text-gray-700">最长对话</h3>
          <p class="text-2xl font-bold text-blue-600">0</p>
        </div>
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-medium text-gray-700">总对话数</h3>
          <p class="text-2xl font-bold text-blue-600">0</p>
        </div>
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-medium text-gray-700">累计对话数</h3>
          <p class="text-2xl font-bold text-blue-600">0</p>
        </div>
      </div>
    </div>
  </div>
</template>