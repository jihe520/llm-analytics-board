// 接受前端传来的文本，使用结巴分词提取主题，将主题返回
import nodejieba from 'nodejieba';

// vercel serverless function处理函数
export default async function handler(req, res) {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({
      code: 405,
      message: '只支持POST请求'
    });
  }

  try {
    // 获取请求体中的文本
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        code: 400,
        message: '请求参数错误:缺少text字段'
      });
    }

    // 使用结巴分词提取关键词,返回前5个关键词
    const keywords = nodejieba.extract(text, 5);

    // 返回结果
    return res.status(200).json({
      code: 200,
      data: keywords,
      message: '关键词提取成功'
    });

  } catch (error) {
    console.error('关键词提取错误:', error);
    return res.status(500).json({
      code: 500,
      message: '服务器内部错误',
      error: error.message
    });
  }
}

