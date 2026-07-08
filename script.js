const questionPanel = document.querySelector("#questionPanel");
const stepLabel = document.querySelector("#stepLabel");
const progressFill = document.querySelector("#progressFill");
const backButton = document.querySelector("#backButton");
const restartButton = document.querySelector("#restartButton");
const resultActions = document.querySelector("#resultActions");
const copyButton = document.querySelector("#copyButton");
const downloadButton = document.querySelector("#downloadButton");
const copyStatus = document.querySelector("#copyStatus");
const languageButtons = document.querySelectorAll("[data-lang]");

const staticEls = {
  brandText: document.querySelector("#brandText"),
  topbarNote: document.querySelector("#topbarNote"),
  heroEyebrow: document.querySelector("#heroEyebrow"),
  appTitle: document.querySelector("#appTitle"),
  appLede: document.querySelector("#appLede"),
  serviceFlights: document.querySelector("#serviceFlights"),
  serviceHotels: document.querySelector("#serviceHotels"),
  serviceCars: document.querySelector("#serviceCars"),
  storyKicker: document.querySelector("#storyKicker"),
  destinationLabel: document.querySelector("#destinationLabel"),
  skyscannerLabel: document.querySelector("#skyscannerLabel"),
};

const resultEls = {
  hero: document.querySelector("#storyHeroImage"),
  portrait: document.querySelector("#personaPortrait"),
  image: document.querySelector("#personaImage"),
  placeholder: document.querySelector("#personaPlaceholder"),
  name: document.querySelector("#resultName"),
  vibe: document.querySelector("#resultVibe"),
  destination: document.querySelector("#destinationName"),
  tags: document.querySelector("#tagRow"),
  note: document.querySelector("#resultNote"),
  score: document.querySelector("#scoreValue"),
  scoreLabel: document.querySelector("#scoreLabel"),
  skyscannerLink: document.querySelector("#skyscannerLink"),
  skyscannerTitle: document.querySelector("#skyscannerTitle"),
  skyscannerCopy: document.querySelector("#skyscannerCopy"),
  skyscannerServices: document.querySelector("#skyscannerServices"),
};

const uiCopy = {
  zh: {
    pageTitle: "Travel Personality | 旅行人格测试",
    brandText: "旅行人格测试",
    topbarNote: "测出你的下一站",
    heroEyebrow: "Powered by your travel vibe",
    appTitle: "先测出旅行人格\n再找到下一站",
    appLede:
      "测测你的旅行人格，看看你适合飞去哪里。",
    serviceFlights: "机票",
    serviceHotels: "酒店",
    serviceCars: "租车",
    step: (current, total) => `第 ${current} / ${total} 题`,
    complete: "测试完成",
    resultReady: "结果已生成",
    resultTitle: (name) => `你是「${name}」`,
    jumpResult: "查看结果卡",
    playAgain: "再测一次",
    back: "上一题",
    restart: "重新开始",
    copy: "复制分享文案",
    download: "下载结果卡",
    storyKicker: "我的旅行人格",
    destinationLabel: "推荐目的地",
    skyscannerLabel: "Skyscanner 灵感站",
    defaultName: "还没揭晓",
    defaultVibe: "答题后生成你的专属结果卡。",
    defaultDestination: "先卖个关子",
    defaultNote: "你的下一站还在洗牌：可能是为一口好吃的飞走，也可能是租辆车去看海。",
    defaultSkyscannerTitle: "先答题，再决定怎么飞",
    defaultSkyscannerCopy: "等人格出炉，再去找一条更对味的路线：飞过去、住舒服，或一路开到风景里。",
    defaultTags: ["机票", "酒店", "租车"],
    friendStampLocked: "?",
    friendStampLockedLabel: "好友 match",
    friendStampReady: "分享",
    friendStampReadyLabel: "看匹配度",
    friendStampMatchedLabel: "搭子 match",
    matchPendingLabel: "等待好友答题",
    matchInvite: (name) => `正在和「${name}」匹配旅行搭子指数，答完就能看你们适不适合一起出发。`,
    matchResultLine: (score, tone, name) => `你和「${name}」的旅行搭子指数是 ${score}%。${tone}`,
    matchToneHigh: "天选搭子，已经可以开始讨论请假日期。",
    matchToneGood: "很能一起玩，先把预算和作息对齐就稳了。",
    matchToneCareful: "有点互补，出发前最好先谈清楚谁早起、谁找餐厅。",
    copyDone: "分享文案和匹配链接已复制。",
    downloadFirst: "先完成测试，再下载结果卡。",
    downloadDone: "结果卡已生成下载。",
    aiLoading: "AI 正在把结果改得更像你...",
    aiReady: "AI 个性化结果已生成。",
    aiFallback: "结果卡已生成，看看你的下一站是不是很对味。",
    shareFallback: "我正在测自己的旅行人格，看看下一站会被推荐去哪里。",
    shareTitle: "我的旅行人格是",
    shareDestination: "推荐目的地",
    shareInvite: "发给朋友一起测，看看我们是不是最合适的旅游搭子：",
    shareTags: "#旅行人格测试 #下一站去哪 #TravelSmarter",
    posterKicker: "我的旅行人格",
    posterDestination: "推荐目的地",
    posterServices: "机票 / 酒店 / 租车",
    posterBrand: "Travel smarter with Skyscanner",
  },
  en: {
    pageTitle: "Travel Personality | Find Your Travel Type",
    brandText: "Travel Personality",
    topbarNote: "Find your next trip",
    heroEyebrow: "Powered by your travel vibe",
    appTitle: "Find your travel type.\nThen find the trip.",
    appLede:
      "Find your travel personality and see where you should fly next.",
    serviceFlights: "Flights",
    serviceHotels: "Hotels",
    serviceCars: "Car hire",
    step: (current, total) => `Question ${current} / ${total}`,
    complete: "Trip type ready",
    resultReady: "Result ready",
    resultTitle: (name) => `You are ${name}`,
    jumpResult: "View result card",
    playAgain: "Take it again",
    back: "Back",
    restart: "Restart",
    copy: "Copy share caption",
    download: "Download card",
    storyKicker: "My travel type",
    destinationLabel: "Matched destination",
    skyscannerLabel: "Skyscanner trip ideas",
    defaultName: "Not revealed yet",
    defaultVibe: "Answer the quiz to get your shareable result card.",
    defaultDestination: "Keeping it secret",
    defaultNote: "Your next trip is still shuffling: a quick escape, a food-led flight, or a road with sea views.",
    defaultSkyscannerTitle: "Answer first. Take off later.",
    defaultSkyscannerCopy: "Once your type lands, pick the move that fits: fly out, stay well, or take the road.",
    defaultTags: ["Flights", "Hotels", "Car hire"],
    friendStampLocked: "?",
    friendStampLockedLabel: "Friend match",
    friendStampReady: "Share",
    friendStampReadyLabel: "match check",
    friendStampMatchedLabel: "duo match",
    matchPendingLabel: "waiting for friend",
    matchInvite: (name) => `You are matching with ${name}. Answer the quiz to see if you are the right travel duo.`,
    matchResultLine: (score, tone, name) => `Your travel-duo match with ${name} is ${score}%. ${tone}`,
    matchToneHigh: "Very strong match. You can probably start comparing dates.",
    matchToneGood: "Good travel-duo energy. Align budget and pace, then go.",
    matchToneCareful: "Complementary, but agree on mornings, food stops and budget first.",
    copyDone: "Share caption and match link copied.",
    downloadFirst: "Finish the quiz first, then download your card.",
    downloadDone: "Result card downloaded.",
    aiLoading: "AI is personalizing your result...",
    aiReady: "AI-personalized result ready.",
    aiFallback: "Your result card is ready. See if the next trip fits your vibe.",
    shareFallback: "I am finding my travel type and my next matched destination.",
    shareTitle: "My travel type is",
    shareDestination: "Matched destination",
    shareInvite: "Send this to a friend and see if you are the perfect travel duo:",
    shareTags: "#TravelPersonality #WhereToNext #TravelSmarter",
    posterKicker: "My travel type",
    posterDestination: "Matched destination",
    posterServices: "Flights / Hotels / Car hire",
    posterBrand: "Travel smarter with Skyscanner",
  },
};

const totalQuizSteps = 8;
const startQuestionId = "tripSpark";
const personaOrder = ["weekend", "food", "budget", "luxury", "culture", "nature"];
const personaCompatibility = {
  "budget-weekend": 0.78,
  "food-weekend": 0.76,
  "nature-weekend": 0.78,
  "culture-food": 0.8,
  "food-luxury": 0.72,
  "budget-food": 0.68,
  "budget-culture": 0.7,
  "culture-luxury": 0.76,
  "luxury-nature": 0.68,
  "culture-nature": 0.64,
};

