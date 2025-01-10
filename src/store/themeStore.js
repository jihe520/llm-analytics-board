import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useThemeStore = defineStore(
  'theme',
  () => {
    // 定义状态
    const currentTheme = ref('default');
    const themes = ref({
      default: {
        name: '默认主题',
        colors: {
          primary: '#4F46E5',
          secondary: '#22D3EE',
        },
        barChartsOptions: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                color: '#64748B',
              },
              grid: {
                display: false,
                color: '#E2E8F0',
              },
            },
            y: {
              ticks: {
                color: '#64748B',
              },
              grid: {
                display: false,
                color: '#E2E8F0',
              },
            },
          },
        },
        doughnutChartsOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: '#64748B',
              },
            },
          },
        },
        calHeatmapOptions: {
          scale: { color: { type: 'linear', scheme: 'PRGn', domain: [0, 40] } },
        },
        wordCloudOptions: {
          colorConfig: (wordArray) => {
            const weight = Array.isArray(wordArray)
              ? wordArray[1]
              : wordArray.weight;
            if (weight > 40) return '#4F46E5';
            if (weight > 30) return '#22D3EE';
            if (weight > 20) return '#34D399';
            if (weight > 10) return '#FBBF24';
            return '#F472B6';
          },
        },
      },

      dark: {
        name: '暗色主题',
        colors: {
          primary: '#1E293B',
          secondary: '#64748B',
        },
        barChartsOptions: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                color: '#94A3B8',
              },
              grid: {
                display: false,
                color: '#334155',
              },
            },
            y: {
              ticks: {
                color: '#94A3B8',
              },
              grid: {
                display: false,
                color: '#334155',
              },
            },
          },
        },
        doughnutChartsOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: '#94A3B8',
              },
            },
          },
        },
        calHeatmapOptions: {
          scale: {
            color: { type: 'linear', scheme: 'Blues', domain: [0, 40] },
          },
        },
        wordCloudOptions: {
          colorConfig: (wordArray) => {
            const weight = Array.isArray(wordArray)
              ? wordArray[1]
              : wordArray.weight;
            if (weight > 40) return '#1E293B';
            if (weight > 30) return '#64748B';
            if (weight > 20) return '#94A3B8';
            if (weight > 10) return '#CBD5E1';
            return '#E2E8F0';
          },
        },
      },

      light: {
        name: '浅色主题',
        colors: {
          primary: '#FFFFFF',
          secondary: '#F3F4F6',
        },
        barChartsOptions: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                color: '#6B7280',
              },
              grid: {
                display: false,
                color: '#D1D5DB',
              },
            },
            y: {
              ticks: {
                color: '#6B7280',
              },
              grid: {
                display: false,
                color: '#D1D5DB',
              },
            },
          },
        },
        doughnutChartsOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: '#6B7280',
              },
            },
          },
        },
        calHeatmapOptions: {
          scale: {
            color: { type: 'linear', scheme: 'Greens', domain: [0, 40] },
          },
        },
        wordCloudOptions: {
          colorConfig: (wordArray) => {
            const weight = Array.isArray(wordArray)
              ? wordArray[1]
              : wordArray.weight;
            if (weight > 40) return '#FFFFFF';
            if (weight > 30) return '#F3F4F6';
            if (weight > 20) return '#E5E7EB';
            if (weight > 10) return '#D1D5DB';
            return '#9CA3AF';
          },
        },
      },
    });

    // 计算当前主题的配置
    const currentThemeConfig = computed(() => themes.value[currentTheme.value]);

    // 定义动作
    function setTheme(themeId) {
      currentTheme.value = themeId;
    }

    return {
      currentTheme,
      themes,
      currentThemeConfig,
      setTheme,
    };
  },
  {
    persist: true,
  }
);
