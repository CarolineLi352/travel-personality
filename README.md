# Travel Personality

一个可直接在浏览器运行的旅行人格测试。用户完成 7 道动态分支题后，会获得旅行人格、匹配目的地和可分享的结果海报。

[在线体验](https://carolineli352.github.io/travel-personality/)

## 主要功能

- 6 种旅行人格与 7 题动态分支问卷
- 根据全部答案加权计算人格，并用次级偏好继续细分目的地
- 每种人格对应 3 个目的地，共 18 个候选，覆盖亚洲、欧洲、北美、非洲和大洋洲
- 结果页根据真实计分展示 3 条“为什么推荐这里”，同分时按完整答题路径稳定排序
- 结果页提供与目的地对应的机票、酒店和租车入口；租车会预填取还车地点与可调整日期
- 中文和英文界面，支持移动端与桌面端
- 一键复制好友匹配链接，好友答题后显示旅行搭子指数
- 生成 1080 × 1440 PNG 结果海报
- 海报内置好友匹配二维码，扫码即可进入测试
- 内置 favicon、Open Graph 与大图社交预览，适配微信、Telegram、Discord 等链接分享场景

答题、计分、目的地匹配、好友匹配和二维码生成均在浏览器本地完成，不需要账号、API Key 或后端服务。

## 人格与目的地

| 旅行人格 | 目的地 |
| --- | --- |
| 周末闪现人 | 福冈、台北、新加坡 |
| 美食雷达 | 曼谷、墨西哥城、博洛尼亚 |
| 捡漏小算盘 | 清迈、河内、第比利斯 |
| 酒店躺平人 | 京都、巴厘岛、马拉喀什 |
| 行程表掌控者 | 首尔、巴黎、伊斯坦布尔 |
| 自由断网人 | 冲绳、皇后镇、雷克雅未克 |

系统会先确定主旅行人格，再根据预算、美食、文化、自然、舒适度和短途倾向，在对应的 3 个目的地中继续加权匹配。

## 本地运行

项目不需要安装依赖。克隆仓库后，在项目目录启动静态服务器：

```bash
python3 -m http.server 5173
```

打开 `http://localhost:5173` 即可。

也可以直接打开 `index.html`，但使用静态服务器能避免部分浏览器对本地文件的限制。

## 项目结构

```text
.
├── index.html              # 页面结构
├── styles.css             # 页面样式
├── script.js              # 问卷、匹配、分享和海报逻辑
├── favicon.svg            # 浏览器标签页图标源文件
├── favicon-32.png         # 兼容性 favicon
├── apple-touch-icon.png   # 手机收藏图标
├── assets/                # 人格、目的地与社交分享图片
├── vendor/                # 本地二维码依赖及许可证
├── tests/                 # Playwright 浏览器自动化测试
├── playwright.config.js   # 测试浏览器与本地服务器配置
├── package.json           # 测试依赖与命令
├── scripts/               # 发布目录生成脚本
├── .github/workflows/     # GitHub Actions 自动测试
└── docs/                  # GitHub Pages 发布版本
```

根目录文件是开发版本；`docs/` 中保留可由 GitHub Pages 直接部署的同步副本。

## 自动化测试

测试需要 Node.js 20 或更高版本。首次运行先安装依赖和 Chromium：

```bash
npm ci
npx playwright install chromium
```

运行全部测试：

```bash
npm test
```

测试覆盖六种人格结果、18 个目的地及其图片与旅行链接、中英文切换、v1/v2 好友匹配链接，以及结果海报二维码解码。每次 push 和 pull request 也会通过 GitHub Actions 自动执行。

## 生成发布目录

修改根目录文件后，运行：

```bash
./scripts/build-docs.sh
```

脚本会将页面文件、favicon、`assets/` 和 `vendor/` 同步到 `docs/`，删除过期的发布资源，并校验源文件与发布副本一致。

## GitHub Pages

当前站点使用 `main` 分支的 `/docs` 目录发布：

1. 进入仓库的 `Settings` → `Pages`
2. Source 选择 `Deploy from a branch`
3. Branch 选择 `main`
4. Folder 选择 `/docs`

生成 `docs/` 后提交并推送到 `main`，GitHub Pages 会自动重新部署。

## 隐私与分享

- 好友匹配数据以紧凑参数写入分享链接，不会上传到项目后端
- 分享文案不会显示邀请方的人格、目的地、答案或匹配分数
- 二维码在浏览器内生成，不调用第三方二维码服务
- 分享链接本身包含完成匹配所需的数据，因此应只发送给希望邀请的人

## 第三方依赖

二维码使用 MIT 许可的 [qrcode-generator 1.4.4](https://github.com/kazuhikoarase/qrcode-generator)，项目已将脚本保存在 `vendor/`，许可证见 `vendor/LICENSE.qrcode-generator.txt`。
