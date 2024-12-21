<script setup>
import { ref } from 'vue';
import ChatCard from '@/components/ChatCard.vue';
import Sidebar from '@/components/SideBar.vue';

const selectedAvatar = ref('avatar1.svg');
const username = ref('Sanjin');

const handleAvatarChange = (avatar) => {
  selectedAvatar.value = avatar;
};

const handleUsernameChange = (newUsername) => {
  username.value = newUsername;
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar position="left" />
    <main class="flex-1 flex items-center justify-center p-4 md:p-0">
      <ChatCard :avatar="selectedAvatar" :username="username"/>
    </main>
    <Sidebar 
      position="right" 
      @avatar-change="handleAvatarChange"
      @username-change="handleUsernameChange"
    />
  </div>
</template>

<style scoped>

</style>
