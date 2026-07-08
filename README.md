# Travel Personality

Travel Personality 现在是一个偏娱乐化的旅行人格测试小程序原型，适合做成 Instagram / 小红书传播玩法。用户连续回答 8 个轻量问题后，会得到一个旅行人格、一句性格解读、一个推荐目的地和可下载的结果卡。

整体文案和界面更接近 Skyscanner 的旅行搜索语气：强调 smarter travel、compare options、flights / hotels / car hire、value 和 flexibility，并使用蓝白搜索面板、服务线索和轻量 CTA，提供中文 / English 两套语言。

## 功能

- 8 题动态分支答题流程，后续题目会根据前面选择变化
- 自动加权计算旅行人格类型
- Lite AI 个性化结果：保留规则判定人格，再由 AI 生成更贴合用户选择的目的地、文案和 Skyscanner CTA
- 结果卡适合截图分享
- 每个人格配有专属头像形象
- 结果页上方背景会随推荐目的地切换
- 一键复制分享文案和好友匹配链接
- 好友打开匹配链接后答题，结果卡会显示旅行搭子 match 百分比
- 一键生成 PNG 结果卡，移动端优先调起系统保存/分享面板
- 根据人格展示 Skyscanner 机票、酒店或租车下一步建议
- Skyscanner 跳转链接会按人格、推荐目的地和服务重点生成
- 中文 / English 语言切换
- 手机优先响应式界面

## 旅行人格

- 周末闪现人：周五刚关电脑，周六已在别的城市打卡。
- 美食雷达：攻略可以不看，餐厅收藏夹必须先满。
- 捡漏小算盘：便宜机票一出现，省钱 DNA 当场觉醒。
- 酒店躺平人：行程可以没有，酒店床必须能回血。
- 行程表掌控者：旅行结束后的第一件事，是打开 Excel 表复盘。
- 自由断网人：手机先飞行模式，路线交给风景决定。

## 视觉资产

人格头像位于 `assets/personas/`，使用内置 imagegen 生成并复制到项目内。当前版本统一为 2D 简约贴纸风格，但通过颜色、姿态和道具强化区分：

- `flashpack.png`：红蓝冲刺、闪电、登机牌
- `snack-radar.png`：橙色美食雷达、面碗、小吃轨道
- `dealbrain.png`：黄色算盘行李箱、价格牌、日历
- `sleep-mode.png`：紫色酒店床、月亮、早餐托盘
- `bigbrain.png`：蓝色地图、清单、路线节点
- `offline-mode.png`：绿色自驾车、纸质地图、断网标识

目的地背景位于 `assets/destinations/`，使用内置 imagegen 生成旅行照片风格图，并在结果卡顶部按推荐目的地切换：

- `fukuoka.jpg`：福冈海边城市
- `bangkok.jpg`：曼谷夜市和街头美食
- `chiang-mai.jpg`：清迈古城和山景
- `kyoto.jpg`：京都庭园和旅馆街巷
- `seoul.jpg`：首尔城市天际线和街区
- `okinawa.jpg`：冲绳海岸和自驾公路

## 运行

### 纯静态模式

直接在浏览器打开 `index.html`。

也可以在项目目录执行：

```bash
python3 -m http.server 5173
```

然后访问 `http://localhost:5173`。

纯静态模式不会调用 AI，会使用内置的默认结果卡。

### GitHub Pages 上线

GitHub Pages 如果只能选择 `/docs`，使用当前仓库的 `docs/` 目录作为发布源即可：

1. 在 GitHub repo 进入 `Settings` -> `Pages`
2. Source 选择 `Deploy from a branch`
3. Branch 选择 `main`
4. Folder 选择 `/docs`
5. 保存后等待部署完成

线上静态版会跳过 Lite AI 请求，使用规则判定的人格和内置目的地结果卡。
好友匹配功能不依赖后端，会把轻量结果指纹放在分享链接的 `match` 参数里；好友答完题后在浏览器本地计算匹配度。

### Lite AI 模式

1. 复制 `.env.example` 为 `.env`，填入你的 OpenAI API Key：

```bash
cp .env.example .env
```

2. 启动本地 AI 服务器：

```bash
python3 ai_server.py
```

3. 打开 `http://127.0.0.1:5173`。

答完题后，页面会先显示默认结果卡，然后调用 `/api/generate-result` 生成更个性化的结果。如果没有配置 `OPENAI_API_KEY`，会自动保留默认结果卡。

不要把 API Key 写进 `index.html` 或 `script.js`，前端代码会被浏览器用户看到。

## 后续可扩展

- 加入更多题库和随机抽题
- 接入真实目的地图片或城市内容库
- 为 Skyscanner 链接增加 campaign / affiliate 追踪参数
- 增加小程序登录、结果历史和好友对比
- 把下载结果卡升级成更精美的 3:4 或 9:16 海报模板
