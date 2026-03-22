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
└── other/
    └── xxx.png
```

## 自动功能

### GitHub Actions 工作流

每次推送到 `images/` 目录时，会自动触发工作流：
- 扫描所有图片文件
- 按年月生成索引文件
- 自动提交索引到仓库

### 索引生成脚本

运行 `node scripts/generate-index.js` 可以手动生成索引。

## 使用方式

### 访问图片

图片通过 Cloudflare Worker 代理访问：
- 代理 URL: `https://your-worker.workers.dev/proxy/image/2026/02/14/20260214144502.jpg`

### 查询索引

- 总索引：`/index/master.json`
- 月度索引：`/index/2026-02.json`

## 部署

1. 创建 Cloudflare Worker
2. 配置环境变量：
   - `GITHUB_OWNER`: GitHub 用户名
   - `GITHUB_REPO`: blogfile
   - `GITHUB_BRANCH`: main
   - `GITHUB_TOKEN`: GitHub Token
3. 部署 Worker

## License

MIT
