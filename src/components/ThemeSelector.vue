<script setup>
import { useThemeStore } from '@/store/themeStore'

const themeStore = useThemeStore()
</script>

<template>
  <div class="bg-gray-50 rounded-lg p-4">
    <h3 class="font-medium text-gray-700 mb-3">选择主题</h3>

    <div class="space-y-3">
      <!-- 遍历所有主题选项 -->
      <div v-for="(theme, id) in themeStore.themes" :key="id"
        class="flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-100"
        :class="{ 'bg-blue-50': themeStore.currentTheme === id }" @click="themeStore.setTheme(id)">

        <!-- 主题预览色块 -->
        <div class="flex space-x-1">
          <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: theme.colors.primary }">
          </div>
          <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: theme.colors.secondary }">
          </div>
        </div>

        <!-- 主题名称 -->
        <span class="text-gray-700">{{ theme.name }}</span>

        <!-- 选中标记 -->
        <span v-if="themeStore.currentTheme === id" class="ml-auto text-blue-600">
          ✓
        </span>
      </div>
    </div>
  </div>
</template>