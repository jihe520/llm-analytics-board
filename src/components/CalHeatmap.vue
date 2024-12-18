<script setup>
import { ref, onMounted,watch } from 'vue';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday'  // 添加这行
import localeData from 'dayjs/plugin/localeData'  // 添加这行

dayjs.extend(weekday)  // 添加这行
dayjs.extend(localeData)  // 添加这行

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
    scale: { color: { type: 'linear', scheme: 'PRGn', domain: [0, 40] } },
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
    [
      CalendarLabel,
      {
        width: 30,
        textAlign: 'start',
        text: () => dayjs.weekdaysShort().map((d, i) => (i % 2 == 0 ? '' : d)),
      },
    ],
  ]
);
};

// 监听数据变化
watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    paintCalendar()
  }
})

onMounted(() => {
  paintCalendar();
});
</script>

<template>
  <div id="ex-year"></div>
</template>