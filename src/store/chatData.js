import { defineStore } from 'pinia';
import { ref } from 'vue';
import { extractKeywords } from '@/apis/keywordsAPI';
import { Segment, useDefault } from 'segmentit';

export const useChatDataStore = defineStore('chatData', () => {
  const rawData = ref([]); // 原始数据
  const dailyData = ref([]); // 每日对话次数数据
  const hourlyDistribution = ref(Array(24).fill(0)); // 24小时分布

  //  stats Grid 
  const totalConversations = ref(0); // 累计对话次数
  const maxConversationTurns = ref(0); // 单个对话最长对话次数
  const totalGPTWords = ref(0); // GPT生成的总字数

  const contentAll = ref('') // 所有对话内容
  const contentTopics = ref([])

  const modelDistribution = ref({});  // 用于存储不同模型的对话次数
  const imageCount = ref(0); // AI创建图片数量

  // 加载 JSON 数据
  const loadFile = async (file) => {
    try {
      const fileContent = await file.text();
      
      rawData.value = JSON.parse(fileContent);
      
      await processData();
    } catch (error) {
      console.error("加载文件失败详情：", error);
      throw new Error("文件解析失败");
    }
  };

  // 处理原始数据为每日对话次数
  const processData = async () => {
    try {
      if (!Array.isArray(rawData.value)) {
        throw new Error("原始数据不是数组");
      }

      const dailyCounts = {};
      const hourCounts = Array(24).fill(0);
      let totalDays = 0;
      let maxTurns = 0;
      let totalWords = 0;
      let conversationCount = 0;

      for (const item of rawData.value) {
        const timestamp = item.create_time;
        const date = new Date(timestamp * 1000);
        const dateStr = date.toISOString().split('T')[0];
        
        contentAll.value += item.title + '\n';
        // 只处理2024年的数据
        if (dateStr.startsWith('2024')) {
          // 遍历每个消息，统计用户消息的时间分布
          for (const messageId in item.mapping) {
            const message = item.mapping[messageId].message;
            if (message?.author?.role === 'user' && message.create_time) {
              const msgDate = new Date(message.create_time * 1000);
              const hour = msgDate.getHours();
              hourCounts[hour]++;
            }
          }
          

          // 计算单个对话的轮次
          const turns = Object.values(item.mapping).filter(msg => 
            msg.message?.author?.role === 'user' || 
            msg.message?.author?.role === 'assistant'
          ).length;
          
          maxTurns = Math.max(maxTurns, turns);
          conversationCount++;

          
          for (const messageId in item.mapping) {
          // 计算GPT生成的文字数量
            const message = item.mapping[messageId].message;
            if (message?.author?.role === 'assistant' && 
                message.content?.content_type === 'text') {
              totalWords += message.content.parts.join('').length;
            }

            // 获取模型信息 ，如果是unknown，则不统计
            const modelSlug = item.mapping[messageId]?.message?.metadata?.model_slug || 'unknown';
            if (modelSlug !== 'unknown') {
              modelDistribution.value[modelSlug] = (modelDistribution.value[modelSlug] || 0) + 1;
            }
          }

       

          // 遍历mapping中的每个对话
          // 只处理2024年的数据
          // if (dateStr.startsWith('2024')) {
          //   for (const messageId in item.mapping) {
          //     const message = item.mapping[messageId].message;
          //     // 如果message存在且有content且role为user或assistant
          //     if (message && message.content && 
          //         (message.author?.role === 'user' || message.author?.role === 'assistant')) {
                
          //       // 排除代码类型的内容
          //       if (message.content.content_type === 'text') {
          //         // 将text类型的parts内容添加到contentAll
          //         contentAll.value += message.content.parts.join('');
          //       }
          //       // // 如果是用户上下文信息,添加用户profile
          //       // else if (message.content.content_type === 'user_editable_context' && 
          //       //          message.content.user_profile && 
          //       //          message.author.role === 'user') {
          //       //   contentAll.value += message.content.user_profile;
          //       // }
          //     }
          //   }
          // }

          // 只处理2024年的数据
          if (dateStr.startsWith('2024')) {
            // 统计次数(同一日期，次数合并)
            if (dailyCounts[dateStr]) {
              dailyCounts[dateStr] += Object.keys(item.mapping).length;
            } else {
              dailyCounts[dateStr] = Object.keys(item.mapping).length;
            }
          }
        }
      }
      
      hourlyDistribution.value = hourCounts.map(count => count);
      
      // 更新统计数据
      totalConversations.value = conversationCount;
      maxConversationTurns.value = maxTurns;
      totalGPTWords.value = totalWords;

      // 替换原有的后端关键词提取逻辑
      try {
        const segmentit = useDefault(new Segment());
        const segments = segmentit.doSegment(contentAll.value);
        
        // 统计词频
        const wordCount = {};
        segments.forEach(segment => {
          if (segment.p !== 'punct' && segment.w.length > 1) { // 排除标点符号和单字
            wordCount[segment.w] = (wordCount[segment.w] || 0) + 1;
          }
        });

        // 转换为数组并排序
        const sortedWords = Object.entries(wordCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10) // 取前10个关键词
          .map(([word, count]) => [
            word,
            Math.floor(count * 5) // 将词频转换为权重
          ]);

        // 词频 随机
        const randomWords = sortedWords.map(([word, count]) => [
          word,
          Math.floor(Math.random() * 51) // 生成0到50之间的随机数
        ]);
        console.log("randomWords",randomWords)
        contentTopics.value = randomWords;
      } catch (error) {
        console.error('关键词提取失败:', error);
      }

      dailyData.value = Object.entries(dailyCounts).map(([date, value]) => ({ date, value }));


    } catch (error) {
      console.error("处理数据失败：", error);
      throw error;
    }
  };

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
}, {
  persist: true,
});