const questionBank = {
  tripSpark: {
    label: { zh: "开始搜索", en: "Start search" },
    title: {
      zh: "打开旅行搜索框，你第一眼想填什么？",
      en: "You open a travel search box. What goes in first?",
    },
    options: [
      {
        letter: "A",
        title: { zh: "下个周末能走的地方", en: "Somewhere I can go next weekend" },
        copy: { zh: "先看哪里有好价、直飞和低摩擦。", en: "Start with good fares, direct routes and low friction." },
        score: { weekend: 2, budget: 1 },
        next: "sparkShort",
      },
      {
        letter: "B",
        title: { zh: "一个想吃很久的城市", en: "A city I have wanted to eat through" },
        copy: { zh: "目的地可以从一口想念开始。", en: "Sometimes a destination starts with one craving." },
        score: { food: 2 },
        next: "sparkFood",
      },
      {
        letter: "C",
        title: { zh: "一个住进去就不想出门的酒店", en: "A hotel I would happily stay inside" },
        copy: { zh: "如果床、早餐和浴室都对，旅行已经赢了。", en: "If the bed, breakfast and bathroom work, the trip works." },
        score: { luxury: 2 },
        next: "sparkStay",
      },
      {
        letter: "D",
        title: { zh: "一条可以自己开车的海岸线", en: "A coastline I can drive myself" },
        copy: { zh: "少一点通知，多一点想停就停。", en: "Fewer notifications, more pull-over-when-you-want energy." },
        score: { nature: 2 },
        next: "sparkRoam",
      },
    ],
  },
  sparkShort: {
    label: { zh: "周末闪现", en: "Weekend mode" },
    title: { zh: "只有 48 小时，你最在意哪件事？", en: "With only 48 hours, what matters most?" },
    options: [
      {
        letter: "A",
        title: { zh: "航班时间别折腾", en: "Flights that do not waste the weekend" },
        copy: { zh: "早去晚回可以，红眼崩溃不行。", en: "Early out, late back is fine. Chaos is not." },
        score: { weekend: 2, luxury: 1 },
        next: "bookingMoment",
      },
      {
        letter: "B",
        title: { zh: "落地就能开始逛", en: "Land and start exploring" },
        copy: { zh: "机场到市区顺，才像真的赚到时间。", en: "An easy airport-to-city route feels like extra time." },
        score: { weekend: 2, culture: 1 },
        next: "bookingMoment",
      },
      {
        letter: "C",
        title: { zh: "票价要够漂亮", en: "The fare has to look good" },
        copy: { zh: "周末短，更要花得聪明。", en: "Short trip, smarter spend." },
        score: { budget: 2, weekend: 1 },
        next: "bookingMoment",
      },
      {
        letter: "D",
        title: { zh: "周一像没走过一样", en: "Monday must still feel possible" },
        copy: { zh: "旅行可以短，但恢复感不能短。", en: "The trip can be short. The reset cannot." },
        score: { weekend: 1, luxury: 2 },
        next: "bookingMoment",
      },
    ],
  },
  sparkFood: {
    label: { zh: "胃先出发", en: "Food first" },
    title: { zh: "为了吃飞一趟，你会先查什么？", en: "If you fly for food, what do you check first?" },
    options: [
      {
        letter: "A",
        title: { zh: "夜市和街头小吃密度", en: "Market and street food density" },
        copy: { zh: "一条街解决三顿，才叫目的地。", en: "Three meals on one street is a destination." },
        score: { food: 2, budget: 1 },
        next: "bookingMoment",
      },
      {
        letter: "B",
        title: { zh: "那家餐厅附近住哪里", en: "Where to stay near that restaurant" },
        copy: { zh: "酒店位置要服务于晚餐路线。", en: "The hotel location should serve the dinner route." },
        score: { food: 2, culture: 1 },
        next: "bookingMoment",
      },
      {
        letter: "C",
        title: { zh: "能不能把机票省下来加餐", en: "Can the flight cost less so dinner can do more?" },
        copy: { zh: "省下来的不是钱，是下一顿。", en: "The savings are not just money. They are another meal." },
        score: { budget: 2, food: 1 },
        next: "bookingMoment",
      },
      {
        letter: "D",
        title: { zh: "咖啡店、市集、早餐路线", en: "Coffee, markets and breakfast routes" },
        copy: { zh: "想从早吃到晚，但节奏要顺。", en: "Eat all day, but make the route smooth." },
        score: { food: 2, weekend: 1 },
        next: "bookingMoment",
      },
    ],
  },
  sparkStay: {
    label: { zh: "住得要对", en: "Stay first" },
    title: { zh: "如果这趟是为了好好住，你会怎么挑？", en: "If the stay leads the trip, what do you choose for?" },
    options: [
      {
        letter: "A",
        title: { zh: "床、浴室和早餐必须稳", en: "Bed, bath and breakfast must be solid" },
        copy: { zh: "酒店不是配角，是主线。", en: "The hotel is not supporting cast. It is the plot." },
        score: { luxury: 2 },
        next: "bookingMoment",
      },
      {
        letter: "B",
        title: { zh: "酒店位置能少走冤枉路", en: "A location that saves the whole route" },
        copy: { zh: "住得对，行程表会自己变顺。", en: "A good stay makes the map behave." },
        score: { culture: 2, luxury: 1 },
        next: "bookingMoment",
      },
      {
        letter: "C",
        title: { zh: "淡季好价住更好", en: "Off-season value for a better stay" },
        copy: { zh: "同样预算，当然想住得更漂亮。", en: "Same budget, better room. Obviously." },
        score: { budget: 2, luxury: 1 },
        next: "bookingMoment",
      },
      {
        letter: "D",
        title: { zh: "温泉、海景或庭院", en: "Onsen, sea view or garden" },
        copy: { zh: "房间外面的风景，也算房间的一部分。", en: "The view outside the room is part of the room." },
        score: { nature: 2, luxury: 1 },
        next: "bookingMoment",
      },
    ],
  },
  sparkRoam: {
    label: { zh: "自由行打开", en: "Roam mode" },
    title: { zh: "自由行第一天，你最想拥有哪种自由？", en: "On day one, what kind of freedom do you want most?" },
    options: [
      {
        letter: "A",
        title: { zh: "租车想停就停", en: "Car hire and stop-anywhere freedom" },
        copy: { zh: "看到海就靠边，看到云就改线。", en: "Pull over for the sea. Reroute for the sky." },
        score: { nature: 2 },
        next: "bookingMoment",
      },
      {
        letter: "B",
        title: { zh: "躲开热门景点", en: "Skip the obvious stops" },
        copy: { zh: "想找城市的背面，不想复制攻略。", en: "You want the back side of the city, not a copied guide." },
        score: { nature: 1, culture: 1 },
        next: "bookingMoment",
      },
      {
        letter: "C",
        title: { zh: "住远一点换更大空间", en: "Stay farther out for more space" },
        copy: { zh: "安静、舒服、价格也能好看。", en: "Quiet, comfortable and better value." },
        score: { nature: 1, luxury: 1, budget: 1 },
        next: "bookingMoment",
      },
      {
        letter: "D",
        title: { zh: "天气好就临时改线", en: "Change the route if the weather says so" },
        copy: { zh: "计划可以有，但天空优先级更高。", en: "Plans are useful. The sky gets final say." },
        score: { nature: 2, weekend: 1 },
        next: "bookingMoment",
      },
    ],
  },
  bookingMoment: {
    label: { zh: "订之前", en: "Before booking" },
    title: { zh: "同一个目的地有四种方案，你会点进哪个？", en: "Same destination, four options. Which one do you open?" },
    options: [
      {
        letter: "A",
        title: { zh: "最便宜但要早起转机", en: "Cheapest, but early with a connection" },
        copy: { zh: "只要总价够香，可以认真计算。", en: "If the total price works, it deserves a spreadsheet." },
        score: { budget: 2 },
        next: "focusValue",
      },
      {
        letter: "B",
        title: { zh: "直飞贵一点但省时间", en: "Direct, slightly more, much smoother" },
        copy: { zh: "少折腾就是隐形预算。", en: "Less hassle is hidden value." },
        score: { weekend: 1, luxury: 1 },
        next: "focusSmooth",
      },
      {
        letter: "C",
        title: { zh: "住在核心街区，机票普通也行", en: "A central stay, even if the fare is ordinary" },
        copy: { zh: "位置对了，城市会变好逛。", en: "The right location makes the city easier to read." },
        score: { culture: 2, luxury: 1 },
        next: "focusRoute",
      },
      {
        letter: "D",
        title: { zh: "租车或交通最自由的组合", en: "The option with the most flexible transport" },
        copy: { zh: "不想被路线绑住。", en: "You do not want the route to own you." },
        score: { nature: 2 },
        next: "focusFreedom",
      },
    ],
  },
  focusValue: {
    label: { zh: "价格波动", en: "Price moves" },
    title: { zh: "价格开始波动，你的真实反应？", en: "Prices start moving. What do you actually do?" },
    options: [
      {
        letter: "A",
        title: { zh: "开价格提醒，等一个漂亮数字", en: "Set an alert and wait for the number" },
        copy: { zh: "好价出现那一刻，比种草还上头。", en: "A good fare alert can beat a saved post." },
        score: { budget: 2 },
        next: "valueRitual",
      },
      {
        letter: "B",
        title: { zh: "换日期，把总价压下来", en: "Shift dates to bring the total down" },
        copy: { zh: "灵活不是妥协，是技能。", en: "Flexibility is not compromise. It is a skill." },
        score: { budget: 2, weekend: 1 },
        next: "valueRitual",
      },
      {
        letter: "C",
        title: { zh: "少住一晚也要住好一点", en: "One fewer night, better stay" },
        copy: { zh: "预算要省，但体验不能垮。", en: "Save the budget. Keep the feeling." },
        score: { budget: 1, luxury: 1 },
        next: "valueRitual",
      },
      {
        letter: "D",
        title: { zh: "省下的钱留给吃和体验", en: "Save on transport, spend on food and moments" },
        copy: { zh: "机票便宜一点，城市就多一口。", en: "A cheaper flight leaves room for another bite." },
        score: { budget: 1, food: 1 },
        next: "valueRitual",
      },
    ],
  },
  focusSmooth: {
    label: { zh: "顺一点", en: "Smoother trip" },
    title: { zh: "为了顺一点，你愿意把钱花在哪？", en: "Where is smoothness worth paying for?" },
    options: [
      {
        letter: "A",
        title: { zh: "直飞和好时段", en: "Direct flights and humane timings" },
        copy: { zh: "不想把假期浪费在机场椅子上。", en: "No one dreams of spending holiday time in airport chairs." },
        score: { weekend: 1, luxury: 1 },
        next: "smoothRitual",
      },
      {
        letter: "B",
        title: { zh: "不用搬行李的酒店位置", en: "A hotel location that saves luggage drama" },
        copy: { zh: "行李少折腾，人也少崩溃。", en: "Less luggage drama, better person." },
        score: { luxury: 1, culture: 1 },
        next: "smoothRitual",
      },
      {
        letter: "C",
        title: { zh: "能睡好的房间", en: "A room that lets you sleep properly" },
        copy: { zh: "出去玩，不是出去硬撑。", en: "Travel is not an endurance test." },
        score: { luxury: 2 },
        next: "smoothRitual",
      },
      {
        letter: "D",
        title: { zh: "机场到酒店交通简单", en: "Simple airport-to-stay transport" },
        copy: { zh: "落地第一小时别考验人生。", en: "The first hour after landing should not test you." },
        score: { weekend: 1, luxury: 1 },
        next: "smoothRitual",
      },
    ],
  },
  focusRoute: {
    label: { zh: "路线脑", en: "Route brain" },
    title: { zh: "你排路线最怕什么？", en: "What is the worst route-planning mistake?" },
    options: [
      {
        letter: "A",
        title: { zh: "点位太散，一直坐车", en: "Everything is scattered, so you sit in transit" },
        copy: { zh: "路线上浪费的时间，都是体验成本。", en: "Time lost in transit is part of the trip cost." },
        score: { culture: 2 },
        next: "routeRitual",
      },
      {
        letter: "B",
        title: { zh: "餐厅订不到，计划全乱", en: "The restaurant falls through and the plan collapses" },
        copy: { zh: "真正的硬核行程，是先保护晚餐。", en: "Advanced planning starts by protecting dinner." },
        score: { food: 2, culture: 1 },
        next: "routeRitual",
      },
      {
        letter: "C",
        title: { zh: "行程太空，感觉亏了", en: "The day feels too empty" },
        copy: { zh: "不是要赶，是想把城市读完整。", en: "It is not about rushing. It is about reading the city." },
        score: { culture: 1, budget: 1 },
        next: "routeRitual",
      },
      {
        letter: "D",
        title: { zh: "同行的人临时改主意", en: "Someone changes the plan last minute" },
        copy: { zh: "可以改，但最好先开个会。", en: "Changes are possible. Ideally after a tiny summit." },
        score: { culture: 2 },
        next: "routeRitual",
      },
    ],
  },
  focusFreedom: {
    label: { zh: "自由度", en: "Freedom level" },
    title: { zh: "自由行最不能缺哪项？", en: "What can a self-guided trip not miss?" },
    options: [
      {
        letter: "A",
        title: { zh: "租车选择多，临时换路线", en: "More car hire options, easier reroutes" },
        copy: { zh: "方向盘在手，地图才是真的打开。", en: "With the wheel in hand, the map opens properly." },
        score: { nature: 2 },
        next: "freedomRitual",
      },
      {
        letter: "B",
        title: { zh: "酒店可以取消或调整", en: "Flexible stays I can change" },
        copy: { zh: "自由行的安全感，是可调整。", en: "Flexibility is the safety net." },
        score: { nature: 1, budget: 1 },
        next: "freedomRitual",
      },
      {
        letter: "C",
        title: { zh: "每天只定一个大方向", en: "One big direction per day" },
        copy: { zh: "留白不是浪费，是给风景让路。", en: "Blank space is not waste. It lets the view happen." },
        score: { nature: 2 },
        next: "freedomRitual",
      },
      {
        letter: "D",
        title: { zh: "安静但不麻烦的住处", en: "Quiet stays that are still easy" },
        copy: { zh: "想离线，但不想求生。", en: "Offline, not survival mode." },
        score: { nature: 1, luxury: 1 },
        next: "freedomRitual",
      },
    ],
  },
  valueRitual: {
    label: { zh: "捡漏动作", en: "Deal ritual" },
    title: { zh: "看到价格降了，你下一步会做什么？", en: "A price drops. What do you do next?" },
    options: [
      {
        letter: "A",
        title: { zh: "立刻截图发群：这价格能冲", en: "Send the screenshot: this fare can go" },
        copy: { zh: "先别问请假，先锁住机会。", en: "Before the leave request, protect the chance." },
        score: { budget: 2, weekend: 1 },
        next: "travelBuddy",
      },
      {
        letter: "B",
        title: { zh: "再查附近酒店，确认总价没反转", en: "Check nearby stays so the total still works" },
        copy: { zh: "便宜机票不能被贵酒店背刺。", en: "A cheap flight should not get ambushed by the stay." },
        score: { budget: 2, luxury: 1 },
        next: "travelBuddy",
      },
      {
        letter: "C",
        title: { zh: "换城市比一圈，看有没有隐藏好价", en: "Compare nearby cities for hidden value" },
        copy: { zh: "真正的捡漏，是连目的地都灵活。", en: "Real deal hunting keeps even the destination flexible." },
        score: { budget: 2, nature: 1 },
        next: "travelBuddy",
      },
      {
        letter: "D",
        title: { zh: "把省下的钱标给吃饭和体验", en: "Move the savings to food and experiences" },
        copy: { zh: "省下来的不是钱，是下一顿和下一站。", en: "The savings become the next meal and the next stop." },
        score: { budget: 1, food: 1 },
        next: "travelBuddy",
      },
    ],
  },
  smoothRitual: {
    label: { zh: "舒服值", en: "Comfort score" },
    title: { zh: "你最不想在旅途中被什么打断？", en: "What do you least want interrupting the trip?" },
    options: [
      {
        letter: "A",
        title: { zh: "半夜转机和奇怪航班时间", en: "Overnight connections and odd flight times" },
        copy: { zh: "假期不是用来练极限生存的。", en: "A holiday is not survival training." },
        score: { weekend: 1, luxury: 1 },
        next: "travelBuddy",
      },
      {
        letter: "B",
        title: { zh: "酒店离哪里都远", en: "A stay far from everything" },
        copy: { zh: "住错位置，整座城市都变远。", en: "The wrong location makes the whole city farther away." },
        score: { culture: 1, luxury: 1 },
        next: "travelBuddy",
      },
      {
        letter: "C",
        title: { zh: "拖着行李找不到路", en: "Dragging luggage while lost" },
        copy: { zh: "人在路上，行李别上强度。", en: "The person can travel. The luggage should not suffer." },
        score: { luxury: 2 },
        next: "travelBuddy",
      },
      {
        letter: "D",
        title: { zh: "同行突然把节奏拉满", en: "Someone suddenly maxes out the pace" },
        copy: { zh: "出门是回血，不是参加体测。", en: "The trip is for recovery, not a fitness test." },
        score: { luxury: 1, nature: 1 },
        next: "travelBuddy",
      },
    ],
  },
  routeRitual: {
    label: { zh: "收藏夹", en: "Saved list" },
    title: { zh: "出发前一晚，你的手机里最满的是？", en: "The night before departure, what fills your phone?" },
    options: [
      {
        letter: "A",
        title: { zh: "地图上密密麻麻的星标", en: "A map full of saved stars" },
        copy: { zh: "城市还没到，路线已经开始排队。", en: "The city has not started, but the route already has." },
        score: { culture: 2 },
        next: "travelBuddy",
      },
      {
        letter: "B",
        title: { zh: "餐厅收藏夹和预约截图", en: "Restaurant saves and booking screenshots" },
        copy: { zh: "行程表的核心，其实是饭点。", en: "The core of the itinerary is actually mealtime." },
        score: { food: 2 },
        next: "travelBuddy",
      },
      {
        letter: "C",
        title: { zh: "交通、营业时间和备用路线", en: "Transit, opening hours and backup routes" },
        copy: { zh: "不一定要紧绷，但必须有后手。", en: "Not tense, just prepared." },
        score: { culture: 2, budget: 1 },
        next: "travelBuddy",
      },
      {
        letter: "D",
        title: { zh: "下雨、排队、关门怎么办", en: "Rain, queues and closed doors backup plan" },
        copy: { zh: "真正的计划感，是连意外都安排座位。", en: "Real planning gives surprises a seat too." },
        score: { culture: 1, luxury: 1 },
        next: "travelBuddy",
      },
    ],
  },
  freedomRitual: {
    label: { zh: "临时改线", en: "Reroute mode" },
    title: { zh: "路上突然发现一个计划外的点，你会？", en: "You spot an unplanned stop on the road. What happens?" },
    options: [
      {
        letter: "A",
        title: { zh: "方向盘一打，直接过去", en: "Turn the wheel and go" },
        copy: { zh: "计划外才有自由行的爽点。", en: "The unplanned stop is the point of roaming." },
        score: { nature: 2 },
        next: "travelBuddy",
      },
      {
        letter: "B",
        title: { zh: "查一下时间距离，顺路才去", en: "Check time and distance first" },
        copy: { zh: "自由可以有，脑子也要在线。", en: "Freedom can stay smart." },
        score: { nature: 1, culture: 1 },
        next: "travelBuddy",
      },
      {
        letter: "C",
        title: { zh: "先看附近有没有好吃的", en: "Check whether good food is nearby" },
        copy: { zh: "风景决定方向，饭决定停留。", en: "The view sets the direction. Food decides the stop." },
        score: { food: 1, nature: 1 },
        next: "travelBuddy",
      },
      {
        letter: "D",
        title: { zh: "如果酒店能晚点回，马上改线", en: "If the stay can flex, reroute now" },
        copy: { zh: "自由感来自路上，也来自不用赶回去。", en: "Freedom comes from the road and from not rushing back." },
        score: { nature: 1, luxury: 1 },
        next: "travelBuddy",
      },
    ],
  },
  travelBuddy: {
    label: { zh: "旅游搭子", en: "Travel buddy" },
    title: { zh: "朋友说：这趟要不要一起？你最想先对齐什么？", en: "A friend says: should we go together? What do you align first?" },
    options: [
      {
        letter: "A",
        title: { zh: "预算上限和钱花在哪", en: "Budget ceiling and where the money goes" },
        copy: { zh: "钱观合，旅行搭子才合。", en: "Compatible budgets make compatible travel buddies." },
        score: { budget: 2 },
        next: "finalBudget",
      },
      {
        letter: "B",
        title: { zh: "每天起床和回酒店时间", en: "Wake-up and back-to-hotel timing" },
        copy: { zh: "作息不合，比目的地不合更可怕。", en: "Mismatched rhythms are worse than mismatched destinations." },
        score: { luxury: 1, culture: 1 },
        next: "finalRest",
      },
      {
        letter: "C",
        title: { zh: "必吃/必逛清单", en: "Must-eat and must-see lists" },
        copy: { zh: "先确认高光，其他再自由发挥。", en: "Lock the highlights, then let the rest flex." },
        score: { food: 1, culture: 1 },
        next: "finalPlan",
      },
      {
        letter: "D",
        title: { zh: "能不能接受临时改线", en: "How flexible the route can be" },
        copy: { zh: "旅行搭子合不合，一改线就知道。", en: "You learn a travel buddy fast when the route changes." },
        score: { nature: 2, weekend: 1 },
        next: "finalSpontaneous",
      },
    ],
  },
  finalBudget: {
    label: { zh: "最后一晚", en: "Last night" },
    title: { zh: "你想怎么证明这趟很值？", en: "How do you prove this trip was worth it?" },
    options: [
      {
        letter: "A",
        title: { zh: "总价比预期低，但体验没少", en: "Total cost came in lower, experience did not" },
        copy: { zh: "这不是省，是赢。", en: "That is not just saving. That is winning." },
        score: { budget: 2 },
        next: "afterBudget",
      },
      {
        letter: "B",
        title: { zh: "便宜机票让我多吃了两顿", en: "A cheaper flight funded two more meals" },
        copy: { zh: "预算流向了更快乐的地方。", en: "The budget went somewhere happier." },
        score: { budget: 1, food: 1 },
        next: "afterBudget",
      },
      {
        letter: "C",
        title: { zh: "错峰出发，人少价好", en: "Off-peak timing, fewer people, better price" },
        copy: { zh: "时间选对，目的地自动加分。", en: "The right timing upgrades the place." },
        score: { budget: 2, weekend: 1 },
        next: "afterBudget",
      },
      {
        letter: "D",
        title: { zh: "住得舒服还没超预算", en: "Comfortable stay, still under budget" },
        copy: { zh: "价格和睡眠都站在你这边。", en: "Both price and sleep were on your side." },
        score: { budget: 1, luxury: 1 },
        next: "afterBudget",
      },
    ],
  },
  finalRest: {
    label: { zh: "睡前复盘", en: "Before sleep" },
    title: { zh: "临睡前，你最满意哪一刻？", en: "Before sleeping, what feels most satisfying?" },
    options: [
      {
        letter: "A",
        title: { zh: "酒店床太好，直接满血", en: "The hotel bed fully restored me" },
        copy: { zh: "旅行的尽头，是一张好床。", en: "The end of the day is a good bed." },
        score: { luxury: 2 },
        next: "afterRest",
      },
      {
        letter: "B",
        title: { zh: "路线没有乱，大家都不累", en: "The route held together and nobody crashed" },
        copy: { zh: "顺，是最高级的舒适。", en: "Smooth is a kind of luxury." },
        score: { culture: 1, luxury: 1 },
        next: "afterRest",
      },
      {
        letter: "C",
        title: { zh: "早餐、浴缸、景色都在线", en: "Breakfast, bath and view all worked" },
        copy: { zh: "细节在线，假期才在线。", en: "When the details work, the holiday works." },
        score: { luxury: 2 },
        next: "afterRest",
      },
      {
        letter: "D",
        title: { zh: "什么都没赶，时间刚刚好", en: "Nothing rushed, everything had enough time" },
        copy: { zh: "慢下来才感觉真的出门了。", en: "Slowing down made it feel real." },
        score: { luxury: 1, nature: 1 },
        next: "afterRest",
      },
    ],
  },
  finalPlan: {
    label: { zh: "高光时刻", en: "Highlight reel" },
    title: { zh: "这趟旅行最值得被截图的是？", en: "What deserves the screenshot from this trip?" },
    options: [
      {
        letter: "A",
        title: { zh: "收藏的店真的都吃到了", en: "Every saved food spot actually happened" },
        copy: { zh: "收藏夹终于变成了现实。", en: "The saved list became real." },
        score: { food: 2 },
        next: "afterPlan",
      },
      {
        letter: "B",
        title: { zh: "路线顺到像做过模拟", en: "The route was suspiciously smooth" },
        copy: { zh: "不走回头路，就是城市探索的爽点。", en: "No backtracking is the joy of a good city plan." },
        score: { culture: 2 },
        next: "afterPlan",
      },
      {
        letter: "C",
        title: { zh: "每天一个主题，很有章法", en: "One theme per day, clean and satisfying" },
        copy: { zh: "不是特种兵，是有结构。", en: "Not overpacked. Structured." },
        score: { culture: 2 },
        next: "afterPlan",
      },
      {
        letter: "D",
        title: { zh: "临时发现的小店变成高光", en: "A random find became the highlight" },
        copy: { zh: "计划很好，惊喜也要留门。", en: "The plan was good. The surprise got in." },
        score: { food: 1, nature: 1 },
        next: "afterPlan",
      },
    ],
  },
  finalSpontaneous: {
    label: { zh: "说走就走", en: "Go-now energy" },
    title: { zh: "最后你会怎么形容这趟？", en: "How would you describe the trip in the end?" },
    options: [
      {
        letter: "A",
        title: { zh: "说走就走真的走成了", en: "The spontaneous plan actually happened" },
        copy: { zh: "能出发，就是最高效率。", en: "Leaving is the highest efficiency." },
        score: { weekend: 2 },
        next: "afterSpontaneous",
      },
      {
        letter: "B",
        title: { zh: "自驾停在了计划外的海边", en: "The drive stopped at an unplanned coast" },
        copy: { zh: "计划外，才是这趟的主角。", en: "The unplanned bit became the main event." },
        score: { nature: 2 },
        next: "afterSpontaneous",
      },
      {
        letter: "C",
        title: { zh: "少看手机，多看风景", en: "Less phone, more view" },
        copy: { zh: "断网不是失联，是回血。", en: "Offline was not missing out. It was recovery." },
        score: { nature: 2 },
        next: "afterSpontaneous",
      },
      {
        letter: "D",
        title: { zh: "临时抢到便宜票，直接赚到", en: "Last-minute fare, instant win" },
        copy: { zh: "冲动和好价同时出现，谁顶得住。", en: "Impulse plus a good fare is hard to resist." },
        score: { weekend: 1, budget: 1 },
        next: "afterSpontaneous",
      },
    ],
  },
  afterBudget: {
    label: { zh: "晒图文案", en: "Share caption" },
    title: { zh: "回家后，你最想怎么发这趟？", en: "Back home, how would you post this trip?" },
    options: [
      {
        letter: "A",
        title: { zh: "人均比想象低，但体验没缩水", en: "Lower per-person cost, no experience lost" },
        copy: { zh: "这条笔记的标题可以叫：钱花得真会。", en: "The caption writes itself: smart spend, full trip." },
        score: { budget: 2 },
      },
      {
        letter: "B",
        title: { zh: "用省下来的钱多吃一顿", en: "The savings became one more meal" },
        copy: { zh: "预算没有消失，只是变成了快乐。", en: "The budget did not vanish. It became joy." },
        score: { budget: 1, food: 1 },
      },
      {
        letter: "C",
        title: { zh: "错峰捡漏成功，像中了隐藏关", en: "Off-peak deal, hidden level cleared" },
        copy: { zh: "人少、价好、心情稳定，三件套齐了。", en: "Fewer crowds, better value, calmer mood." },
        score: { budget: 2, weekend: 1 },
      },
      {
        letter: "D",
        title: { zh: "住得舒服还没超预算", en: "A good stay still stayed on budget" },
        copy: { zh: "会比价的人，连躺平都更高级。", en: "Good comparing makes comfort feel smarter." },
        score: { budget: 1, luxury: 1 },
      },
    ],
  },
  afterRest: {
    label: { zh: "回家回血", en: "Reset check" },
    title: { zh: "回家后，你给这趟最高分的原因是？", en: "Back home, why does this trip get full marks?" },
    options: [
      {
        letter: "A",
        title: { zh: "回来没有报废，甚至还能上班", en: "I came back functional enough for work" },
        copy: { zh: "这不是旅行，这是低损耗充电。", en: "Not just travel. Low-damage recharging." },
        score: { luxury: 2 },
      },
      {
        letter: "B",
        title: { zh: "酒店像充电站，睡完人就正常了", en: "The hotel worked like a charging dock" },
        copy: { zh: "床一好，世界都好商量。", en: "When the bed works, the world behaves." },
        score: { luxury: 2 },
      },
      {
        letter: "C",
        title: { zh: "每天节奏刚好，没有被行程追着跑", en: "Every day had enough room to breathe" },
        copy: { zh: "不赶场，才是真的度假感。", en: "No rushing is the actual holiday feeling." },
        score: { luxury: 1, nature: 1 },
      },
      {
        letter: "D",
        title: { zh: "该吃该逛都有，但没有崩溃", en: "Food and exploring happened without burnout" },
        copy: { zh: "完成度和舒适度终于站到了一边。", en: "Completion and comfort finally teamed up." },
        score: { culture: 1, luxury: 1 },
      },
    ],
  },
  afterPlan: {
    label: { zh: "复盘时刻", en: "Post-trip review" },
    title: { zh: "整理照片时，你最想夸自己哪一点？", en: "Sorting photos, what would you praise yourself for?" },
    options: [
      {
        letter: "A",
        title: { zh: "Excel 表居然真的救了全程", en: "The spreadsheet genuinely saved the trip" },
        copy: { zh: "别人发九宫格，你先更新版本号。", en: "Others post photos. You update the version number." },
        score: { culture: 2 },
      },
      {
        letter: "B",
        title: { zh: "每一顿都在正确的时间出现", en: "Every meal appeared at the right time" },
        copy: { zh: "饭点排得好，旅行烦恼少。", en: "Good meal timing solves half the trip." },
        score: { food: 2, culture: 1 },
      },
      {
        letter: "C",
        title: { zh: "酒店位置选对，少走一半冤枉路", en: "The stay location saved so much walking" },
        copy: { zh: "选址正确，路线自动变聪明。", en: "A good location makes the route smarter." },
        score: { culture: 1, luxury: 1 },
      },
      {
        letter: "D",
        title: { zh: "计划留了空，所以惊喜进来了", en: "The plan had gaps, so surprise got in" },
        copy: { zh: "高级计划不是填满，是会呼吸。", en: "A good plan is not packed. It breathes." },
        score: { culture: 1, nature: 1 },
      },
    ],
  },
  afterSpontaneous: {
    label: { zh: "下次还敢", en: "Next time" },
    title: { zh: "这趟结束后，你最想保留哪个习惯？", en: "After this trip, what habit would you keep?" },
    options: [
      {
        letter: "A",
        title: { zh: "看到好价先收藏，不等灵感过期", en: "Save good fares before the idea expires" },
        copy: { zh: "说走就走，也需要一点手速。", en: "Spontaneity still likes quick reflexes." },
        score: { budget: 1, weekend: 1 },
      },
      {
        letter: "B",
        title: { zh: "每次都留半天给随机事件", en: "Always leave half a day for randomness" },
        copy: { zh: "给未知留时间，旅行才会长出剧情。", en: "Give the unknown time and the trip gets a plot." },
        score: { nature: 2 },
      },
      {
        letter: "C",
        title: { zh: "租车或交通自由度优先", en: "Prioritize car hire or flexible transport" },
        copy: { zh: "能停、能改、能绕路，才叫打开地图。", en: "Stop, reroute, detour. That is how the map opens." },
        score: { nature: 2 },
      },
      {
        letter: "D",
        title: { zh: "少刷手机，多听当地节奏", en: "Less scrolling, more local rhythm" },
        copy: { zh: "离线一点，反而更像真的到了。", en: "Being a little offline makes arrival feel real." },
        score: { nature: 1, luxury: 1 },
      },
    ],
  },
};

