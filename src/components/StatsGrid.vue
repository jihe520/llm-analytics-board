<script setup>
import { Icon } from '@iconify/vue'

import { useChatDataStore } from '@/store/chatData'
import { watch,ref } from 'vue'
/**
 *   //  stats Grid 
    const totalConversations = ref(0); // 累计对话次数
    const maxConversationTurns = ref(0); // 单个对话最长对话次数
    const totalGPTWords = ref(0); // GPT生成的总字数
 */

const stats = ref({
  ConversationCount: '2594', // 一共对话次数
  MaxConversationTurns: '409', // 单个对话最长对话次数
  GPTWords: '1403', // GPT生成的字符
})

const chatDataStore = useChatDataStore()

watch(
  () => [
    chatDataStore.totalConversations,
    chatDataStore.maxConversationTurns,
    chatDataStore.totalGPTWords,
  ],
  ([totalConversations, maxConversationTurns, totalGPTWords]) => {
    stats.value.ConversationCount = totalConversations.toString()
    stats.value.MaxConversationTurns = maxConversationTurns.toString()
    stats.value.GPTWords = totalGPTWords.toString()
  },
  {
    deep: true,
  }
)



</script>

<template>
    <!-- Stats Grid -->
    <div class="grid grid-cols-3 gap-8 mb-8">
      <div class="flex items-center gap-2">
        <Icon icon="mdi:message-text" class="w-8 h-8 text-yellow-400" />
        <div>
          <div class="font-bold text-xl">{{ stats.ConversationCount }}</div>
          <div class="text-gray-600 text-sm">累计对话次数</div>
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        <Icon icon="mdi:message-group" class="w-8 h-8 text-blue-400"/>
        <div>
          <div class="font-bold text-xl">{{ stats.MaxConversationTurns }}</div>
          <div class="text-gray-600 text-sm">单个对话最长对话次数</div>
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        <Icon icon="mdi:abc" class="w-8 h-8 text-green-600" />
        <div>
          <div class="font-bold text-xl">{{ stats.GPTWords }}</div>
          <div class="text-gray-600 text-sm">GPT生成的字符</div>
        </div>
      </div>
      

    </div>

</template>