# 加载背景图管理指南

## 📁 文件位置

所有背景图存放在：

```
public/loading-backgrounds/
  ├── bg-1.png        # 背景图1
  ├── bg-2.jpg        # 背景图2
  ├── bg-3.jpg        # 背景图3
  └── config.json     # 配置文件（可选）
```

## 🎨 如何添加新背景图

### 步骤1：准备图片
- 支持格式：JPG、PNG、WebP
- 建议尺寸：1920x1080 或更大
- 建议大小：500KB - 2MB（太大影响加载速度）

### 步骤2：添加图片文件
1. 将图片放入 `public/loading-backgrounds/` 目录
2. 重命名为 `bg-4.jpg`、`bg-5.jpg` 等（按序号递增）

### 步骤3：修改代码
打开 `src/layouts/Layout.astro`，找到以下代码：

```javascript
// 背景图列表（手动管理这个数组）
const backgrounds = [
  '/loading-backgrounds/bg-1.png',
  '/loading-backgrounds/bg-2.jpg',
  '/loading-backgrounds/bg-3.jpg'
];
```

添加新的背景图路径：

```javascript
const backgrounds = [
  '/loading-backgrounds/bg-1.png',
  '/loading-backgrounds/bg-2.jpg',
  '/loading-backgrounds/bg-3.jpg',
  '/loading-backgrounds/bg-4.jpg',  // 新添加的背景图
];
```

### 步骤4：保存并刷新
- 保存文件
- 刷新浏览器即可看到效果

## 🗑️ 如何删除背景图

### 步骤1：删除图片文件
从 `public/loading-backgrounds/` 目录删除不需要的图片文件

### 步骤2：修改代码
在 `src/layouts/Layout.astro` 中删除对应的路径：

```javascript
const backgrounds = [
  '/loading-backgrounds/bg-1.png',
  // '/loading-backgrounds/bg-2.jpg',  // 删除这行
  '/loading-backgrounds/bg-3.jpg',
];
```

## 🔄 如何修改背景图顺序

只需在数组中调整顺序即可：

```javascript
const backgrounds = [
  '/loading-backgrounds/bg-3.jpg',  // 放到第一位
  '/loading-backgrounds/bg-1.png',
  '/loading-backgrounds/bg-2.jpg',
];
```

## 📝 完整示例

假设你想添加一张新背景图 `anime-bg.jpg`：

1. 将图片放到 `public/loading-backgrounds/anime-bg.jpg`

2. 打开 `src/layouts/Layout.astro`，找到背景图数组：

```javascript
const backgrounds = [
  '/loading-backgrounds/bg-1.png',
  '/loading-backgrounds/bg-2.jpg',
  '/loading-backgrounds/bg-3.jpg',
];
```

3. 添加新路径：

```javascript
const backgrounds = [
  '/loading-backgrounds/bg-1.png',
  '/loading-backgrounds/bg-2.jpg',
  '/loading-backgrounds/bg-3.jpg',
  '/loading-backgrounds/anime-bg.jpg',  // 新增
];
```

4. 保存文件，刷新浏览器

## 🎯 工作原理

- 页面加载时，会从背景图数组中**随机选择**一张
- 背景图会立即开始加载
- 进度条会模拟加载进度（0% → 100%）
- 页面完全加载后，加载动画会淡出

## 💡 优化建议

1. **压缩图片**
   - 使用 TinyPNG、Squoosh 等工具压缩图片
   - 保持图片质量的同时减小文件大小

2. **统一命名**
   - 使用统一的命名规范，如 `bg-1.jpg`、`bg-2.jpg`
   - 便于管理和识别

3. **控制数量**
   - 建议保留 3-5 张背景图
   - 太多会增加维护成本

4. **测试加载速度**
   - 在不同网络环境下测试
   - 确保背景图能快速加载

## 🛠️ 故障排查

### 背景图不显示
1. 检查文件路径是否正确
2. 检查文件名是否匹配
3. 清除浏览器缓存后重试
4. 检查文件格式是否支持

### 背景图加载慢
1. 压缩图片大小
2. 使用 WebP 格式（更小）
3. 减少背景图数量

### 进度条卡住
1. 检查浏览器控制台是否有错误
2. 检查 JavaScript 代码是否正确
3. 清除缓存后重试

## 📋 快速参考

| 操作 | 文件位置 | 说明 |
|------|---------|------|
| 背景图目录 | `public/loading-backgrounds/` | 存放所有背景图 |
| 代码位置 | `src/layouts/Layout.astro` | 修改背景图数组 |
| 配置文件 | `public/loading-backgrounds/config.json` | 可选的配置文件 |

## 🎨 自定义样式

如果想修改进度条样式，可以在 `src/layouts/Layout.astro` 中找到：

```html
<!-- 进度百分比文字 -->
<div id="loading-percent" class="text-7xl font-bold text-white drop-shadow-2xl">
  0%
</div>

<!-- 进度条 -->
<div class="w-80 h-3 bg-white/20 ...">
  <div id="loading-progress" class="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 ...">
  </div>
</div>
```

可以修改：
- 字体大小：`text-7xl`
- 文字颜色：`text-white`
- 进度条宽度：`w-80`
- 进度条高度：`h-3`
- 渐变颜色：`from-pink-400 via-purple-400 to-blue-400`

---

**享受自定义你的加载动画吧！** 🎉
