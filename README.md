# Blog File Storage

按时间组织的博客图片和文件存储仓库。

## 目录结构

```
images/
├── index.json              # 总索引
├── 2026/
│   ├── 03/
│   │   ├── index.json     # 月度索引
│   │   └── 22/
│   │       └── xxx.png
│   └── 04/
│       └── index.json
```

## 自动功能

- ✅ 自动按日期组织文件（YYYY/MM/DD/文件名）
- ✅ 自动生成图片索引（每次推送触发）
- ✅ 月度索引文件方便快速查询

## 使用方式

### 上传图片

直接推送到 `images/YYYY/MM/DD/` 目录，或手动上传触发工作流。

### 获取图片列表

- 总列表：`https://raw.githubusercontent.com/lijiaxu2021/blogfile/main/images/index.json`
- 月度列表：`https://raw.githubusercontent.com/lijiaxu2021/blogfile/main/images/YYYY/MM/index.json`

### 访问图片

配合 Cloudflare Worker 代理访问（需配置）。