const personas = {
  weekend: {
    name: "FlashPack",
    displayName: { zh: "周末闪现人", en: "FlashPack" },
    label: { zh: "周五刚关电脑，周六已在别的城市打卡。", en: "Laptop shuts Friday. Boarding pass opens Saturday." },
    image: "assets/personas/flashpack.png",
    destination: { zh: "福冈", en: "Fukuoka" },
    vibe: {
      zh: "你是那种周五还在工位，周六已经在别的城市喝咖啡的人。行程不用长，但一定要低摩擦、好比较、马上能出发。",
      en: "You are the person who can go from desk to departure gate in one evening. The trip does not need to be long. It needs to be easy to compare, easy to book and worth the weekend.",
    },
    note: {
      zh: "推荐你去福冈：城市小、移动快、吃喝密度高，拉面、海边、商场和近郊散步都能塞进一个周末。",
      en: "Matched destination: Fukuoka. Compact, quick to move around and packed with ramen, seaside walks, shopping and easy day-trip energy.",
    },
    tags: {
      zh: ["说走就走", "周五出发", "轻行李选手"],
      en: ["Weekend ready", "Low friction", "Carry-on only"],
    },
    color: "#ee654f",
    skyscanner: {
      url: "https://www.skyscanner.com/flights/last-minute-deals/",
      title: {
        zh: "周末闪现人：先比较近期便宜机票",
        en: "FlashPack: compare last-minute flight deals",
      },
      copy: {
        zh: "用 Skyscanner 看临近航班、直飞选择和酒店，把时间留给福冈的拉面、海边和街区漫游。",
        en: "Use Skyscanner to compare nearby flight deals, direct options and stays, then spend the weekend on ramen, coastlines and easy neighborhoods.",
      },
      services: {
        zh: ["便宜机票", "直飞选择", "酒店"],
        en: ["Flight deals", "Direct flights", "Hotels"],
      },
    },
  },
  food: {
    name: "Snack Radar",
    displayName: { zh: "美食雷达", en: "Snack Radar" },
    label: { zh: "攻略可以不看，餐厅收藏夹必须先满。", en: "The itinerary starts wherever the next bite is." },
    image: "assets/personas/snack-radar.png",
    destination: { zh: "曼谷", en: "Bangkok" },
    vibe: {
      zh: "你的收藏夹里可能没有景点，但一定有餐厅。别人旅行看地标，你旅行靠胃导航；机票省一点，餐桌就多一点。",
      en: "Your saved list may skip landmarks, but never restaurants. You navigate by appetite, and every saved fare becomes more room for another great table.",
    },
    note: {
      zh: "推荐你去曼谷：街头小吃、精致餐厅、夜市和咖啡店密度都高，很适合一路吃出城市层次。",
      en: "Matched destination: Bangkok. Street food, night markets, coffee stops and serious restaurants make it a city you can taste one neighborhood at a time.",
    },
    tags: {
      zh: ["胃会带路", "夜市体质", "先订餐厅"],
      en: ["Food-led", "Market mode", "Save the table"],
    },
    color: "#0f837a",
    skyscanner: {
      url: "https://www.skyscanner.com/flights",
      title: {
        zh: "美食雷达：先把机票预算比下来",
        en: "Snack Radar: compare flights, save more for food",
      },
      copy: {
        zh: "在 Skyscanner 比较去曼谷的航班和酒店，把省下来的预算留给夜市、咖啡店和想吃很久的餐厅。",
        en: "Compare flights and hotels to Bangkok on Skyscanner, then keep more of the budget for markets, coffee and the meal you flew for.",
      },
      services: {
        zh: ["机票", "酒店", "美食预算"],
        en: ["Flights", "Hotels", "Food budget"],
      },
    },
  },
  budget: {
    name: "DealBrain",
    displayName: { zh: "捡漏小算盘", en: "DealBrain" },
    label: { zh: "便宜机票一出现，省钱 DNA 当场觉醒。", en: "A fare drop appears and the budget brain wakes up." },
    image: "assets/personas/dealbrain.png",
    destination: { zh: "清迈", en: "Chiang Mai" },
    vibe: {
      zh: "你不是抠，是会比较。机票、酒店、日期和总成本都要看清楚；找到好价本身，就是旅行开始前的快乐。",
      en: "You are not cheap. You are strategic. Flights, hotels, dates and total trip cost all get compared before you call it a deal.",
    },
    note: {
      zh: "推荐你去清迈：住宿和餐饮友好，慢旅行体验密度高，预算省下来还能多安排手作、咖啡和自然行程。",
      en: "Matched destination: Chiang Mai. Friendly stays, good food value and slow-travel experiences make your budget go further.",
    },
    tags: {
      zh: ["比价上头", "错峰大师", "钱花得值"],
      en: ["Deal hunter", "Flexible dates", "Worth it"],
    },
    color: "#f4c758",
    skyscanner: {
      url: "https://www.skyscanner.com/flights/last-minute-deals/",
      title: {
        zh: "捡漏小算盘：去 Skyscanner 找便宜机票",
        en: "DealBrain: find cheaper flight deals on Skyscanner",
      },
      copy: {
        zh: "适合先看低价机票和灵活日期，再把预算分给清迈的住宿、咖啡、手作和短途体验。",
        en: "Start with flight deals and flexible dates, then spend smarter on stays, coffee, workshops and easy day trips.",
      },
      services: {
        zh: ["便宜机票", "灵活日期", "酒店"],
        en: ["Cheap flights", "Flexible dates", "Hotels"],
      },
    },
  },
  luxury: {
    name: "Sleep Mode",
    displayName: { zh: "酒店躺平人", en: "Sleep Mode" },
    label: { zh: "行程可以没有，酒店床必须能回血。", en: "No packed schedule, just a bed that fixes everything." },
    image: "assets/personas/sleep-mode.png",
    destination: { zh: "京都", en: "Kyoto" },
    vibe: {
      zh: "你旅行不是为了把自己累到需要再请一天假。你要的是好床、好浴室、好早餐，以及住得舒服的确定感。",
      en: "You are not traveling to need another holiday afterwards. You want the right bed, the right breakfast and a stay that makes the whole trip feel calmer.",
    },
    note: {
      zh: "推荐你去京都：旅馆、料理、庭园和街巷都适合慢慢体验，很容易把假期过出仪式感。",
      en: "Matched destination: Kyoto. Ryokan stays, food, gardens and quiet streets make it perfect for a slower, stay-led trip.",
    },
    tags: {
      zh: ["酒店即景点", "慢节奏", "睡到自然醒"],
      en: ["Stay-first", "Slow days", "Breakfast matters"],
    },
    color: "#3d86a8",
    skyscanner: {
      url: "https://www.skyscanner.com/hotels",
      title: {
        zh: "酒店躺平人：先比较住得舒服的酒店",
        en: "Sleep Mode: compare stays that make the trip",
      },
      copy: {
        zh: "在 Skyscanner 看酒店、公寓和住宿选择，把京都这趟变成低摩擦、高质感的慢假期。",
        en: "Compare hotels, apartments and stays on Skyscanner, then build Kyoto around comfort, calm and better mornings.",
      },
      services: {
        zh: ["酒店", "精品住宿", "机票"],
        en: ["Hotels", "Apartments", "Flights"],
      },
    },
  },
  culture: {
    name: "BigBrain",
    displayName: { zh: "行程表掌控者", en: "BigBrain" },
    label: { zh: "旅行结束后的第一件事，是打开 Excel 表复盘。", en: "First thing after the trip: open the spreadsheet." },
    image: "assets/personas/bigbrain.png",
    destination: { zh: "首尔", en: "Seoul" },
    vibe: {
      zh: "你的旅行不是随便逛逛，是一份结构清晰的计划。展览时间、街区路线、酒店位置和交通成本，最好都能一眼比较。",
      en: "Your trip is not random wandering. It is a well-built plan where galleries, neighborhoods, hotel location and transit time all line up.",
    },
    note: {
      zh: "推荐你去首尔：设计、展览、街区商业和餐饮都很集中，适合按片区排出一条漂亮的城市路线。",
      en: "Matched destination: Seoul. Design, galleries, retail districts and food neighborhoods make it easy to build a smart city route.",
    },
    tags: {
      zh: ["计划表人格", "路线控", "不走回头路"],
      en: ["Planned route", "Good location", "No backtracking"],
    },
    color: "#70a85e",
    skyscanner: {
      url: "https://www.skyscanner.com/hotels",
      title: {
        zh: "行程表掌控者：把酒店放在路线中心点",
        en: "BigBrain: choose a hotel that makes the route work",
      },
      copy: {
        zh: "用 Skyscanner 对比酒店位置和价格，把住宿定在展览、咖啡店和设计街区附近。",
        en: "Compare hotel locations and prices on Skyscanner, then stay close to the galleries, cafés and neighborhoods on your map.",
      },
      services: {
        zh: ["酒店", "机票", "城市路线"],
        en: ["Hotels", "Flights", "City route"],
      },
    },
  },
  nature: {
    name: "Offline Mode",
    displayName: { zh: "自由断网人", en: "Offline Mode" },
    label: { zh: "手机先飞行模式，路线交给风景决定。", en: "Phone off, map open, plans decided by the view." },
    image: "assets/personas/offline-mode.png",
    destination: { zh: "冲绳", en: "Okinawa" },
    vibe: {
      zh: "你旅行的核心诉求是离线。少一点消息，多一点海风、山路和想停就停的自由。",
      en: "Your ideal trip feels offline. Fewer pings, more sea air, open roads and the freedom to stop when the view says so.",
    },
    note: {
      zh: "推荐你去冲绳：海岸线、离岛、潜水和慢节奏街区组合起来，很适合把自己从日常里捞出来。",
      en: "Matched destination: Okinawa. Coastlines, islands, diving spots and slower neighborhoods make it a natural fit for flexible exploring.",
    },
    tags: {
      zh: ["自由行", "看海体质", "不想赶场"],
      en: ["Car hire", "Coast mode", "No rush"],
    },
    color: "#0f837a",
    skyscanner: {
      url: "https://www.skyscanner.com/car-rental",
      title: {
        zh: "自由断网人：去 Skyscanner 看租车选择",
        en: "Offline Mode: compare car hire on Skyscanner",
      },
      copy: {
        zh: "适合在冲绳自驾看海、跑离岛码头和海岸线；Skyscanner 可以比较租车选择，再搭配机票和酒店。",
        en: "Compare car hire on Skyscanner for Okinawa, then pair it with flights and hotels for an easier self-drive trip.",
      },
      services: {
        zh: ["租车", "机票", "酒店"],
        en: ["Car hire", "Flights", "Hotels"],
      },
    },
  },
};

