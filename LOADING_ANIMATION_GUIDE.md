# 加载动画自定义指南

## 📁 文件位置

所有加载动画相关的文件都在以下位置：

```
public/
  ├── yui-loading.gif      # 加载动画的动图
  └── loading-bg.jpg       # 加载动画的背景图

src/layouts/Layout.astro   # 加载动画的主要代码
```

## 🎨 如何更换背景图

### 方法一：替换现有文件（推荐）

1. 准备一张新背景图（建议尺寸：1920x1080 或更大，格式：JPG/PNG）
2. 将图片重命名为 `loading-bg.jpg`
3. 替换 `public/loading-bg.jpg` 文件
4. 刷新页面即可看到新背景

### 方法二：使用不同的文件名

1. 将新背景图放到 `public/` 目录（例如：`public/my-bg.jpg`）
2. 打开 `src/layouts/Layout.astro`
3. 找到 `id="page-loader"` 的 `div` 标签
4. 修改 `background-image: url('/loading-bg.jpg')` 为 `background-image: url('/my-bg.jpg')`
5. 同时修改预加载标签：
   ```html
   <link rel="preload" href="/my-bg.jpg" as="image" type="image/jpeg" />
   ```
6. 修改JavaScript中的预加载：
   ```javascript
   bgImg.src = '/my-bg.jpg';
   ```

## 🎭 如何更换加载动图

### 方法一：替换现有文件（推荐）

1. 准备一个新动图（建议格式：GIF，大小：500KB以内）
2. 将图片重命名为 `yui-loading.gif`
3. 替换 `public/yui-loading.gif` 文件
4. 刷新页面即可看到新动图

### 方法二：使用不同的文件名

步骤与更换背景图类似，需要修改：
- 预加载标签中的 `href="/yui-loading.gif"`
- `<img>` 标签中的 `src="/yui-loading.gif"`
- JavaScript中的 `gifImg.src = '/yui-loading.gif'`

## 🎯 如何修改加载文字

打开 `src/layouts/Layout.astro`，找到：

```html
<div class="text-2xl font-bold text-pink-600 dark:text-pink-300 animate-bounce drop-shadow-lg">
  加载中喵~
</div>
```

修改文字内容即可，例如：`加载中...`、`Loading...`、`稍等片刻~`

## 🎨 如何调整样式

### 1. 调整遮罩层透明度

找到这行代码：

```html
<div class="absolute inset-0 bg-white/40 dark:bg-black/50"></div>
```

修改 `bg-white/40`（白色透明度40%）和 `dark:bg-black/50`（暗色模式黑色透明度50%）
- 数值范围：0-100，数值越小越透明

### 2. 调整动图大小

找到：

```html
<img ... class="h-56 w-auto rounded-2xl" ... />
```

修改 `h-56`（高度）：
- `h-48`：更小
- `h-64`：更大
- `h-72`：再大一些

### 3. 调整文字颜色

找到文字的 `class`，修改：
- `text-pink-600`：亮色模式颜色
- `dark:text-pink-300`：暗色模式颜色

可用颜色：`red`, `blue`, `green`, `purple`, `pink`, `yellow` 等

### 4. 调整进度条

找到进度条代码：

```html
<div class="w-48 h-2.5 ...">
```

- `w-48`：宽度
- `h-2.5`：高度

## ⏱️ 如何调整加载时间

找到 JavaScript 代码：

```javascript
setTimeout(showPage, 5000);
```

修改 `5000`（毫秒）：
- `3000`：最少等待3秒
- `5000`：最少等待5秒（推荐，给背景图足够加载时间）

## 🌟 如何添加更多装饰元素

### 添加更多星星

在 `<div class="relative">` 容器内添加：

```html
<div class="absolute top-10 left-20 star animate-sparkle delay-100"></div>
```

调整位置：`top-10`（上边距）、`left-20`（左边距）

### 添加其他装饰

可以在动图容器内添加任意HTML元素，例如：

```html
<div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
  <span class="text-white text-sm">✨</span>
</div>
```

## 🔧 常见问题

### 1. 背景图不显示

- 检查文件路径是否正确
- 检查文件名是否匹配
- 清除浏览器缓存后重试

### 2. 动图加载很慢

- 压缩GIF文件大小（建议 < 500KB）
- 使用在线工具：https://ezgif.com/optimize

### 3. 文字看不清

- 增加遮罩层透明度（例如：`bg-white/60`）
- 增加文字阴影：`drop-shadow-xl`
- 使用更深的文字颜色

### 4. 暗色模式下效果不好

调整暗色模式相关的class（带 `dark:` 前缀的），例如：
- `dark:bg-black/50`：暗色模式遮罩
- `dark:text-pink-300`：暗色模式文字颜色

## 📝 完整修改流程示例

假设你想换成蓝色的加载背景：

1. 准备新背景图 `blue-bg.jpg`
2. 放到 `public/` 目录
3. 打开 `src/layouts/Layout.astro`
4. 修改背景图路径：
   ```html
   style="background-image: url('/blue-bg.jpg'); ..."
   ```
5. 修改预加载：
   ```html
   <link rel="preload" href="/blue-bg.jpg" as="image" type="image/jpeg" />
   ```
6. 修改JavaScript：
   ```javascript
   bgImg.src = '/blue-bg.jpg';
   ```
7. 保存文件，刷新浏览器

## 💡 提示

- 修改后如果没看到变化，尝试硬刷新（Ctrl+Shift+R 或 Cmd+Shift+R）
- 背景图建议使用高分辨率（至少1920x1080）
- 动图建议使用压缩后的GIF（< 500KB）
- 可以在浏览器开发者工具中实时调试样式

---

**享受自定义你的加载动画吧！** 🎉
