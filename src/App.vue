<script setup>
import { ref } from 'vue';
import ChatCard from '@/components/ChatCard.vue';
import Sidebar from '@/components/SideBar.vue';
import { Icon } from '@iconify/vue'; 

const selectedAvatar = ref('avatar1.svg');
const username = ref('Sanjin');
const leftSidebarOpen = ref(false);
const rightSidebarOpen = ref(false);

const handleAvatarChange = (avatar) => {
  selectedAvatar.value = avatar;
};

const handleUsernameChange = (newUsername) => {
  username.value = newUsername;
};

const toggleLeftSidebar = () => {
  leftSidebarOpen.value = !leftSidebarOpen.value;
};

const toggleRightSidebar = () => {
  rightSidebarOpen.value = !rightSidebarOpen.value;
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-100 relative">
    <!-- 左侧边栏切换按钮 -->
    <button 
      @click="toggleLeftSidebar"
      class="fixed left-4 top-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg"
    >
      <Icon icon="mdi:menu" class="w-6 h-6" />
    </button>

    <!-- 右侧边栏切换按钮 -->
    <button 
      @click="toggleRightSidebar"
      class="fixed right-4 top-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg"
    >
      <Icon icon="mdi:cog" class="w-6 h-6" />
    </button>

    <!-- 左侧边栏 -->
    <Sidebar 
      position="left"
      :class="[
        'fixed md:relative transition-transform duration-300 z-40',
        leftSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    />

    <!-- 主内容区 -->
    <main class="flex-1 flex items-center justify-center p-4 md:p-0">
      <ChatCard :avatar="selectedAvatar" :username="username"/>
    </main>

    <!-- 右侧边栏 -->
    <Sidebar 
      position="right" 
      @avatar-change="handleAvatarChange"
      @username-change="handleUsernameChange"
      :class="[
        'fixed md:relative right-0 transition-transform duration-300 z-40',
        rightSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      ]"
    />
  </div>
</template>

<style scoped>
.sidebar-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
</style>