const defaultStoryHero = {
  src: "assets/travel-personality-hero.png",
  focus: "center",
  destination: { zh: "旅行人格测试", en: "Travel personality quiz" },
  alt: {
    zh: "旅行人格测试的目的地卡片和地图视觉",
    en: "Travel personality cards and map visual",
  },
};

const destinationHeroImages = {
  weekend: {
    src: "assets/destinations/fukuoka.jpg",
    focus: "center 58%",
    destination: { zh: "福冈", en: "Fukuoka" },
    alt: { zh: "福冈海边城市旅行照片", en: "Fukuoka seaside city travel photo" },
  },
  food: {
    src: "assets/destinations/bangkok.jpg",
    focus: "center 55%",
    destination: { zh: "曼谷", en: "Bangkok" },
    alt: { zh: "曼谷夜市和街头美食旅行照片", en: "Bangkok night market and street food travel photo" },
  },
  budget: {
    src: "assets/destinations/chiang-mai.jpg",
    focus: "center 54%",
    destination: { zh: "清迈", en: "Chiang Mai" },
    alt: { zh: "清迈古城和山景旅行照片", en: "Chiang Mai old city and mountain travel photo" },
  },
  luxury: {
    src: "assets/destinations/kyoto.jpg",
    focus: "center 56%",
    destination: { zh: "京都", en: "Kyoto" },
    alt: { zh: "京都庭园和旅馆街巷旅行照片", en: "Kyoto garden and ryokan street travel photo" },
  },
  culture: {
    src: "assets/destinations/seoul.jpg",
    focus: "center 54%",
    destination: { zh: "首尔", en: "Seoul" },
    alt: { zh: "首尔城市天际线和街区旅行照片", en: "Seoul skyline and neighborhood travel photo" },
  },
  nature: {
    src: "assets/destinations/okinawa.jpg",
    focus: "center 57%",
    destination: { zh: "冲绳", en: "Okinawa" },
    alt: { zh: "冲绳海岸和自驾公路旅行照片", en: "Okinawa coast and road trip travel photo" },
  },
};

