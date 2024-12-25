import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // 定义状态
  const currentTheme = ref('default')
  const themes = ref({
    default: {
      name: '默认主题',
      colors: {
        primary: '#3B82F6',
        secondary: '#60A5FA',
        background: '#FFFFFF',
        text: '#1F2937'
      },
      charts: {
        bar: {
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)'
        },
        doughnut: {
          colors: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ]
        }
      }
    },
    dark: {
      name: '暗色主题',
      colors: {
        primary: '#1E40AF',
        secondary: '#3B82F6',
        background: '#1F2937',
        text: '#F3F4F6'
      },
      charts: {
        bar: {
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)'
        },
        doughnut: {
          colors: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ]
        }
      }
    }
  })

  // 计算当前主题的配置
  const currentThemeConfig = computed(() => themes.value[currentTheme.value])

  // 定义动作
  function setTheme(themeId) {
    currentTheme.value = themeId
  }

  return {
    currentTheme,
    themes,
    currentThemeConfig,
    setTheme
  }
}, {
  persist: true
})