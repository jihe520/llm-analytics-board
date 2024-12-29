<script setup>
import { ref, provide } from 'vue';
import { useChatDataStore } from '@/store/chatData';
import { useProfileStore } from '@/store/profileStore';
import AvatarSelector from '@/components/AvatarSelector.vue';

const chatDataStore = useChatDataStore();
const profileStore = useProfileStore();

defineProps({
  position: {
    type: String,
    default: 'left'
  }
});

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    await chatDataStore.loadFile(file);
  } catch (err) {
    console.error(err);
  }
};

</script>

<template>
  <div class="w-64 h-screen bg-white border-r border-gray-200 p-4 shadow-lg">
    <div v-if="position === 'left'" class=" h-full relative">
      <h2 class="text-lg font-semibold mb-4">上传对话记录</h2>
      <input type="file" accept=".json"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        @change="handleFileUpload" />
      <div class="text-green-800 text-sm mt-4">
        上传后等待一小会
      </div>
      <div class="text-red-600 text-1xl mt-4">
        分析在本地，不会请求网络API<br>
        不会将你的数据上传到网络
      </div>
      <!-- 底部 简介 -->
      <div class="bg-gray-50 rounded-lg p-4 mt-4 absolute bottom-4 left-4 right-4">
        <div class="flex justify-center items-center ">
          <div class=" text-gray-500">
            Build By <a href="https://github.com/jihe520" class="font-medium text-blue-500" target="_blank">Sanjin</a>
            <br>
            Copyright © 2024 All Rights Reserved
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="text-lg font-semibold mb-4">配置选项</h2>
      <div class="space-y-4">
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-medium text-gray-700 mb-2">用户名称</h3>
          <input type="text" v-model="profileStore.profile.username"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入用户名" />
        </div>
        <AvatarSelector />
      </div>
    </div>
  </div>
</template>