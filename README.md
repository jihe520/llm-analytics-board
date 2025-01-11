<div align="center">
  <h1>LLMCard</h1>
  <p>通过上传大模型对话历史，本地浏览器生成分析卡片</p>
  <img src="public/logo.png" alt="LLMCard Logo" width="200" height="200">
</div>

[English](./README.en.md) | 简体中文

## ✨ 特性

- 🔒 纯本地分析，保护隐私
- 📊 可视化对话数据

## 🗺️ Roadmap

- 🎨 美化主题样式
- 🌙 夜间模式支持
- 🤖 扩展更多LLM模型支持
- ⚙️ 增加更多自定义选项

## 🛠️ 技术栈

- **前端框架**

  - Vue 3 + Vite
  - Tailwind CSS
  - Chart.js
  - Cal-heatmap

- **部署方案**
  - Vercel (托管)
  - Cloudflare (DNS解析)
  - 阿里云 (域名服务)

## 📦 开发过程

1. **规划设计**

   - 使用 Notion 进行头脑风暴
   - 收集参考资料和技术文档

2. **快速成型**

   - 利用 bolt.new 生成项目框架
   - 使用 cursor + copilot + cline 进行代码优化

3. **技术调整**
   - 将 nodejieba 分词改为纯前端实现
   - 优化部署流程确保国内访问速度

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

```

📝 开发笔记
开发周期：3天
主要挑战：前端学习作品，库的熟悉度和部署方案的摸索
特别说明：首次尝试 Vercel + CF + 阿里域名的部署方案

🌍 在线预览

https://llm-analytics-board.vercel.app/

https://www.llmcard.xyz/

📄 License
MIT License

---

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

While this project uses Vue.js, Vite supports many popular JS frameworks. [See all the supported frameworks](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

## Deploy Your Own

Deploy your own Vite project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](<[https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/vite&template=vite](https://vercel.com/new/clone?demo-description=Vite%2FVue.js%20site%20that%20can%20be%20deployed%20to%20Vercel&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F2T4BUF3mEBKPJF3jcjU6nS%2F0d4a02e7c48091d13814a4ab513e8734%2FScreen_Shot_2022-04-13_at_10.05.56_PM.png&demo-title=Vite%20-%20Vue&demo-url=https%3A%2F%2Fvite-vue-template.vercel.app%2F&from=templates&project-name=Vite%20-%20Vue&repository-name=vite-vue&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel%2Ftree%2Fmain%2Fexamples%2Fvite&skippable-integrations=1)>)

_Live Example: https://vite-vue-template.vercel.app_

### Deploying From Your Terminal

You can deploy your new Vite project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
$ vercel
```
