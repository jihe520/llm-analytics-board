import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    // 自定义规则
    rules: {
      'vue/multi-word-component-names': 'off', // 禁用多单词组件名规则
    },
    ignores: [
      'src/utils/GPThistory.js', // 忽略单个文件
    ],
  },
];
