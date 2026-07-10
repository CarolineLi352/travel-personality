# Travel Personality

Travel Personality 是一个偏娱乐化的旅行人格测试小程序原型，适合做成社交软件传播玩法。用户连续回答 8 个轻量问题后，会得到一个旅行人格、一句性格解读、一个随机匹配的推荐目的地和可下载的结果卡。

整体文案和界面接近 Skyscanner 的旅行搜索语气，强调 smarter travel、compare options、flights / hotels / car hire、value 和 flexibility，并提供中文 / English 两套语言。

## 功能

- 7 题动态分支答题流程，从出行动机、个人习惯、核心取舍、情境反应、同行角色和分歧处理等不同角度判断
- 自动加权计算旅行人格类型；最高分并列时随机抽取其中一个人格
- 每个人格有 3 个合理目的地，连续重测优先避开刚出现过的城市
- 完全本地运行，不需要 API Key，也不会发起 AI 或外部模型请求
- 结果卡适合截图分享，每个人格配有专属头像形象
- 结果页背景、推荐文案和 Skyscanner CTA 会随随机目的地同步变化，并直达该地酒店或从访问地区出发的航班页面
- 一键复制分享文案和好友匹配链接
- 好友打开匹配链接后答题，结果卡会显示旅行搭子 match 百分比
- 一键生成 PNG 结果卡，移动端优先调起系统保存/分享面板
- 中文 / English 语言切换和手机优先响应式界面

## 旅行人格

- 周末闪现人：周五刚关电脑，周六已在别的城市打卡。
- 美食雷达：攻略可以不看，餐厅收藏夹必须先满。
- 捡漏小算盘：便宜机票一出现，省钱 DNA 当场觉醒。
- 酒店躺平人：行程可以没有，酒店床必须能回血。
- 行程表掌控者：旅行结束后的第一件事，是打开 Excel 表复盘。
- 自由断网人：手机先飞行模式，路线交给风景决定。

## 视觉资产

人格头像位于 `assets/personas/`：

- `flashpack.png`：红蓝冲刺、闪电、登机牌
- `default-traveler.png`：测试前默认人格，地图、登机牌、问号线索
- `snack-radar.png`：橙色美食雷达、面碗、小吃轨道
- `dealbrain.png`：黄色算盘行李箱、价格牌、日历
- `sleep-mode.png`：紫色酒店床、月亮、早餐托盘
- `bigbrain.png`：蓝色地图、清单、路线节点
- `offline-mode.png`：绿色自驾车、纸质地图、断网标识

目的地背景位于 `assets/destinations/`：

- `fukuoka.jpg`：福冈海边城市
- `bangkok.jpg`：曼谷夜市和街头美食
- `chiang-mai.jpg`：清迈古城和山景
- `kyoto.jpg`：京都庭园和旅馆街巷
- `seoul.jpg`：首尔城市天际线和街区
- `okinawa.jpg`：冲绳海岸和自驾公路

## 本地运行

可以直接在浏览器打开 `index.html`，也可以在项目目录启动静态服务：

```bash
python3 -m http.server 5173
```

然后访问 `http://localhost:5173`。

当前版本完全在浏览器本地完成答题、计分和随机目的地选择，不需要运行 `ai_server.py`，也不需要配置任何环境变量。

## GitHub Pages 上线

如果 GitHub Pages 只能选择 `/docs`，使用当前仓库的 `docs/` 目录作为发布源：

1. 在 GitHub repo 进入 `Settings` → `Pages`
2. Source 选择 `Deploy from a branch`
3. Branch 选择 `main`
4. Folder 选择 `/docs`
5. 保存后等待部署完成

好友匹配功能不依赖后端，会把轻量结果指纹放在分享链接的 `match` 参数里；好友答完题后在浏览器本地计算匹配度。

## 暂停的 AI 原型

`ai_server.py` 和 `ai_prompts.py` 暂时保留，方便以后继续实验，但当前页面已通过 `enableAiPersonalization = false` 关闭全部 AI 请求。项目中的 `.env` 文件已删除，Git 也会忽略所有 `.env` 与 `.env.*` 文件，避免密钥被误提交。

## 后续可扩展

- 加入更多题库和随机抽题
- 扩展更多目的地和配套图片
- 为 Skyscanner 链接增加 campaign / affiliate 追踪参数
- 增加小程序登录、结果历史和好友对比
- 把下载结果卡升级成更精美的 3:4 或 9:16 海报模板
