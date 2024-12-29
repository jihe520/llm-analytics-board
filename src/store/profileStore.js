import { defineStore } from "pinia";
import {ref} from 'vue'
import avatar1 from '@/assets/avatars/avatar1.svg?raw';
import avatar2 from '@/assets/avatars/avatar2.svg?raw';
import avatar3 from '@/assets/avatars/avatar3.svg?raw';
import avatar4 from '@/assets/avatars/avatar4.svg?raw';
import avatar5 from '@/assets/avatars/avatar5.svg?raw';
import avatar6 from '@/assets/avatars/avatar6.svg?raw';

export const useProfileStore = defineStore('profile',()=>{

  const avatarMap = {
    'avatar1.svg': avatar1,
    'avatar2.svg': avatar2,
    'avatar3.svg': avatar3,
    'avatar4.svg': avatar4,
    'avatar5.svg': avatar5,
    'avatar6.svg': avatar6
  };
    // right sidebar
  const profile = ref({
    username: 'Sanjin',
    avatar: 'avatar1.svg'
  });

  // 设置用户名
  function setUsername(username) {
    profile.value.username = username;
  }

  // 设置头像
  function setAvatar(avatar) {
    profile.value.avatar = avatar;
  }

  // 获取头像
  function getAvatar() {
    return avatarMap[profile.value.avatar];
  }

  return {
    profile,
    setUsername,
    setAvatar,
    getAvatar
  }
})