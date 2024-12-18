<script setup>
import ChatCard from '@/components/ChatChard.vue';
import Sidebar from '@/components/SideBar.vue';
</script>

<template>
    <div class="flex min-h-screen bg-gray-100">
      <Sidebar position="left" />
        <main class="flex-1 flex items-center justify-center">
          <ChatCard />
        </main>
    <Sidebar position="right" />
  </div>
</template>

<style scoped>

</style>
