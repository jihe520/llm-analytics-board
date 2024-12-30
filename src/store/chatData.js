import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Segment, useDefault } from 'segmentit';

export const useChatDataStore = defineStore(
  'chatData',
  () => {
    const rawData = ref([]); // 原始数据

    // HeatMap
    const dailyData = ref([]); // 每日对话次数数据

    // BarChart
    const hourlyDistribution = ref(Array(24).fill(0)); // 24小时分布

    //  stats Grid
    const totalConversations = ref(0); // 累计对话次数
    const maxConversationTurns = ref(0); // 单个对话最长对话次数
    const totalGPTWords = ref(0); // GPT生成的总字数

    // WordCloud
    const contentAll = ref(''); // 所有对话内容
    const contentTopics = ref([]); // 对话主题

    // DoughnutChart
    const modelDistribution = ref({}); // 用于存储不同模型的对话次数
    // const imageCount = ref(0); // AI创建图片数量

    // 加载 JSON 数据
    const loadFile = async (file) => {
      try {
        const fileContent = await file.text();
        rawData.value = JSON.parse(fileContent);
        await processData();
      } catch (error) {
        console.error('加载文件失败详情：', error);
        throw new Error('文件解析失败');
      }
    };

    // 处理原始数据为每日对话次数
    const processData = async () => {
      try {
        if (!Array.isArray(rawData.value)) {
          throw new Error('原始数据不是数组');
        }
        const hourCounts = Array(24).fill(0);
        const dailyCounts = {};
        for (const item of rawData.value) {
          const timestamp = item.create_time;
          const date = new Date(timestamp * 1000);
          const dateStr = date.toISOString().split('T')[0];
          // 只处理2024年的数据
          if (dateStr.startsWith('2024')) {
            contentAll.value += item.title + '\n';
            _hourlyDistributionComputed(item, hourCounts);
            _totalConversationsComputed();
            _maxConversationTurnsComputed(item);
            _dailyDataComputed(item, dailyCounts, dateStr);
            for (const messageId in item.mapping) {
              const message = item.mapping[messageId].message;
              _totalGPTWordsComputed(message);
              _modelDistributionComputed(item, messageId);
            }
          }
        }
        _contentTopicsComputed();

        // 更新统计数据
        hourlyDistribution.value = hourCounts.map((count) => count);
        dailyData.value = Object.entries(dailyCounts).map(([date, value]) => ({
          date,
          value,
        }));
      } catch (error) {
        console.error('处理数据失败：', error);
        throw error;
      }
    };

    function _hourlyDistributionComputed(item, hourCounts) {
      // 遍历每个消息，统计用户消息的时间分布
      for (const messageId in item.mapping) {
        const message = item.mapping[messageId].message;
        if (message?.author?.role === 'user' && message.create_time) {
          const msgDate = new Date(message.create_time * 1000);
          const hour = msgDate.getHours();
          hourCounts[hour]++;
        }
      }
    }

    function _contentTopicsComputed() {
      // 替换原有的后端关键词提取逻辑
      try {
        const segmentit = useDefault(new Segment());
        const segments = segmentit.doSegment(contentAll.value);

        // 统计词频
        const wordCount = {};
        segments.forEach((segment) => {
          if (segment.p !== 'punct' && segment.w.length > 1) {
            // 排除标点符号和单字
            wordCount[segment.w] = (wordCount[segment.w] || 0) + 1;
          }
        });

        // 转换为数组并排序
        const sortedWords = Object.entries(wordCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10) // 取前10个关键词
          .map(([word, count]) => [
            word,
            Math.floor(count * 5), // 将词频转换为权重
          ]);

        // 词频 随机
        const randomWords = sortedWords.map(([word]) => [
          word,
          Math.floor(Math.random() * 51), // 生成0到50之间的随机数
        ]);
        contentTopics.value = randomWords;
      } catch (error) {
        console.error('关键词提取失败:', error);
      }
    }

    function _totalConversationsComputed() {
      totalConversations.value++;
    }

    function _maxConversationTurnsComputed(item) {
      // 计算单个对话的轮次
      const turns = Object.values(item.mapping).filter(
        (msg) =>
          msg.message?.author?.role === 'user' ||
          msg.message?.author?.role === 'assistant'
      ).length;
      maxConversationTurns.value = Math.max(maxConversationTurns.value, turns);
    }

    function _dailyDataComputed(item, dailyCounts, dateStr) {
      // 统计次数(同一日期，次数合并)
      if (dailyCounts[dateStr]) {
        dailyCounts[dateStr] += Object.keys(item.mapping).length;
      } else {
        dailyCounts[dateStr] = Object.keys(item.mapping).length;
      }
    }

    function _modelDistributionComputed(item, messageId) {
      // 获取模型信息 ，如果是unknown，则不统计
      const modelSlug =
        item.mapping[messageId]?.message?.metadata?.model_slug || 'unknown';
      if (modelSlug !== 'unknown') {
        modelDistribution.value[modelSlug] =
          (modelDistribution.value[modelSlug] || 0) + 1;
      }
    }

    // 计算GPT生成的文字数量
    function _totalGPTWordsComputed(message) {
      if (
        message?.author?.role === 'assistant' &&
        message.content?.content_type === 'text'
      ) {
        totalGPTWords.value += message.content.parts.join('').length;
      }
    }

    return {
      rawData,
      dailyData,
      hourlyDistribution,
      totalConversations,
      maxConversationTurns,
      totalGPTWords,
      contentTopics,
      loadFile,
      modelDistribution,
    };
  },
  {
    persist: true,
  }
);
