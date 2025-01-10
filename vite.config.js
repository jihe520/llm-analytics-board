/* eslint-disable */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Icons from 'unplugin-icons/vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig(({ command, mode }) => {
  // 加载环境变量

  return {
    plugins: [
      vue(),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
      }),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1500, // 提高警告阈值
      rollupOptions: {
        output: {
          manualChunks: {
            // 核心框架分包
            'vue-core': ['vue'],
            'vue-router': ['vue-router'],
            'pinia-store': ['pinia', 'pinia-plugin-persistedstate'],

            // 图表相关分包
            chart: ['chart.js'],
            'cal-heatmap': ['cal-heatmap'],
            wordcloud: ['vuewordcloud'],

            // 工具库分包
            html2canvas: ['html2canvas'],
            axios: ['axios'],
            dayjs: ['dayjs'],
            segment: ['segmentit'],

            // 组件分包，按功能模块拆分
            'chart-components': [
              'src/components/BarChart.vue',
              'src/components/DoughnutChart.vue',
            ],
            'visual-components': [
              'src/components/CalHeatmap.vue',
              'src/components/WordCloud.vue',
            ],
            'ui-components': [
              'src/components/Header.vue',
              'src/components/StatsGrid.vue',
              'src/components/SideBar.vue',
            ],
          },
          // 代码分割配置
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      // 启用 CSS 代码分割
      cssCodeSplit: true,
      // 压缩配置
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
});