const destinationHeroKeywords = [
  { type: "weekend", keywords: ["福冈", "fukuoka"] },
  { type: "food", keywords: ["曼谷", "bangkok"] },
  { type: "budget", keywords: ["清迈", "chiangmai", "chiang mai"] },
  { type: "luxury", keywords: ["京都", "kyoto"] },
  { type: "culture", keywords: ["首尔", "seoul"] },
  { type: "nature", keywords: ["冲绳", "okinawa"] },
];

const answers = [];
let currentQuestionId = startQuestionId;
let finalPersona = null;
let finalPersonaType = null;
let aiPersonalizedResult = null;
let aiRequestId = 0;
let currentLang = "zh";
let sharedMatchProfile = null;
let latestFriendMatch = null;

function localize(value) {
  if (typeof value === "string") {
    return value;
  }

  return value[currentLang];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char],
  );
}

function getPersonaDisplayName(persona) {
  return persona.displayName ? localize(persona.displayName) : persona.name;
}

function localizedValue(value, lang = currentLang) {
  if (typeof value === "string") {
    return value;
  }

  return value[lang];
}

function encodeMatchPayload(profile) {
  const bytes = new TextEncoder().encode(JSON.stringify(profile));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeMatchPayload(payload) {
  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function sanitizeSharedMatchProfile(profile) {
  if (!profile || profile.v !== 1 || !personaOrder.includes(profile.type)) {
    return null;
  }

  const scores = Array.isArray(profile.scores)
    ? profile.scores.slice(0, personaOrder.length).map((score) => Math.max(0, Number(score) || 0))
    : personaOrder.map((type) => Math.max(0, Number(profile.scores?.[type]) || 0));

  if (scores.length !== personaOrder.length || scores.every((score) => score === 0)) {
    return null;
  }

  return {
    v: 1,
    type: profile.type,
    name: String(profile.name || personas[profile.type].name).slice(0, 34),
    scores,
    answerTypes: Array.isArray(profile.answerTypes)
      ? profile.answerTypes.filter((type) => personaOrder.includes(type)).slice(0, totalQuizSteps)
      : [],
    destination: String(profile.destination || "").slice(0, 30),
  };
}

function readSharedMatchProfile() {
  const payload = new URLSearchParams(window.location.search).get("match");
  if (!payload) {
    return null;
  }

  try {
    return sanitizeSharedMatchProfile(decodeMatchPayload(payload));
  } catch {
    return null;
  }
}

function getScoreArray(scoreSummary) {
  return personaOrder.map((type) => Math.max(0, Number(scoreSummary[type]) || 0));
}

function normalizeScoreArray(scores) {
  const maxScore = Math.max(...scores, 1);
  return scores.map((score) => Math.max(0, Number(score) || 0) / maxScore);
}

function getCompatibilityKey(typeA, typeB) {
  return [typeA, typeB].sort().join("-");
}

function getPersonaCompatibility(typeA, typeB) {
  if (typeA === typeB) {
    return 1;
  }

  return personaCompatibility[getCompatibilityKey(typeA, typeB)] || 0.54;
}

function getAnswerTypeSimilarity(friendTypes) {
  if (!Array.isArray(friendTypes) || !friendTypes.length) {
    return 0.58;
  }

  const currentTypes = answers.map((answer) => answer.type);
  const length = Math.min(currentTypes.length, friendTypes.length);
  if (!length) {
    return 0.58;
  }

  const directMatches = currentTypes
    .slice(0, length)
    .filter((type, index) => type === friendTypes[index]).length;
  return directMatches / length;
}

function getMatchTone(score) {
  const copy = uiCopy[currentLang];
  if (score >= 86) {
    return copy.matchToneHigh;
  }

  if (score >= 72) {
    return copy.matchToneGood;
  }

  return copy.matchToneCareful;
}

function calculateFriendMatch() {
  if (!sharedMatchProfile || !finalPersonaType) {
    return null;
  }

  const currentScores = normalizeScoreArray(getScoreArray(getScoreSummary()));
  const friendScores = normalizeScoreArray(sharedMatchProfile.scores);
  const distance =
    currentScores.reduce((total, score, index) => total + Math.abs(score - friendScores[index]), 0) /
    personaOrder.length;
  const scoreSimilarity = Math.max(0, 1 - distance);
  const personaSimilarity = getPersonaCompatibility(sharedMatchProfile.type, finalPersonaType);
  const answerSimilarity = getAnswerTypeSimilarity(sharedMatchProfile.answerTypes);
  const combined = scoreSimilarity * 0.52 + personaSimilarity * 0.32 + answerSimilarity * 0.16;
  const score = Math.min(98, Math.max(54, Math.round(52 + combined * 46)));

  return {
    score,
    friendName: sharedMatchProfile.name,
    tone: getMatchTone(score),
  };
}

function buildShareProfile() {
  return {
    v: 1,
    type: finalPersonaType,
    name: getPersonaDisplayName(finalPersona),
    scores: getScoreArray(getScoreSummary()),
    answerTypes: answers.map((answer) => answer.type),
    destination: localize(finalPersona.destination),
  };
}

function getMatchShareUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("match", encodeMatchPayload(buildShareProfile()));
  url.hash = "";
  return url.toString();
}

function normalizeDestinationName(value) {
  return String(value).toLowerCase().replace(/[\s\-_.,，。:：]/g, "");
}

function getDestinationHeroType(destination) {
  const normalizedDestination = normalizeDestinationName(destination);
  const match = destinationHeroKeywords.find(({ keywords }) =>
    keywords.some((keyword) => normalizedDestination.includes(normalizeDestinationName(keyword))),
  );

  return match?.type || finalPersonaType;
}

function getStoryHeroForResult(result) {
  if (!result) {
    return defaultStoryHero;
  }

  const heroType = getDestinationHeroType(result.destination);
  return destinationHeroImages[heroType] || defaultStoryHero;
}

function setStoryHero(hero) {
  const storyHero = hero || defaultStoryHero;
  resultEls.hero.onerror = () => {
    resultEls.hero.onerror = null;
    resultEls.hero.src = defaultStoryHero.src;
    resultEls.hero.alt = localize(defaultStoryHero.alt);
    resultEls.hero.style.objectPosition = defaultStoryHero.focus;
  };
  resultEls.hero.src = storyHero.src;
  resultEls.hero.alt = localize(storyHero.alt);
  resultEls.hero.style.objectPosition = storyHero.focus;
}

function getDestinationPhotoLibrary() {
  return Object.values(destinationHeroImages).map((hero) => ({
    zh: hero.destination.zh,
    en: hero.destination.en,
  }));
}

function renderStaticCopy() {
  const copy = uiCopy[currentLang];
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.title = copy.pageTitle;
  staticEls.brandText.textContent = copy.brandText;
  staticEls.topbarNote.textContent = copy.topbarNote;
  staticEls.heroEyebrow.textContent = copy.heroEyebrow;
  staticEls.appTitle.textContent = copy.appTitle;
  staticEls.appLede.textContent = copy.appLede;
  staticEls.serviceFlights.textContent = copy.serviceFlights;
  staticEls.serviceHotels.textContent = copy.serviceHotels;
  staticEls.serviceCars.textContent = copy.serviceCars;
  staticEls.storyKicker.textContent = copy.storyKicker;
  staticEls.destinationLabel.textContent = copy.destinationLabel;
  staticEls.skyscannerLabel.textContent = copy.skyscannerLabel;
  backButton.textContent = copy.back;
  restartButton.textContent = copy.restart;
  copyButton.textContent = copy.copy;
  downloadButton.textContent = copy.download;

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLang));
  });
}

