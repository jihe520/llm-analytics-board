<div align="center">
  <h1>LLMCard</h1>
  <p>Generate analysis cards from LLM chat history in local browser</p>
  <img src="public/logo.png" alt="LLMCard Logo" width="200" height="200">
</div>

English | [简体中文](./README.md)

## ✨ Features

- 🔒 Pure local analysis, privacy protection
- 📊 Conversation data visualization

## 🗺️ Roadmap

- 🎨 Theme enhancement
- 🌙 Dark mode support
- 🤖 More LLM model support
- ⚙️ More customization options

## 🛠️ Tech Stack

- **Frontend Framework**

  - Vue 3 + Vite
  - Tailwind CSS
  - Chart.js
  - Cal-heatmap

- **Deployment**
  - Vercel (Hosting)
  - Cloudflare (DNS)
  - Aliyun (Domain Service)

## 📦 Development Process

1. **Planning & Design**

   - Brainstorming with Notion
   - Collecting references and technical docs

2. **Quick Prototyping**

   - Generated project structure with bolt.new
   - Code optimization using cursor + copilot + cline

3. **Technical Adjustments**
   - Changed nodejieba segmentation to pure frontend implementation
   - Optimized deployment process for better access in China

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

📝 Development Notes
Development cycle: 3 days
Main challenges: Frontend learning project, familiarizing with libraries and deployment solutions
Special note: First attempt at Vercel + CF + Aliyun domain deployment setup

🌍 Live Preview

https://llm-analytics-board.vercel.app/

https://www.llmcard.xyz/

📄 License
MIT License

---

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

While this project uses Vue.js, Vite supports many popular JS frameworks. [See all the supported frameworks](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

## Deploy Your Own

Deploy your own Vite project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?demo-description=Vite%2FVue.js%20site%20that%20can%20be%20deployed%20to%20Vercel&demo-title=Vite%20-%20Vue&repository-name=vite-vue)

_Live Example: https://vite-vue-template.vercel.app_

### Deploying From Your Terminal

You can deploy your new Vite project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
$ vercel
```