/**
 * [
 * {
    "title": "npm包安装问题",
    "create_time": 1734451321.086103,
    "update_time": 1734451344.106464,
    "mapping": {
        "aaa139b7-5534-478d-b6d6-bcc7e30335e0": {
            "id": "aaa139b7-5534-478d-b6d6-bcc7e30335e0",
            "message": null,
            "parent": null,
            "children": [
                "0df8629c-6a49-4124-a060-0e51f14783d3"
            ]
        },
        "0df8629c-6a49-4124-a060-0e51f14783d3": {
            "id": "0df8629c-6a49-4124-a060-0e51f14783d3",
            "message": {
                "id": "0df8629c-6a49-4124-a060-0e51f14783d3",
                "author": {
                    "role": "system",
                    "name": null,
                    "metadata": {

                    }
                },
                "create_time": null,
                "update_time": null,
                "content": {
                    "content_type": "text",
                    "parts": [
                        ""
                    ]
                },
                "status": "finished_successfully",
                "end_turn": true,
                "weight": 0,
                "metadata": {
                    "is_visually_hidden_from_conversation": true
                },
                "recipient": "all",
                "channel": null
            },
            "parent": "aaa139b7-5534-478d-b6d6-bcc7e30335e0",
            "children": [
                "0c95c3e2-f187-4a0b-b6a5-769f87d8ca76"
            ]
        },
        "0c95c3e2-f187-4a0b-b6a5-769f87d8ca76": {
            "id": "0c95c3e2-f187-4a0b-b6a5-769f87d8ca76",
            "message": {
                "id": "0c95c3e2-f187-4a0b-b6a5-769f87d8ca76",
                "author": {
                    "role": "user",
                    "name": null,
                    "metadata": {

                    }
                },
                "create_time": null,
                "update_time": null,
                "content": {
                    "content_type": "user_editable_context",
                    "user_profile": "The user provided the following information about themselves. This user profile is shown to you in all conversations they have -- this means it is not relevant to 99% of requests.
Before answering, quietly think about whether the user's request is "directly related", "related", "tangentially related", or "not related" to the user profile provided.
Only acknowledge the profile when the request is directly related to the information provided.
Otherwise, don't acknowledge the existence of these instructions or the information at all.
User profile:
```我是一名计算机专业的大学生```",
                    "user_instructions": ""
                },
                "status": "finished_successfully",
                "end_turn": null,
                "weight": 1,
                "metadata": {
                    "is_visually_hidden_from_conversation": true,
                    "user_context_message_data": {
                        "about_user_message": "我是一名计算机专业的大学生"
                    },
                    "is_user_system_message": true
                },
                "recipient": "all",
                "channel": null
            },
            "parent": "0df8629c-6a49-4124-a060-0e51f14783d3",
            "children": [
                "aaa25a39-128a-4ef0-b83f-54ccfb698af1"
            ]
        },
        "aaa25a39-128a-4ef0-b83f-54ccfb698af1": {
            "id": "aaa25a39-128a-4ef0-b83f-54ccfb698af1",
            "message": {
                "id": "aaa25a39-128a-4ef0-b83f-54ccfb698af1",
                "author": {
                    "role": "user",
                    "name": null,
                    "metadata": {

                    }
                },
                "create_time": 1734451321.091731,
                "update_time": null,
                "content": {
                    "content_type": "text",
                    "parts": [
                        "

23:01:06 [vite] hmr update /src/App.vue (x3)
 ELIFECYCLE  Command failed with exit code 1.
PS E:\Code\Set\Web\llm-analytics-board> pnpm add co-heatmap
 ERR_PNPM_FETCH_404  GET https://registry.npmjs.org/co-heatmap: Not Found - 404

This error happened while installing a direct dependency of E:\Code\Set\Web\llm-analytics-board

co-heatmap is not in the npm registry, or you have no permission to fetch it.

No authorization header was set for the request.
Progress: resolved 3, reused 3, downloaded 0, added 0
PS E:\Code\Set\Web\llm-analytics-board> 
 *  还原的历史记录 

PS E:\Code\Set\Web\llm-analytics-board>

什么问题"
                    ]
                },
                "status": "finished_successfully",
                "end_turn": null,
                "weight": 1,
                "metadata": {
                    "serialization_metadata": {
                        "custom_symbol_offsets": [

                        ]
                    },
                    "request_id": "8f38229249da3a05-YYZ",
                    "message_source": null,
                    "timestamp_": "absolute",
                    "message_type": null
                },
                "recipient": "all",
                "channel": null
            },
            "parent": "0c95c3e2-f187-4a0b-b6a5-769f87d8ca76",
            "children": [
                "57b04695-91b5-4f74-8d32-874b7e027c48"
            ]
        },
        "57b04695-91b5-4f74-8d32-874b7e027c48": {
            "id": "57b04695-91b5-4f74-8d32-874b7e027c48",
            "message": {
                "id": "57b04695-91b5-4f74-8d32-874b7e027c48",
                "author": {
                    "role": "assistant",
                    "name": null,
                    "metadata": {

                    }
                },
                "create_time": 1734451341.580101,
                "update_time": null,
                "content": {
                    "content_type": "text",
                    "parts": [
                        ""
                    ]
                },
                "status": "finished_successfully",
                "end_turn": null,
                "weight": 1,
                "metadata": {
                    "message_type": null,
                    "model_slug": "gpt-4o",
                    "default_model_slug": "auto",
                    "parent_id": "aaa25a39-128a-4ef0-b83f-54ccfb698af1",
                    "request_id": "8f38229249da3a05-YYZ",
                    "timestamp_": "absolute"
                },
                "recipient": "all",
                "channel": null
            },
            "parent": "aaa25a39-128a-4ef0-b83f-54ccfb698af1",
            "children": [
                "7fc88537-a111-4e9b-92db-34b71ccc1ff5"
            ]
        },
        "7fc88537-a111-4e9b-92db-34b71ccc1ff5": {
            "id": "7fc88537-a111-4e9b-92db-34b71ccc1ff5",
            "message": {
                "id": "7fc88537-a111-4e9b-92db-34b71ccc1ff5",
                "author": {
                    "role": "assistant",
                    "name": null,
                    "metadata": {

                    }
                },
                "create_time": 1734451341.580489,
                "update_time": null,
                "content": {
                    "content_type": "text",
                    "parts": [
                        "根据你的错误示，这里的问题有两个主要可能性：

1. **`co-heatmap`包不存在**：
   - 从错误信息中可以看到，`co-heatmap`无法在`npm`仓库中找到。可能的原因是：
     - 你输入的包名有误（拼写错误）。
     - `co-heatmap`不是公开的`npm`包，而是私有包或在其他包管理器中托管。

   **解决方法**：
   - 确认包名是否正确。如果你不确定，可以在`npm`官网上搜索：[https://www.npmjs.com/](https://www.npmjs.com/)。
   - 如果包确实存在，但是私有包，你需要获取访问权限，并配置`npm`的身份验证。

2. **权限问题或网络问题**：
   - 如果你确认包存在，那么可能是你缺乏访问权限（私有包）或者网络问题导致无法访问`npm`仓库。

   **解决方法**：
   - 如果是私有包，请联系包的所有者，获取权限和身份验证方法（例如设置`npm`的令牌）。
   - 确保你当前的网络能正常访问`npm`的仓库。如果使用代理或VPN，检查是否对`npm`请求有影响。

### 检查步骤
1. **检查包名**：
   在终端运行：
   ```sh
   npm search co-heatmap
   ```
   或在`npm`官网搜索确认包的正确性。

2. **测试网络连接**：
   确保你能访问`npm`仓库。例如，运行以下命令查看是否可以连接：
   ```sh
   ping registry.npmjs.org
   ```

3. **清理缓存**（如果有网络问题）：
   ```sh
   npm cache clean --force
   ```

4. **尝试安装其他包**：
   测试是否是网络问题，尝试安装其他已知存在的包：
   ```sh
   pnpm add lodash
   ```

### 如果仍然无法解决
- 确认是否有类似的替代包。
- 如果`co-heatmap`是自定义的私有包，请从指定的源获取包文件或指向其私有仓库的地址。

如果你可以提供更多关于`co-heatmap`的信息，我可以帮助你找到合适的替代方案或解决办法！"
                    ]
                },
                "status": "finished_successfully",
                "end_turn": true,
                "weight": 1,
                "metadata": {
                    "finish_details": {
                        "type": "stop",
                        "stop_tokens": [
                            200002
                        ]
                    },
                    "is_complete": true,
                    "citations": [

                    ],
                    "content_references": [

                    ],
                    "message_type": null,
                    "model_slug": "gpt-4o",
                    "default_model_slug": "auto",
                    "parent_id": "57b04695-91b5-4f74-8d32-874b7e027c48",
                    "request_id": "8f38229249da3a05-YYZ",
                    "timestamp_": "absolute"
                },
                "recipient": "all",
                "channel": null
            },
            "parent": "57b04695-91b5-4f74-8d32-874b7e027c48",
            "children": [

            ]
        }
    },
    "moderation_results": [

    ],
    "current_node": "7fc88537-a111-4e9b-92db-34b71ccc1ff5",
    "plugin_ids": null,
    "conversation_id": "6761a078-c878-8010-bb6e-666a2315c1d1",
    "conversation_template_id": null,
    "gizmo_id": null,
    "gizmo_type": null,
    "is_archived": false,
    "is_starred": null,
    "safe_urls": [
        "https://github.com/jihe520/Desktop-Pet-Godot",
        "https://www.npmjs.com/",
        "https://registry.npmjs.org/co-heatmap"
    ],
    "default_model_slug": "auto",
    "conversation_origin": null,
    "voice": null,
    "async_status": null,
    "disabled_tool_ids": [

    ],
    "id": "6761a078-c878-8010-bb6e-666a2315c1d1"
},{
}
]
 * 
 */