function renderQuestion() {
  const copy = uiCopy[currentLang];
  const question = questionBank[currentQuestionId];
  const currentStep = Math.min(answers.length + 1, totalQuizSteps);
  const matchInvite = sharedMatchProfile
    ? `<p class="match-invite">${escapeHtml(copy.matchInvite(sharedMatchProfile.name))}</p>`
    : "";
  stepLabel.textContent = copy.step(currentStep, totalQuizSteps);
  progressFill.style.width = `${(answers.length / totalQuizSteps) * 100}%`;
  backButton.disabled = answers.length === 0;
  resultActions.hidden = true;
  copyStatus.textContent = "";

  questionPanel.innerHTML = `
    <span class="question-label">${localize(question.label)}</span>
    <h2 class="question-title">${localize(question.title)}</h2>
    ${matchInvite}
    <div class="option-grid">
      ${question.options
        .map(
          (option, index) => `
            <button class="option-button" type="button" data-option-index="${index}">
              <span class="option-letter">${option.letter}</span>
              <span>
                <span class="option-title">${localize(option.title)}</span>
                <span class="option-copy">${localize(option.copy)}</span>
              </span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;

  questionPanel.querySelectorAll(".option-button").forEach((button) => {
    button.addEventListener("click", () => chooseAnswer(question.options[Number(button.dataset.optionIndex)]));
  });
}

