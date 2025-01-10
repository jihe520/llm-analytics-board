<script setup>
import VueWordCloud from 'vuewordcloud';
import { useThemeStore } from '@/store/themeStore';

const props = defineProps({
  keywords: {
    type: Array,
    default: () => [
      ['对话', 45],
      ['问题', 35],
      ['学习', 30],
      ['工作', 25],
      ['生活', 20],
    ],
  },
});

const themeStore = useThemeStore();

</script>

<template>
  <div class="w-full h-[150px] bg-white rounded-lg p-2">
    <vue-word-cloud :words="props.keywords" :color="themeStore.currentThemeConfig.wordCloudOptions.colorConfig"
      font-family="Hiragino Sans GB, Microsoft YaHei" :font-size-ratio="0.8" :animation-duration="1000"
      class="w-full h-full" />
  </div>
</template>
