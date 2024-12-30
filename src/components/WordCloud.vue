<script setup>
import VueWordCloud from 'vuewordcloud'

const props = defineProps({
  keywords: {
    type: Array,
    default: () => [
      ['对话', 45],
      ['问题', 35],
      ['学习', 30],
      ['工作', 25],
      ['生活', 20],
    ]
  }
})



// 配置选项
const colorConfig = (wordArray) => {
  const weight = Array.isArray(wordArray) ? wordArray[1] : wordArray.weight;

  if (weight > 40) return '#FF5722'
  if (weight > 30) return '#FFC107'
  if (weight > 20) return '#45B7D1'
  if (weight > 10) return '#96CEB4'
  return '#FFEEAD'
}


</script>


<template>
  <div class="w-full h-[150px] bg-white rounded-lg p-2">
    <vue-word-cloud :words="props.keywords" :color="colorConfig" font-family="Hiragino Sans GB, Microsoft YaHei"
      :font-size-ratio="0.8" :animation-duration="1000" class="w-full h-full" />
  </div>
</template>