function chooseAnswer(option) {
  const question = questionBank[currentQuestionId];
  answers.push({
    questionId: currentQuestionId,
    questionLabel: question.label,
    questionTitle: question.title,
    optionLetter: option.letter,
    optionTitle: option.title,
    optionCopy: option.copy,
    type: getPrimaryType(option),
    score: getOptionScore(option),
  });

  if (answers.length >= totalQuizSteps || !option.next) {
    showResult();
    return;
  }

  currentQuestionId = option.next;
  renderQuestion();
}

function getOptionScore(option) {
  if (option.score) {
    return { ...option.score };
  }

  if (option.type) {
    return { [option.type]: 1 };
  }

  return {};
}

function getPrimaryType(option) {
  if (option.type) {
    return option.type;
  }

  const scores = getOptionScore(option);
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "weekend";
}

function getResultType() {
  const counts = getScoreSummary();

  const priority = ["weekend", "food", "budget", "luxury", "culture", "nature"];
  const lastPrimaryType = [...answers].reverse().find((answer) => answer.type)?.type;
  return priority
    .map((type) => ({ type, count: counts[type] || 0 }))
    .sort(
      (a, b) =>
        b.count - a.count ||
        Number(b.type === lastPrimaryType) - Number(a.type === lastPrimaryType) ||
        priority.indexOf(a.type) - priority.indexOf(b.type),
    )[0].type;
}

function getScoreSummary() {
  return answers.reduce((acc, answer) => {
    Object.entries(answer.score).forEach(([type, points]) => {
      acc[type] = (acc[type] || 0) + points;
    });
    return acc;
  }, {});
}

function showResult() {
  const type = getResultType();
  finalPersonaType = type;
  finalPersona = personas[type];
  aiPersonalizedResult = null;
  latestFriendMatch = calculateFriendMatch();
  renderResult();
  requestPersonalizedResult();
}

function getSkyscannerUrlForAngle(angle) {
  const urls = {
    flights: "https://www.skyscanner.com/flights",
    flight_deals: "https://www.skyscanner.com/flights/last-minute-deals/",
    hotels: "https://www.skyscanner.com/hotels",
    car_hire: "https://www.skyscanner.com/car-rental",
  };

  return urls[angle] || finalPersona.skyscanner.url;
}

function normalizeList(value, fallback) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const cleaned = value.map((item) => String(item).trim()).filter(Boolean).slice(0, 3);
  return cleaned.length ? cleaned : fallback;
}

function getResultContent() {
  const fallbackTags = finalPersona.tags[currentLang];
  const fallbackServices = finalPersona.skyscanner.services[currentLang];

  if (!aiPersonalizedResult) {
    return {
      name: getPersonaDisplayName(finalPersona),
      label: localize(finalPersona.label),
      destination: localize(finalPersona.destination),
      note: localize(finalPersona.note),
      tags: fallbackTags,
      skyscannerUrl: finalPersona.skyscanner.url,
      skyscannerTitle: localize(finalPersona.skyscanner.title),
      skyscannerCopy: localize(finalPersona.skyscanner.copy),
      skyscannerServices: fallbackServices,
      shareCaption: "",
    };
  }

  return {
    name: aiPersonalizedResult.personaSubtype || getPersonaDisplayName(finalPersona),
    label: aiPersonalizedResult.vibeLine || localize(finalPersona.label),
    destination: aiPersonalizedResult.destination || localize(finalPersona.destination),
    note: aiPersonalizedResult.resultNote || localize(finalPersona.note),
    tags: normalizeList(aiPersonalizedResult.tags, fallbackTags),
    skyscannerUrl: getSkyscannerUrlForAngle(aiPersonalizedResult.skyscannerAngle),
    skyscannerTitle: aiPersonalizedResult.skyscannerTitle || localize(finalPersona.skyscanner.title),
    skyscannerCopy: aiPersonalizedResult.skyscannerCopy || localize(finalPersona.skyscanner.copy),
    skyscannerServices: normalizeList(aiPersonalizedResult.skyscannerServices, fallbackServices),
    shareCaption: aiPersonalizedResult.shareCaption || "",
  };
}

