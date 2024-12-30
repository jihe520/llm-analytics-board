<script setup>
import chatgptIcon from '@/assets/chatgpt.svg?raw';
import { useProfileStore } from '@/store/profileStore';

const profileStore = useProfileStore();

</script>

<template>
  <div class="flex items-center gap-3 mb-4">
    <div class="w-16 h-16 rounded-full">
      <div v-html="profileStore.getAvatar()" class="w-full h-full flex items-center justify-center"></div>
    </div>
    <div class="flex flex-col">
      <h2 class="text-xl font-bold">{{ profileStore.profile.username }}</h2>
    </div>
    <div v-html="chatgptIcon"
      class="w-20 h-20 items-center justify-center text-gray-500 hover:text-blue-500 hover:scale-110 transform transition-all duration-300 ease-in-out cursor-pointer ml-auto self-center rounded-lg p-3 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100/50 active:scale-95">
    </div>
  </div>
</template>

<style scoped>
.glow-effect:hover {
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
}

:deep(svg) {
  width: 80%;
  height: 80%;
}
</style>
