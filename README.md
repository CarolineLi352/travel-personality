# Travel Personality

这是 Travel Personality 原版仓库，侧重目的地匹配、双语体验与好友玩法。为 Hackathon 设计的 V2 已迁移到独立仓库并单独部署。

## 版本导航

| | 原版 | V2 Hackathon 版 |
| --- | --- | --- |
| 代码 | 当前仓库 | [travel-personality-v2](https://github.com/CarolineLi352/travel-personality-v2) |
| 技术 | HTML / CSS / JavaScript | Next.js / React / TypeScript |
| 问卷 | 7 道动态分支题 | 16 道互联网行为题 |
| 结果 | 6 种人格、18 个目的地 | 9 种人格代码、8 个虚构世界、24 个现实目的地 |
| 分享 | 好友匹配、海报二维码 | 固定尺寸人格海报与二维码、结果链接、邀请链接 |
| 运行方式 | 静态服务器 | 独立 Next.js 应用 |
| 在线体验 | [V1](https://carolineli352.github.io/travel-personality/) | [V2](https://carolineli352.github.io/travel-personality-v2/) |

两版拥有独立的仓库、依赖、自动化测试和 GitHub Pages 地址。

## 快速开始

### 原版

原版页面不需要安装依赖：

```bash
python3 -m http.server 5173
```

访问 `http://localhost:5173`。线上版本：[carolineli352.github.io/travel-personality](https://carolineli352.github.io/travel-personality/)。

### V2 Hackathon 版

V2 已迁移到独立仓库，需要 Node.js 20 或更高版本：

```bash
git clone git@github.com:CarolineLi352/travel-personality-v2.git
cd travel-personality-v2
npm ci
npm run dev
```

访问 `http://localhost:3000`。V2 不需要 API Key 或分析后端。

## 原版功能

- 6 种旅行人格与 7 道动态分支题
- 每种人格对应 3 个目的地，共 18 个候选
- 根据预算、美食、文化、自然、舒适度和短途倾向继续细分目的地
- 中文和英文界面，支持移动端与桌面端
- 机票、酒店和租车搜索入口
- 好友匹配链接与旅行搭子指数
- 1080 × 1440 PNG 结果海报及本地生成的二维码
- Open Graph、社交预览和多平台链接分享适配

### 原版人格与目的地

| 旅行人格 | 目的地 |
| --- | --- |
| 周末闪现人 | 福冈、台北、新加坡 |
| 美食雷达 | 曼谷、墨西哥城、博洛尼亚 |
| 捡漏小算盘 | 清迈、河内、第比利斯 |
| 酒店躺平人 | 京都、巴厘岛、马拉喀什 |
| 行程表掌控者 | 首尔、巴黎、伊斯坦布尔 |
| 自由断网人 | 冲绳、皇后镇、雷克雅未克 |

## 项目结构

```text
.
├── index.html              # 原版页面
├── styles.css              # 原版样式
├── script.js               # 原版问卷、匹配、分享与海报逻辑
├── assets/                 # 原版人格与目的地素材
├── vendor/                 # 本地二维码依赖及许可证
├── tests/                  # 原版 Playwright 测试
├── scripts/build-docs.sh   # 原版发布目录生成脚本
├── docs/                   # 原版 GitHub Pages 发布目录，不是项目文档目录
└── .github/workflows/      # 原版 CI
```

## 测试

首次运行需要安装根目录依赖和 Chromium：

```bash
npm ci
npx playwright install chromium
```

运行测试：

```bash
npm test
```

测试覆盖 6 种人格、18 个目的地、双语切换、好友匹配链接和海报二维码。V2 的完整测试保留在其独立仓库。

## 原版发布

修改根目录的原版文件后：

```bash
./scripts/build-docs.sh
```

脚本会把页面、favicon、`assets/` 和 `vendor/` 同步到 `docs/`。当前 GitHub Pages 使用 `main` 分支的 `/docs` 目录发布。

V2 使用独立 GitHub Actions 部署，详见 [V2 README](https://github.com/CarolineLi352/travel-personality-v2#部署到-github-pages)。

## 隐私与依赖

- 两个版本的答题和人格计算都在浏览器本地完成
- 分享链接会包含复现结果或匹配所需的紧凑数据，请只发给希望邀请的人
- 原版二维码由本地保存的 `qrcode-generator 1.4.4` 生成，不调用第三方二维码服务
- 结果仅供娱乐，不构成心理评估或旅行安全建议