function renderResult() {
  const copy = uiCopy[currentLang];
  const result = getResultContent();
  latestFriendMatch = calculateFriendMatch();
  const resultLede = latestFriendMatch
    ? copy.matchResultLine(latestFriendMatch.score, latestFriendMatch.tone, latestFriendMatch.friendName)
    : aiPersonalizedResult?.shareCaption || localize(finalPersona.vibe);

  progressFill.style.width = "100%";
  stepLabel.textContent = copy.complete;
  questionPanel.innerHTML = `
    <span class="question-label">${copy.resultReady}</span>
    <h2 class="question-title">${escapeHtml(copy.resultTitle(result.name))}</h2>
    <p class="lede">${escapeHtml(resultLede)}</p>
    <div class="quiz-actions">
      <button class="primary-button" type="button" id="jumpResultButton">${copy.jumpResult}</button>
      <button class="ghost-button" type="button" id="playAgainInline">${copy.playAgain}</button>
    </div>
  `;

  resultEls.name.textContent = result.name;
  resultEls.vibe.textContent = result.label;
  setStoryHero(getStoryHeroForResult(result));
  resultEls.image.src = finalPersona.image;
  resultEls.image.alt = `${result.name} ${result.label}`;
  resultEls.image.hidden = false;
  resultEls.portrait.classList.remove("is-locked");
  resultEls.placeholder.hidden = true;
  resultEls.destination.textContent = result.destination;
  resultEls.note.textContent = result.note;
  resultEls.score.textContent = latestFriendMatch ? `${latestFriendMatch.score}%` : copy.friendStampReady;
  resultEls.scoreLabel.textContent = latestFriendMatch ? copy.friendStampMatchedLabel : copy.friendStampReadyLabel;
  resultEls.tags.innerHTML = result.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  resultEls.skyscannerLink.href = result.skyscannerUrl;
  resultEls.skyscannerTitle.textContent = result.skyscannerTitle;
  resultEls.skyscannerCopy.textContent = result.skyscannerCopy;
  resultEls.skyscannerServices.innerHTML = result.skyscannerServices
    .map((service) => `<span>${escapeHtml(service)}</span>`)
    .join("");
  document.documentElement.style.setProperty("--accent", finalPersona.color);

  resultActions.hidden = false;
  document.querySelector("#jumpResultButton").addEventListener("click", () => {
    document.querySelector("#shareCard").scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.querySelector("#playAgainInline").addEventListener("click", restartQuiz);
}

function renderDefaultResult() {
  const copy = uiCopy[currentLang];
  setStoryHero(defaultStoryHero);
  resultEls.image.hidden = true;
  resultEls.portrait.classList.add("is-locked");
  resultEls.placeholder.hidden = false;
  resultEls.name.textContent = copy.defaultName;
  resultEls.vibe.textContent = copy.defaultVibe;
  resultEls.destination.textContent = copy.defaultDestination;
  resultEls.note.textContent = copy.defaultNote;
  resultEls.score.textContent = copy.friendStampLocked;
  resultEls.scoreLabel.textContent = sharedMatchProfile ? copy.matchPendingLabel : copy.friendStampLockedLabel;
  resultEls.tags.innerHTML = copy.defaultTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  resultEls.skyscannerLink.href = "https://www.skyscanner.com/";
  resultEls.skyscannerTitle.textContent = copy.defaultSkyscannerTitle;
  resultEls.skyscannerCopy.textContent = copy.defaultSkyscannerCopy;
  resultEls.skyscannerServices.innerHTML = copy.defaultTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  document.documentElement.style.setProperty("--accent", "#0f837a");
}

function restartQuiz() {
  answers.length = 0;
  currentQuestionId = startQuestionId;
  finalPersona = null;
  finalPersonaType = null;
  aiPersonalizedResult = null;
  latestFriendMatch = null;
  aiRequestId += 1;
  copyStatus.textContent = "";
  renderDefaultResult();
  renderQuestion();
}

function buildAiPayload() {
  return {
    language: currentLang,
    persona: {
      type: finalPersonaType,
      name: finalPersona.name,
      displayName: getPersonaDisplayName(finalPersona),
      label: localize(finalPersona.label),
      destination: localize(finalPersona.destination),
      note: localize(finalPersona.note),
      tags: finalPersona.tags[currentLang],
      skyscannerTitle: localize(finalPersona.skyscanner.title),
      skyscannerCopy: localize(finalPersona.skyscanner.copy),
      skyscannerServices: finalPersona.skyscanner.services[currentLang],
    },
    destinationPhotoLibrary: getDestinationPhotoLibrary(),
    scores: getScoreSummary(),
    answers: answers.map((answer, index) => ({
      step: index + 1,
      questionId: answer.questionId,
      questionLabel: localizedValue(answer.questionLabel),
      question: localizedValue(answer.questionTitle),
      selectedLetter: answer.optionLetter,
      selected: localizedValue(answer.optionTitle),
      selectedDetail: localizedValue(answer.optionCopy),
      primaryType: answer.type,
      score: answer.score,
    })),
  };
}

function isValidAiResult(result) {
  const requiredStrings = [
    "personaSubtype",
    "vibeLine",
    "destination",
    "resultNote",
    "skyscannerAngle",
    "skyscannerTitle",
    "skyscannerCopy",
    "shareCaption",
  ];

  return (
    result &&
    requiredStrings.every((key) => typeof result[key] === "string" && result[key].trim()) &&
    Array.isArray(result.tags) &&
    result.tags.length >= 3 &&
    Array.isArray(result.skyscannerServices) &&
    result.skyscannerServices.length >= 3
  );
}

function shouldRequestPersonalizedResult() {
  return !window.location.hostname.endsWith("github.io");
}

async function requestPersonalizedResult() {
  if (!shouldRequestPersonalizedResult()) {
    return;
  }

  const requestId = aiRequestId + 1;
  aiRequestId = requestId;
  copyStatus.textContent = uiCopy[currentLang].aiLoading;

  try {
    const response = await fetch("/api/generate-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildAiPayload()),
    });

    if (!response.ok) {
      throw new Error(`AI endpoint returned ${response.status}`);
    }

    const data = await response.json();
    if (!data.ok || !isValidAiResult(data.result)) {
      throw new Error(data.error || "Invalid AI result");
    }

    if (requestId !== aiRequestId || !finalPersona) {
      return;
    }

    aiPersonalizedResult = data.result;
    renderResult();
    copyStatus.textContent = uiCopy[currentLang].aiReady;
  } catch {
    if (requestId === aiRequestId && finalPersona) {
      copyStatus.textContent = uiCopy[currentLang].aiFallback;
    }
  }
}

function getShareText() {
  const copy = uiCopy[currentLang];

  if (!finalPersona) {
    return copy.shareFallback;
  }

  const result = getResultContent();
  const caption = result.shareCaption ? `${result.shareCaption}\n` : "";
  const shareUrl = getMatchShareUrl();
  return `${caption}${copy.shareTitle} "${result.name} — ${result.label}"\n${copy.shareDestination}: ${result.destination}\n${result.note}\n${copy.shareInvite}\n${shareUrl}\n${result.skyscannerTitle}: ${result.skyscannerUrl}\n${copy.shareTags}`;
}

async function copyShareText() {
  const textToCopy = getShareText();

  try {
    await navigator.clipboard.writeText(textToCopy);
    copyStatus.textContent = uiCopy[currentLang].copyDone;
  } catch {
    copyStatus.textContent = textToCopy;
  }
}

async function downloadResultCard() {
  const copy = uiCopy[currentLang];

  if (!finalPersona) {
    copyStatus.textContent = copy.downloadFirst;
    return;
  }

  const result = getResultContent();
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1440;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const background = ctx.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, "#05203c");
  background.addColorStop(0.34, "#05203c");
  background.addColorStop(0.341, "#eef6fd");
  background.addColorStop(1, "#f8fbff");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 92, 142, 896, 1186, 34);
  ctx.fill();

  ctx.fillStyle = "#005eb8";
  roundRect(ctx, 92, 142, 896, 14, 7);
  ctx.fill();

  ctx.fillStyle = "#e8f4ff";
  roundRect(ctx, 150, 208, 338, 74, 37);
  ctx.fill();

  try {
    const avatar = await loadImage(finalPersona.image);
    ctx.save();
    roundRect(ctx, 672, 196, 230, 230, 42);
    ctx.clip();
    ctx.drawImage(avatar, 672, 196, 230, 230);
    ctx.restore();
  } catch {
    // If the image cannot be loaded, keep the poster text-only.
  }

  ctx.fillStyle = "#004f9f";
  ctx.font = "900 34px system-ui, sans-serif";
  ctx.fillText(copy.posterServices, 186, 256);

  ctx.fillStyle = "#05203c";
  ctx.font = "900 54px system-ui, sans-serif";
  ctx.fillText(copy.posterKicker, 150, 374);

  ctx.fillStyle = "#005eb8";
  ctx.font = "900 102px system-ui, sans-serif";
  wrapCanvasText(ctx, result.name, 150, 526, 760, 112);

  ctx.fillStyle = "#05203c";
  ctx.font = "800 44px system-ui, sans-serif";
  wrapCanvasText(ctx, result.label, 150, 666, 760, 56);

  ctx.fillStyle = "#005f59";
  ctx.font = "900 42px system-ui, sans-serif";
  ctx.fillText(copy.posterDestination, 150, 800);

  ctx.fillStyle = "#05203c";
  ctx.font = "900 88px system-ui, sans-serif";
  ctx.fillText(result.destination, 150, 910);

  ctx.fillStyle = "#2f435a";
  ctx.font = "500 38px system-ui, sans-serif";
  wrapCanvasText(ctx, result.note, 150, 1010, 780, 54);

  ctx.fillStyle = "#004f9f";
  ctx.font = "900 34px system-ui, sans-serif";
  wrapCanvasText(ctx, `Skyscanner: ${result.skyscannerTitle}`, 150, 1184, 780, 46);

  ctx.fillStyle = "#05203c";
  ctx.font = "800 32px system-ui, sans-serif";
  wrapCanvasText(ctx, result.tags.map((tag) => `#${tag}`).join("  "), 150, 1270, 780, 42);

  ctx.fillStyle = "#2f435a";
  ctx.font = "700 28px system-ui, sans-serif";
  ctx.fillText(copy.posterBrand, 150, 1320);

  const link = document.createElement("a");
  link.download = `travel-personality-${finalPersona.name.toLowerCase().replaceAll(" ", "-")}-${currentLang}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  copyStatus.textContent = copy.downloadDone;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function wrapCanvasText(ctx, textToWrap, x, y, maxWidth, lineHeight) {
  const hasSpaces = textToWrap.includes(" ");
  const tokens = hasSpaces ? textToWrap.split(" ") : Array.from(textToWrap);
  const joiner = hasSpaces ? " " : "";
  let line = "";
  let currentY = y;

  tokens.forEach((token) => {
    const testLine = line ? `${line}${joiner}${token}` : token;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = token;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line) {
    ctx.fillText(line, x, currentY);
  }
}

backButton.addEventListener("click", () => {
  if (answers.length > 0) {
    const previousAnswer = answers.pop();
    currentQuestionId = previousAnswer.questionId;
    finalPersona = null;
    finalPersonaType = null;
    aiPersonalizedResult = null;
    latestFriendMatch = null;
    aiRequestId += 1;
    resultActions.hidden = true;
    renderQuestion();
  }
});

restartButton.addEventListener("click", restartQuiz);
copyButton.addEventListener("click", copyShareText);
downloadButton.addEventListener("click", downloadResultCard);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLang = button.dataset.lang;
    copyStatus.textContent = "";
    renderStaticCopy();

    if (finalPersona) {
      aiPersonalizedResult = null;
      renderResult();
      requestPersonalizedResult();
    } else {
      renderDefaultResult();
      renderQuestion();
    }
  });
});

sharedMatchProfile = readSharedMatchProfile();
renderStaticCopy();
renderDefaultResult();
renderQuestion();
