import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatDataStore = defineStore('chatData', () => {
  const rawData = ref([]); // 原始数据
  const dailyData = ref([]); // 每日对话次数数据

  // 加载 JSON 数据
  const loadFile = async (file) => {
    try {
      const fileContent = await file.text();
      rawData.value = JSON.parse(fileContent);
      processData();
    } catch (error) {
      console.error("加载文件失败：", error);
      throw new Error("文件解析失败");
    }
  };

  // 处理原始数据为每日对话次数
  const processData = () => {
    if (!Array.isArray(rawData.value)) {
      console.error("原始数据不是数组：", rawData.value);
      return;
    }

    // 日期 -- 次数
    const dailyCounts = {};

    for (const item of rawData.value) {
      // 获取mapping字典长度
      const mappingLength = Object.keys(item.mapping).length;
      const timestamp = item.create_time;
      // 时间转化为日期
      const date = new Date(timestamp * 1000).toISOString().split('T')[0];
      
      // 只处理2024年的数据
      if (date.startsWith('2024')) {
        // 统计次数(同一日期，次数合并)
        if (dailyCounts[date]) {
          dailyCounts[date] += mappingLength;
        } else {
          dailyCounts[date] = mappingLength;
        }
      }
    }
    console.log("处理后的数据：", dailyCounts);
    // 转化为array[{ date: '2024-01-01', value: 25 }]
    dailyData.value = Object.entries(dailyCounts).map(([date, value]) => ({ date, value }));
  };

  return {
    rawData,
    dailyData,
    loadFile,
  };
}, {
  persist: true,
});