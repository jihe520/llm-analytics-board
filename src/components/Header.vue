<script setup>
import { ref, watch } from 'vue';
import avatar1 from '@/assets/avatars/avatar1.svg?raw';
import avatar2 from '@/assets/avatars/avatar2.svg?raw';
import avatar3 from '@/assets/avatars/avatar3.svg?raw';
import avatar4 from '@/assets/avatars/avatar4.svg?raw';
import avatar5 from '@/assets/avatars/avatar5.svg?raw';
import avatar6 from '@/assets/avatars/avatar6.svg?raw';
import chatgptIcon from '@/assets/chatgpt.svg?raw';

const avatarMap = {
  'avatar1.svg': avatar1,
  'avatar2.svg': avatar2,
  'avatar3.svg': avatar3,
  'avatar4.svg': avatar4,
  'avatar5.svg': avatar5,
  'avatar6.svg': avatar6
};

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

const profile = ref({
  name: props.username,
  username: props.username,
  avatar: avatarMap[props.avatar]
});

watch([() => props.avatar, () => props.username], ([newAvatar, newUsername]) => {
  if (newAvatar) {
    profile.value.avatar = avatarMap[newAvatar];
  }
  if (newUsername) {
    profile.value.name = newUsername;
    profile.value.username = newUsername;
  }
});
</script>

<template>
  <div class="flex items-center gap-3 mb-4">
    <div class="w-14 h-14 rounded-full">
      <div v-html="profile.avatar" class="w-full h-full flex items-center justify-center"></div>
    </div>
    <div class="flex flex-col">
      <h2 class="text-xl font-bold">{{ profile.name }}</h2>
    </div>
    <div 
      v-html="chatgptIcon" 
      class="w-20 h-20 items-center justify-center text-gray-500 hover:text-blue-500 hover:scale-110 transform transition-all duration-300 ease-in-out cursor-pointer ml-auto self-center rounded-lg p-3 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100/50 active:scale-95"
    >
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
