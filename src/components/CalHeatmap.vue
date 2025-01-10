<script setup>
import { onMounted, watch } from 'vue';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { useThemeStore } from '@/store/themeStore';

dayjs.extend(weekday);
dayjs.extend(localeData);

const props = defineProps({
  data: {
    type: Array,
    default: () => [
      { date: '2024-01-01', value: 25 },
      { date: '2024-01-02', value: 30 },
      { date: '2024-01-03', value: 30 },
      // ... 更多数据
    ],
  },
});

const themeStore = useThemeStore();
const cal = new CalHeatmap();

const paintCalendar = () => {
  cal.paint(
    {
      data: {
        source: props.data,
        type: 'json',
        x: 'date',
        y: d => +d['value'],
      },
      date: { start: new Date('2024-01-01') },
      range: 1,
      scale: themeStore.currentThemeConfig.calHeatmapOptions.scale,
      domain: {
        type: 'year',
        label: { text: null },
      },
      subDomain: { type: 'day', radius: 2 },
      itemSelector: '#ex-year',
    },
    [
      [
        Tooltip,
        {
          text: function (date, value, dayjsDate) {
            return (
              (value ? value + '次对话' : 'No data') + ' on ' + dayjsDate.format('LL')
            );
          },
        },
      ],
    ]
  );
};

// 监听数据变化
watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    paintCalendar();
  }
});

watch(() => themeStore.currentThemeConfig, () => {
  paintCalendar();
}, { deep: true });

onMounted(() => {
  paintCalendar();
});
</script>

<template>
  <div class="flex justify-center w-full">
    <div id="ex-year"></div>
  </div>
</template>