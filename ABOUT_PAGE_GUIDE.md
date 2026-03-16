# 关于页面编辑指南

## 📁 文件位置

关于页面的核心文件：

```
src/pages/about.md    # 关于页面内容（Markdown格式）
```

## 📝 如何编辑关于页面

### 方法一：直接编辑 Markdown 文件

打开 `src/pages/about.md` 文件，使用 Markdown 语法编辑内容。

### 文件结构说明

```markdown
---
layout: ../layouts/AboutLayout.astro    # 使用的布局模板
title: "About"                          # 页面标题
date: 2026-01-30                        # 日期
description: "关于我？"                  # 页面描述
---

### Hi there 👋

<!-- 这里开始是页面内容 -->
...
```

## ✏️ 编辑示例

### 1. 修改标题和描述

```markdown
---
layout: ../layouts/AboutLayout.astro
title: "关于我"                    # 改成你想要的标题
date: 2026-01-30
description: "个人介绍页面"        # 改成你想要的描述
---
```

### 2. 添加个人信息

```markdown
### 你好，我是XXX 👋

我是一名XXX工程师，喜欢XXX。

- 🎯 专业领域：XXX
- 📍 所在地：XXX
- 💼 工作经验：X年
- 🎓 教育背景：XXX
```

### 3. 添加联系方式

```markdown
## 📬 联系方式

- GitHub: [你的GitHub](https://github.com/yourusername)
- Email: your.email@example.com
- Blog: [我的博客](https://yourblog.com)
```

### 4. 添加技能列表

```markdown
## 🛠️ 技能

### 编程语言
- JavaScript / TypeScript
- Python
- Go

### 框架和工具
- React / Vue / Angular
- Node.js / Express
- Docker / Kubernetes
```

### 5. 添加项目经历

```markdown
## 🚀 项目经历

### 项目1
- **技术栈**: React + TypeScript
- **描述**: 这是一个XXX项目
- **链接**: [GitHub](https://github.com/...)

### 项目2
- **技术栈**: Vue + Node.js
- **描述**: 这是一个XXX项目
- **链接**: [在线演示](https://...)
```

### 6. 添加兴趣爱好

```markdown
## 🎨 兴趣爱好

- 🎵 音乐：喜欢听XXX
- 📚 阅读：最近在看XXX
- 🎮 游戏：喜欢玩XXX
- ✈️ 旅行：去过XXX
```

## 🎨 Markdown 语法速查

### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 文本样式
```markdown
**粗体**
*斜体*
~~删除线~~
`代码`
```

### 列表
```markdown
- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2
```

### 链接和图片
```markdown
[链接文字](URL)
![图片描述](图片URL)
```

### 引用
```markdown
> 这是一段引用文字
```

### 分割线
```markdown
---
```

### 表格
```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
```

### 代码块
````markdown
```javascript
function hello() {
  console.log('Hello World');
}
```
````

## 🔧 高级功能

### 1. 自定义 HTML

Markdown 支持 HTML 标签：

```html
<div style="color: red; font-size: 20px;">
  这是自定义样式的文字
</div>
```

### 2. 嵌入外部内容

#### 嵌入视频
```html
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

#### 嵌入社交媒体
```html
<!-- Twitter -->
<blockquote class="twitter-tweet">
  <a href="https://twitter.com/..."></a>
</blockquote>

<!-- GitHub Gist -->
<script src="https://gist.github.com/.../.../embed.js"></script>
```

### 3. 使用 Emoji

```markdown
:smile: :heart: :rocket: :star:

或者直接使用 Unicode：
😀 ❤️ 🚀 ⭐
```

## 📊 GitHub Stats 卡片

当前页面包含了 GitHub 统计卡片，如果你想修改：

### 修改用户名
将 URL 中的 `username=Radekyspec` 改成你的 GitHub 用户名：

```markdown
<img src="https://github-readme-stats-lemon-beta.vercel.app/api/?username=你的用户名&count_private=true&show_icons=true&theme=dracula" width="48%" align="right">
```

### 修改主题
将 `theme=dracula` 改成其他主题：
- `theme=default`
- `theme=dark`
- `theme=radical`
- `theme=merko`
- `theme=gruvbox`
- `theme=tokyonight`

更多主题参考：[github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

## 🎯 完整示例

```markdown
---
layout: ../layouts/AboutLayout.astro
title: "关于我"
date: 2026-01-30
description: "个人介绍"
---

### 你好，我是小明 👋

我是一名热爱编程的全栈工程师。

## 📊 基本信息

- 🎯 **专业领域**: Web开发、系统设计
- 📍 **所在地**: 北京
- 💼 **工作经验**: 5年
- 🎓 **教育背景**: 计算机科学硕士

## 🛠️ 技能栈

### 前端
- React / Vue / Angular
- TypeScript / JavaScript
- Tailwind CSS / SCSS

### 后端
- Node.js / Express
- Python / Django
- Go / Gin

### 工具
- Git / GitHub
- Docker / Kubernetes
- VS Code / Vim

## 🚀 精选项目

### 个人博客系统
- **技术栈**: Next.js + TypeScript + Tailwind CSS
- **描述**: 一个现代化的个人博客系统
- **链接**: [GitHub](https://github.com/...) | [在线演示](https://...)

### 开源贡献
- 贡献过 [项目A](https://github.com/...)
- 维护着 [项目B](https://github.com/...)

## 📬 联系方式

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Blog: [我的博客](https://yourblog.com)

---

## 📈 GitHub Stats

<img src="https://github-readme-stats-lemon-beta.vercel.app/api/?username=yourusername&count_private=true&show_icons=true&theme=dracula" width="48%" align="right">
<img src="https://github-readme-streak-stats-rust-tau.vercel.app/?user=yourusername&theme=dark" width="48%">
```

## 💡 编辑技巧

1. **实时预览**
   - 使用支持 Markdown 预览的编辑器（如 VS Code）
   - 安装 Markdown 预览插件

2. **保持简洁**
   - 内容不要太多，保持重点突出
   - 使用分割线分隔不同部分
   - 善用列表和标题组织内容

3. **个性化**
   - 使用 Emoji 增加趣味性
   - 添加个人照片或头像
   - 展示真实的自己

4. **定期更新**
   - 保持内容的新鲜度
   - 更新项目经历和技能
   - 更新联系方式

## 🔍 调试技巧

### 查看修改效果
1. 保存 `about.md` 文件
2. 刷新浏览器
3. 访问 `/about` 页面查看效果

### 常见问题

**Q: 修改后没有生效？**
A: 清除浏览器缓存（Ctrl+Shift+R），或者重启开发服务器

**Q: Markdown 语法不生效？**
A: 检查语法是否正确，确保空格和换行符正确

**Q: 图片无法显示？**
A: 检查图片 URL 是否正确，或使用本地图片路径

**Q: 想要修改页面样式？**
A: 可以编辑 `src/layouts/AboutLayout.astro` 文件，但这需要了解一些 CSS 和 Astro 知识

## 📚 相关资源

- [Markdown 语法指南](https://www.markdownguide.org/)
- [GitHub Markdown 指南](https://docs.github.com/en/get-started/writing-on-github)
- [Emoji 速查表](https://emojipedia.org/)
- [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)

---

**开始编辑你的关于页面吧！** ✨
