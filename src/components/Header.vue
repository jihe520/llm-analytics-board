<script setup>
import { ref, watch } from 'vue';
import ArcticonsOpenaiChatgpt from '~icons/arcticons/openai-chatgpt?width=48px&height=48px';
import avatar1 from '@/assets/avatars/avatar1.svg?raw';
import avatar2 from '@/assets/avatars/avatar2.svg?raw';
import avatar3 from '@/assets/avatars/avatar3.svg?raw';
import avatar4 from '@/assets/avatars/avatar4.svg?raw';
import avatar5 from '@/assets/avatars/avatar5.svg?raw';
import avatar6 from '@/assets/avatars/avatar6.svg?raw';

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
    <div class="w-12 h-12 rounded-full overflow-hidden">
      <div v-html="profile.avatar" class="w-full h-full"></div>
    </div>
    <div>
      <h2 class="text-xl font-bold">{{ profile.name }}</h2>
      <p class="text-gray-600">@{{ profile.username }}</p>
    </div>
    <ArcticonsOpenaiChatgpt class="ml-auto" />
  </div>
</template>