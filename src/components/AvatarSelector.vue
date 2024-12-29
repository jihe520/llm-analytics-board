<script setup>
import avatar1 from '@/assets/avatars/avatar1.svg';
import avatar2 from '@/assets/avatars/avatar2.svg';
import avatar3 from '@/assets/avatars/avatar3.svg';
import avatar4 from '@/assets/avatars/avatar4.svg';
import avatar5 from '@/assets/avatars/avatar5.svg';
import avatar6 from '@/assets/avatars/avatar6.svg';
import { useProfileStore } from '@/store/profileStore';

const avatars = [
  { name: 'avatar1.svg', src: avatar1 },
  { name: 'avatar2.svg', src: avatar2 },
  { name: 'avatar3.svg', src: avatar3 },
  { name: 'avatar4.svg', src: avatar4 },
  { name: 'avatar5.svg', src: avatar5 },
  { name: 'avatar6.svg', src: avatar6 }
];

const profile = useProfileStore();
</script>

<template>
  <div class="p-4 bg-gray-50 rounded-lg">
    <h3 class="font-medium text-gray-700 mb-3">选择头像</h3>
    <div class="grid grid-cols-3 gap-2">
      <button v-for="avatar in avatars" :key="avatar.name"
        class="w-12 h-12 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
        @click="profile.setAvatar(avatar.name)">
        <img :src="avatar.src" alt="avatar" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</template>
