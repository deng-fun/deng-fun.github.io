# AGENTS.md

## 项目概述
astro-koharu 是一个基于 Astro 5.x 的博客项目，使用 React 集成交互组件、Tailwind CSS 样式，兼容 Hexo 博客内容。

## 技术栈
- **框架**: Astro 5.x + React 集成
- **样式**: Tailwind CSS 4.x
- **内容**: Astro Content Collections
- **动画**: Motion
- **状态**: Nanostores
- **包管理**: pnpm

## 目录结构
```plain
src/
├── components/   # React & Astro 组件
├── content/blog/  # Markdown/MDX 文章
├── layouts/      # 页面布局
├── pages/        # 文件路由
├── lib/          # 工具函数
├── hooks/        # React hooks
├── store/        # 状态管理
├── constants/    # 配置常量
```

## 关键配置
- 站点配置: `config/site.yaml`
- 运行时配置: `src/constants/site-config.ts`
- 布局入口: `src/layouts/Layout.astro`

## 组件开关配置
在 `config/site.yaml` 中控制以下组件的显示：
- `live2d.enabled`: Live2D 看板娘（左下角）
- `musicPlayer.enabled`: 音乐播放器（右下角）

设置为 `true` 启用，`false` 禁用。

## 运行命令
```bash
pnpm dev              # 开发服务器
pnpm build            # 生产构建
pnpm preview          # 预览构建
pnpm lint:fix         # 自动修复 lint
```
