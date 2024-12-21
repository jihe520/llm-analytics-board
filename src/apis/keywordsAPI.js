import httpInstance from "@/utils/http";

// 提取关键词的API请求
export const extractKeywords = async (text) => {
  try {
    const response = await httpInstance.post('/keyword', {
      text: text
    });
    return response;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('提取关键词请求超时，请检查网络连接或重试');
    } else {
      console.error('提取关键词请求失败:', error.message);
    }
    throw {
      code: error.code === 'ECONNABORTED' ? 408 : 500,
      message: error.code === 'ECONNABORTED' ? '请求超时' : '服务器错误'
    };
  }
};