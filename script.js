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
    download: "保存结果卡",
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
    matchInvite: "好友邀请你测测旅行人格，答完就能看你们适不适合一起出发。",
    matchResultLine: (score, tone) => `你们的旅行搭子指数是 ${score}%。${tone}`,
    matchToneHigh: "天选搭子，已经可以开始讨论请假日期。",
    matchToneGood: "很能一起玩，先把预算和作息对齐就稳了。",
    matchToneCareful: "有点互补，出发前最好先谈清楚谁早起、谁找餐厅。",
    copyDone: "分享文案和匹配链接已复制。",
    downloadFirst: "先完成测试，再保存结果卡。",
    savePreparing: "正在生成结果卡...",
    saveSheetOpened: "结果卡已生成，可在系统面板里选择保存到照片/相册。",
    saveCancelled: "已取消保存。需要的话可以再点一次保存结果卡。",
    saveFailed: "结果卡生成失败，可以先截图保存当前结果卡。",
    downloadDone: "结果卡已生成；如果没有弹出相册选项，图片会在浏览器下载里。",
    aiLoading: "AI 正在把结果改得更像你...",
    aiReady: "AI 个性化结果已生成。",
    aiFallback: "结果卡已生成，看看你的下一站是不是很对味。",
    shareFallback: "我刚在测旅行人格，想看看会抽到哪座城市。",
    shareInvite: "你也测测看你的旅行人格？顺便看看我们适不适合当旅行搭子：",
    posterKicker: "我的旅行人格",
    posterDestination: "这次抽到",
    posterServices: "旅行人格测试",
    posterReaction: "这次的结果，有点像我。",
    posterBrand: "没有标准答案，开心就好。",
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
    download: "Save card",
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
    matchInvite: "A friend invited you to find your travel type. Finish the quiz to see how well you would travel together.",
    matchResultLine: (score, tone) => `Your travel-duo match is ${score}%. ${tone}`,
    matchToneHigh: "Very strong match. You can probably start comparing dates.",
    matchToneGood: "Good travel-duo energy. Align budget and pace, then go.",
    matchToneCareful: "Complementary, but agree on mornings, food stops and budget first.",
    copyDone: "Share caption and match link copied.",
    downloadFirst: "Finish the quiz first, then save your card.",
    savePreparing: "Creating your result card...",
    saveSheetOpened: "Your card is ready. Choose Save Image or Photos in the system sheet.",
    saveCancelled: "Save cancelled. Tap Save card again when you are ready.",
    saveFailed: "Could not create the card. You can still screenshot the result card.",
    downloadDone: "Your card is ready. If no photo option appeared, check your browser downloads.",
    aiLoading: "AI is personalizing your result...",
    aiReady: "AI-personalized result ready.",
    aiFallback: "Your result card is ready. See if the next trip fits your vibe.",
    shareFallback: "I just took a travel personality quiz to see which city I would draw.",
    shareInvite: "Want to find your travel personality too? Let's see whether we'd make good travel buddies:",
    posterKicker: "My travel type",
    posterDestination: "This time I got",
    posterServices: "TRAVEL QUIZ",
    posterReaction: "Honestly, this feels like me.",
    posterBrand: "No right answer — just for fun.",
  },
};

const totalQuizSteps = 7;
const startQuestionId = "tripSpark";
const enableAiPersonalization = false;
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

const questionText = (zh, en) => ({ zh, en });

function questionOption(letter, titleZh, titleEn, copyZh, copyEn, score, next) {
  return {
    letter,
    title: questionText(titleZh, titleEn),
    copy: questionText(copyZh, copyEn),
    score,
    ...(next ? { next } : {}),
  };
}

const questionBank = {
  tripSpark: {
    label: questionText("出发念头", "Trip spark"),
    title: questionText("现在最想要哪种旅行？", "What kind of trip do you want right now?"),
    options: [
      questionOption("A", "两天也能换个城市", "A two-day city reset", "时间不长，也要真的离开日常。", "Short, but far enough from routine.", { weekend: 2, budget: 1 }, "sparkShort"),
      questionOption("B", "跟着一口想吃的出发", "Follow one serious craving", "先决定吃什么，再决定去哪里。", "Pick the food, then the city.", { food: 2, culture: 1 }, "sparkFood"),
      questionOption("C", "找个地方好好睡几晚", "Sleep properly somewhere else", "少赶路，多恢复。", "Less rushing, more recovery.", { luxury: 2, nature: 1 }, "sparkStay"),
      questionOption("D", "沿着山海随时改路线", "Roam between coast and hills", "路线可以跟着天气走。", "Let the weather edit the route.", { nature: 2, weekend: 1 }, "sparkRoam"),
    ],
  },
  sparkShort: {
    label: questionText("短途习惯", "Short-trip habit"),
    title: questionText("短途出发，你会先解决什么？", "What do you solve first for a short trip?"),
    options: [
      questionOption("A", "只带一个随身包", "Take one carry-on", "少收拾，才能快出发。", "Pack less and leave faster.", { weekend: 2, nature: 1 }, "bookingChoice"),
      questionOption("B", "选落地就能玩的时段", "Land with time to explore", "第一天不能只剩入住。", "Day one should be more than check-in.", { weekend: 2, culture: 1 }, "bookingChoice"),
      questionOption("C", "留半天给自己恢复", "Keep half a day to recover", "回来后不想像没睡过。", "Come home without feeling wrecked.", { luxury: 2, weekend: 1 }, "bookingChoice"),
      questionOption("D", "等票价和日期都合适", "Wait for the right fare and date", "短途也要花得明白。", "Even short trips should feel worth it.", { budget: 2, weekend: 1 }, "bookingChoice"),
    ],
  },
  sparkFood: {
    label: questionText("第一顿", "First meal"),
    title: questionText("到陌生城市，第一顿怎么选？", "How do you choose the first meal in a new city?"),
    options: [
      questionOption("A", "先逛市场和街边摊", "Start at a market", "边走边吃，看到什么算什么。", "Walk, taste and decide as you go.", { food: 2, budget: 1 }, "bookingChoice"),
      questionOption("B", "提前订最想吃的那家", "Book the one place you really want", "先把期待最高的一顿锁住。", "Lock in the meal you care about most.", { food: 2, luxury: 1 }, "bookingChoice"),
      questionOption("C", "去超市看当地人吃什么", "Browse a local supermarket", "日常食物也能读懂城市。", "Everyday food says a lot about a city.", { food: 1, culture: 1 }, "bookingChoice"),
      questionOption("D", "不看清单，跟着香味走", "Follow whatever smells good", "好吃的也可以偶遇。", "Good food can be an accident.", { food: 1, nature: 1 }, "bookingChoice"),
    ],
  },
  sparkStay: {
    label: questionText("住下以后", "After check-in"),
    title: questionText("进房间后，什么最先影响心情？", "What changes your mood first after check-in?"),
    options: [
      questionOption("A", "安静和一张好床", "Quiet and a good bed", "睡稳了，整趟才稳。", "A good trip starts with good sleep.", { luxury: 2 }, "bookingChoice"),
      questionOption("B", "浴缸、窗景或阳台", "A bath, view or balcony", "房间里也要有度假感。", "The room should feel like part of the trip.", { luxury: 1, nature: 1 }, "bookingChoice"),
      questionOption("C", "下楼就能逛的街区", "A neighborhood outside the door", "位置好，城市会更轻松。", "The right location makes the city easier.", { culture: 2, luxury: 1 }, "bookingChoice"),
      questionOption("D", "淡季价格换更好房间", "Off-season value for a better room", "同样预算，当然想住得更好。", "Same budget, better room.", { budget: 2, luxury: 1 }, "bookingChoice"),
    ],
  },
  sparkRoam: {
    label: questionText("离线时刻", "Offline moment"),
    title: questionText("手机突然没信号，你会？", "Your phone loses signal. What do you do?"),
    options: [
      questionOption("A", "打开提前存好的离线地图", "Open the offline map", "自由归自由，方向还是要有。", "Free, but not directionless.", { culture: 2, nature: 1 }, "bookingChoice"),
      questionOption("B", "沿着眼前顺眼的路走", "Take the road that looks good", "走错也可能是新路线。", "A wrong turn can become the route.", { nature: 2 }, "bookingChoice"),
      questionOption("C", "问当地人附近有什么", "Ask someone nearby", "方向和吃的都可以顺便问。", "Ask for a direction and maybe a meal.", { nature: 1, food: 1 }, "bookingChoice"),
      questionOption("D", "先回到熟悉的交通线上", "Return to a familiar route", "省下折腾，把体力留给风景。", "Save the energy for the actual trip.", { weekend: 1, luxury: 1 }, "bookingChoice"),
    ],
  },
  bookingChoice: {
    label: questionText("核心取舍", "Core trade-off"),
    title: questionText("只能优先一件事，你会选？", "If only one thing can come first, what is it?"),
    options: [
      questionOption("A", "总价始终可控", "Keep the total cost under control", "每一笔都知道花在哪里。", "Know where every part of the budget goes.", { budget: 3 }, "budgetReality"),
      questionOption("B", "从家到酒店少折腾", "Make door-to-door travel easy", "路上顺，假期才完整。", "A smoother journey protects the holiday.", { weekend: 2, luxury: 1 }, "paceReality"),
      questionOption("C", "每天有一个确定期待", "Have one anchor each day", "一顿饭、一个展或一条街都行。", "A meal, an exhibit or one good street.", { culture: 2, food: 1 }, "curiosityReality"),
      questionOption("D", "行程随时可以调整", "Keep the plan changeable", "天气和心情都有决定权。", "Let weather and mood have a vote.", { nature: 2 }, "weatherReality"),
    ],
  },
  budgetReality: {
    label: questionText("预算变化", "Budget change"),
    title: questionText("总价突然多了 20%，你先改哪项？", "The total jumps 20%. What changes first?"),
    options: [
      questionOption("A", "酒店降一级", "Choose a simpler stay", "睡得干净就行。", "Clean and comfortable is enough.", { budget: 2 }, "travelBuddy"),
      questionOption("B", "少住一晚", "Stay one night less", "时间缩短，重点保留。", "Shorten the trip, keep the highlights.", { budget: 1, weekend: 1 }, "travelBuddy"),
      questionOption("C", "放弃一个热门体验", "Skip one famous experience", "不为打卡硬花钱。", "Do not pay just to tick a box.", { budget: 1, culture: 1 }, "travelBuddy"),
      questionOption("D", "不改，舒服更重要", "Keep it — comfort matters more", "多花一点，少累一点。", "Spend a little more, struggle less.", { luxury: 2 }, "travelBuddy"),
    ],
  },
  paceReality: {
    label: questionText("空出来的时间", "An open afternoon"),
    title: questionText("下午突然空出三小时，你会？", "Three free hours appear. What do you do?"),
    options: [
      questionOption("A", "回酒店睡一觉", "Go back for a nap", "空档就是用来回血的。", "Free time is recovery time.", { luxury: 2 }, "travelBuddy"),
      questionOption("B", "找一顿没计划的好吃的", "Find an unplanned meal", "多出来的时间刚好加餐。", "Extra time means an extra bite.", { food: 2 }, "travelBuddy"),
      questionOption("C", "看附近有没有展览", "Look for a nearby exhibition", "不赶远路，也不浪费兴趣。", "Stay nearby and follow the curiosity.", { culture: 2 }, "travelBuddy"),
      questionOption("D", "去城外走一小段", "Take a short trip outside town", "换个视野再回来。", "Change the view, then come back.", { nature: 2 }, "travelBuddy"),
    ],
  },
  curiosityReality: {
    label: questionText("陌生街区", "New neighborhood"),
    title: questionText("走进没做攻略的街区，你先注意什么？", "What catches you first in an unplanned neighborhood?"),
    options: [
      questionOption("A", "老建筑和街道故事", "Old buildings and street stories", "想知道这里为什么长这样。", "You want to know why the place looks this way.", { culture: 2 }, "travelBuddy"),
      questionOption("B", "排队的小店和香味", "Queues and good smells", "当地人的饭点很诚实。", "Local lunch queues are honest clues.", { food: 2 }, "travelBuddy"),
      questionOption("C", "店铺、酒店和空间设计", "Shops, hotels and design", "细节好看，走路也有意思。", "Good details make walking worthwhile.", { culture: 1, luxury: 1 }, "travelBuddy"),
      questionOption("D", "树荫、水边和安静小路", "Shade, water and quiet paths", "先找到能慢下来的方向。", "Find the route that slows things down.", { nature: 2 }, "travelBuddy"),
    ],
  },
  weatherReality: {
    label: questionText("天气改线", "Weather reroute"),
    title: questionText("大雨打乱行程，你会？", "Heavy rain breaks the plan. What now?"),
    options: [
      questionOption("A", "换成博物馆或书店", "Switch to a museum or bookshop", "室内也能继续认识城市。", "Keep discovering the city indoors.", { culture: 2 }, "travelBuddy"),
      questionOption("B", "就近找家店慢慢吃", "Settle in for a long meal", "雨停之前先照顾胃。", "Feed yourself while the rain passes.", { food: 2 }, "travelBuddy"),
      questionOption("C", "回酒店泡澡或补觉", "Return for a bath or nap", "天气不好，休息可以更好。", "Bad weather can still mean good rest.", { luxury: 2 }, "travelBuddy"),
      questionOption("D", "查哪里天晴就往哪走", "Find clearer skies and reroute", "目的地没变，路线可以变。", "Keep the destination, change the route.", { nature: 2, weekend: 1 }, "travelBuddy"),
    ],
  },
  travelBuddy: {
    label: questionText("同行角色", "Travel role"),
    title: questionText("一起旅行时，你通常会接手什么？", "What do you naturally take charge of on a group trip?"),
    options: [
      questionOption("A", "预算和预订", "Budget and bookings", "先把大账和关键时间定住。", "Lock the big costs and key times.", { budget: 2, weekend: 1 }, "buddyBudget"),
      questionOption("B", "餐厅和大家的胃", "Meals and everyone's appetite", "别的能晚，饭点不能乱。", "Other things can slip. Meals cannot.", { food: 2, luxury: 1 }, "buddyFood"),
      questionOption("C", "路线和门票", "Routes and tickets", "让大家少排队、少回头。", "Less queueing, less backtracking.", { culture: 2, weekend: 1 }, "buddyPlan"),
      questionOption("D", "留白和临时调整", "Space and last-minute changes", "计划不用满，大家舒服就好。", "The plan can stay loose if everyone feels good.", { nature: 2, luxury: 1 }, "buddyFlex"),
    ],
  },
  buddyBudget: {
    label: questionText("一起花钱", "Shared spending"),
    title: questionText("大家花钱习惯不同，怎样最公平？", "Different spending habits: what feels fairest?"),
    options: [
      questionOption("A", "每笔按实际消费分", "Split each item by use", "清楚一点，回来不用猜。", "Keep it clear and avoid guessing later.", { budget: 2, culture: 1 }, "lastTurn"),
      questionOption("B", "轮流请客，差不多就行", "Take turns paying", "账不用太细，气氛更重要。", "Keep the math light and the mood easy.", { budget: 1, food: 1 }, "lastTurn"),
      questionOption("C", "只先对齐住宿和交通", "Align only on stays and transport", "大项一致，小项各自自由。", "Agree on big costs, keep small ones personal.", { budget: 1, nature: 1 }, "lastTurn"),
      questionOption("D", "为省时间和舒服多付一点", "Pay more for time and comfort", "有些便利值得一起买。", "Some convenience is worth sharing.", { luxury: 2, weekend: 1 }, "lastTurn"),
    ],
  },
  buddyFood: {
    label: questionText("口味不同", "Different tastes"),
    title: questionText("同行口味不一样，怎么安排？", "Your group wants different food. What works?"),
    options: [
      questionOption("A", "去市场，各吃各的", "Go to a market and split up", "选择多，也不用互相迁就。", "More choice, less compromise.", { food: 2, nature: 1 }, "lastTurn"),
      questionOption("B", "提前订一家都能接受的", "Book one place everyone likes", "先保住一顿共同期待。", "Protect one meal everyone can enjoy.", { food: 1, culture: 1 }, "lastTurn"),
      questionOption("C", "早餐在酒店解决", "Use the hotel breakfast as a base", "先吃稳，再各自探索。", "Start easy, explore later.", { luxury: 2, food: 1 }, "lastTurn"),
      questionOption("D", "一人选一顿", "Take turns choosing meals", "每个人都有自己的主场。", "Everyone gets a turn.", { food: 1, weekend: 1 }, "lastTurn"),
    ],
  },
  buddyPlan: {
    label: questionText("计划变化", "Plan change"),
    title: questionText("同行迟到半小时，你会？", "Someone is 30 minutes late. What do you do?"),
    options: [
      questionOption("A", "马上重排后面的路线", "Reorder the route", "顺序可以变，重点别丢。", "Change the order, keep the highlights.", { culture: 2 }, "lastTurn"),
      questionOption("B", "删掉一个点，别再赶", "Drop one stop", "少看一个，也别全程焦虑。", "See less without rushing the rest.", { luxury: 1, culture: 1 }, "lastTurn"),
      questionOption("C", "先分开，下一站集合", "Split up and meet later", "不同节奏也能共存。", "Different paces can coexist.", { nature: 1, food: 1 }, "lastTurn"),
      questionOption("D", "就近换一个替代选项", "Pick a nearby alternative", "不用完美，别停在原地。", "It need not be perfect — keep moving.", { weekend: 2, culture: 1 }, "lastTurn"),
    ],
  },
  buddyFlex: {
    label: questionText("临时提议", "Sudden idea"),
    title: questionText("路上有人突然想改线，你会？", "Someone suddenly wants to reroute. Your response?"),
    options: [
      questionOption("A", "有意思就现在去", "If it sounds good, go now", "难得都到了，别等下次。", "You are already here — do not wait for next time.", { nature: 2, weekend: 1 }, "lastTurn"),
      questionOption("B", "先看距离和关门时间", "Check distance and closing time", "临时也可以有基本判断。", "Spontaneous can still be sensible.", { nature: 1, culture: 1 }, "lastTurn"),
      questionOption("C", "先看附近有没有好吃的", "Check the food nearby", "路线能改，饭点也要接得上。", "Reroute, but keep the meal working.", { nature: 1, food: 1 }, "lastTurn"),
      questionOption("D", "今天累了就留到明天", "Save it for tomorrow if tired", "自由也包括选择不去。", "Freedom also means choosing not to go.", { luxury: 2 }, "lastTurn"),
    ],
  },
  lastTurn: {
    label: questionText("留给下次", "Keep for next time"),
    title: questionText("下次旅行，你最想保留哪个习惯？", "Which habit would you keep for the next trip?"),
    options: [
      questionOption("A", "看到合适的周末就出发", "Leave when a good weekend appears", "灵感别放到过期。", "Do not let the idea expire.", { weekend: 2, budget: 1 }),
      questionOption("B", "每到一地认真吃一顿", "Give every place one proper meal", "用味道记住目的地。", "Remember the place through taste.", { food: 2, culture: 1 }),
      questionOption("C", "少排一个点，住舒服一点", "Plan one stop less and rest better", "回来时也要有电。", "Come home with some energy left.", { luxury: 2, nature: 1 }),
      questionOption("D", "留半天给计划外", "Leave half a day unplanned", "让天气和偶遇参与决定。", "Let weather and chance join the plan.", { nature: 2, culture: 1 }),
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

const personaDestinationAlternatives = {
  weekend: [
    {
      destination: { zh: "首尔", en: "Seoul" },
      note: {
        zh: "这次抽中首尔：交通清楚、街区密度高，咖啡、逛街和夜宵很容易压缩进一个短周末。",
        en: "This time you matched Seoul: clear transport and dense neighborhoods make coffee, shopping and late-night food fit a short weekend.",
      },
    },
    {
      destination: { zh: "曼谷", en: "Bangkok" },
      note: {
        zh: "这次抽中曼谷：只挑一两个街区也能迅速进入状态，适合把有限时间留给夜市、按摩和好吃的。",
        en: "This time you matched Bangkok: one or two neighborhoods are enough for markets, massages and great food on a fast escape.",
      },
    },
  ],
  food: [
    {
      destination: { zh: "福冈", en: "Fukuoka" },
      note: {
        zh: "这次抽中福冈：拉面、屋台、海鲜和咖啡集中，胃的路线不用绕远，短时间也能吃得很完整。",
        en: "This time you matched Fukuoka: ramen, yatai, seafood and coffee sit close together, so an appetite-led route stays easy.",
      },
    },
    {
      destination: { zh: "首尔", en: "Seoul" },
      note: {
        zh: "这次抽中首尔：市场、烤肉、咖啡店和深夜食堂各有一条路线，很适合按街区一路吃过去。",
        en: "This time you matched Seoul: markets, barbecue, cafés and late-night spots give every neighborhood its own food route.",
      },
    },
  ],
  budget: [
    {
      destination: { zh: "曼谷", en: "Bangkok" },
      note: {
        zh: "这次抽中曼谷：住宿和餐饮档位丰富，预算可以灵活分配，省下来的部分还能多换几顿和一次按摩。",
        en: "This time you matched Bangkok: wide-ranging stays and food make it easy to rebalance the budget and still add another meal or massage.",
      },
    },
    {
      destination: { zh: "福冈", en: "Fukuoka" },
      note: {
        zh: "这次抽中福冈：城市紧凑、移动成本低，少花时间和交通费，也是一种很聪明的旅行性价比。",
        en: "This time you matched Fukuoka: a compact city keeps transport and wasted time low, which is its own kind of smart value.",
      },
    },
  ],
  luxury: [
    {
      destination: { zh: "冲绳", en: "Okinawa" },
      note: {
        zh: "这次抽中冲绳：海景房、度假酒店和慢早晨都很对你的节奏，少排几个点反而更像真正休息。",
        en: "This time you matched Okinawa: sea-view stays, resort mornings and fewer plans turn the trip into an actual reset.",
      },
    },
    {
      destination: { zh: "曼谷", en: "Bangkok" },
      note: {
        zh: "这次抽中曼谷：酒店、泳池、早餐和按摩选择很多，完全可以把住宿本身安排成假期主线。",
        en: "This time you matched Bangkok: hotels, pools, breakfast and spa choices make the stay itself a convincing main event.",
      },
    },
  ],
  culture: [
    {
      destination: { zh: "京都", en: "Kyoto" },
      note: {
        zh: "这次抽中京都：寺院、庭园、街巷和料理都适合分区规划，路线做得越细，现场反而越从容。",
        en: "This time you matched Kyoto: temples, gardens, lanes and food reward a carefully grouped route without making the day feel rushed.",
      },
    },
    {
      destination: { zh: "福冈", en: "Fukuoka" },
      note: {
        zh: "这次抽中福冈：城市尺度友好，博物馆、设计商店、海边和街区路线很容易排成一张清爽的计划表。",
        en: "This time you matched Fukuoka: museums, design shops, the waterfront and compact neighborhoods make a clean, satisfying plan.",
      },
    },
  ],
  nature: [
    {
      destination: { zh: "清迈", en: "Chiang Mai" },
      note: {
        zh: "这次抽中清迈：山路、乡野、咖啡和慢节奏适合随时改路线，把一天交给天气和当下心情。",
        en: "This time you matched Chiang Mai: mountain roads, countryside and a slower rhythm leave room to follow the weather and your mood.",
      },
    },
    {
      destination: { zh: "京都", en: "Kyoto" },
      note: {
        zh: "这次抽中京都：山边步道、庭园和安静街区能把城市与自然接在一起，不赶场也有很多风景。",
        en: "This time you matched Kyoto: hillside walks, gardens and quiet neighborhoods connect city and nature without a packed schedule.",
      },
    },
  ],
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

const defaultPersonaImage = {
  src: "assets/personas/default-traveler.png",
  alt: {
    zh: "默认旅行人格贴纸",
    en: "Default travel personality sticker",
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
const personalizedQuestions = new Map();
const aiQuestionPendingKeys = new Set();
let currentQuestionId = startQuestionId;
let finalPersona = null;
let finalPersonaType = null;
let finalDestinationVariant = null;
let aiPersonalizedResult = null;
let aiRequestId = 0;
let aiQuestionRequestId = 0;
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

function getRandomIndex(length) {
  if (length <= 1) {
    return 0;
  }

  if (window.crypto?.getRandomValues) {
    const randomValue = new Uint32Array(1);
    window.crypto.getRandomValues(randomValue);
    return randomValue[0] % length;
  }

  return Math.floor(Math.random() * length);
}

function getRandomItem(items) {
  return items[getRandomIndex(items.length)];
}

function chooseDestinationVariant(type) {
  const persona = personas[type];
  const variants = [
    { destination: persona.destination, note: persona.note },
    ...(personaDestinationAlternatives[type] || []),
  ];
  const storageKey = `travel-personality:last-destination:${type}`;
  let lastDestination = "";

  try {
    lastDestination = window.sessionStorage.getItem(storageKey) || "";
  } catch {
    // Some file:// or privacy modes disable session storage; randomness still works without it.
  }

  const freshVariants = variants.filter((variant) => variant.destination.en !== lastDestination);
  const selected = getRandomItem(freshVariants.length ? freshVariants : variants);

  try {
    window.sessionStorage.setItem(storageKey, selected.destination.en);
  } catch {
    // Ignore unavailable storage and keep the selected local result.
  }

  return selected;
}

function localizedValue(value, lang = currentLang) {
  if (typeof value === "string") {
    return value;
  }

  return value[lang];
}

function trimAiText(value, fallback, maxLength) {
  const text = typeof value === "string" ? value.trim() : "";
  return (text || fallback).slice(0, maxLength);
}

function getQuestionPersonalizationKey(questionId = currentQuestionId) {
  const history = answers.map((answer) => `${answer.questionId}:${answer.optionLetter}`).join("|");
  return `${currentLang}:${questionId}:${history}`;
}

function normalizeAiQuestionResult(result, baseQuestion) {
  if (!isValidAiQuestionResult(result, baseQuestion)) {
    return null;
  }

  return {
    label: trimAiText(result.label, localize(baseQuestion.label), currentLang === "zh" ? 8 : 18),
    title: trimAiText(result.title, localize(baseQuestion.title), currentLang === "zh" ? 34 : 86),
    options: baseQuestion.options.map((option, index) => {
      const aiOption = result.options[index];
      return {
        ...option,
        title: trimAiText(aiOption.title, localize(option.title), currentLang === "zh" ? 22 : 54),
        copy: trimAiText(aiOption.copy, localize(option.copy), currentLang === "zh" ? 34 : 86),
      };
    }),
  };
}

function getDisplayQuestion(questionId = currentQuestionId) {
  const baseQuestion = questionBank[questionId];
  const personalized = personalizedQuestions.get(getQuestionPersonalizationKey(questionId));

  if (!personalized) {
    return baseQuestion;
  }

  return {
    ...baseQuestion,
    label: personalized.label,
    title: personalized.title,
    options: personalized.options,
  };
}

function invalidateQuestionPersonalization(clearCache = false) {
  aiQuestionRequestId += 1;
  aiQuestionPendingKeys.clear();

  if (clearCache) {
    personalizedQuestions.clear();
  }
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
    scores,
    answerTypes: Array.isArray(profile.answerTypes)
      ? profile.answerTypes.filter((type) => personaOrder.includes(type)).slice(0, totalQuizSteps)
      : [],
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
    tone: getMatchTone(score),
  };
}

function buildShareProfile() {
  return {
    v: 1,
    type: finalPersonaType,
    scores: getScoreArray(getScoreSummary()),
    answerTypes: answers.map((answer) => answer.type),
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

function getKnownDestinationHeroType(destination) {
  const normalizedDestination = normalizeDestinationName(destination);
  const match = destinationHeroKeywords.find(({ keywords }) =>
    keywords.some((keyword) => normalizedDestination.includes(normalizeDestinationName(keyword))),
  );

  return match?.type || null;
}

function getDestinationHeroType(destination) {
  return getKnownDestinationHeroType(destination) || finalPersonaType;
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
  const question = getDisplayQuestion(currentQuestionId);
  const currentStep = Math.min(answers.length + 1, totalQuizSteps);
  const matchInvite = sharedMatchProfile
    ? `<p class="match-invite">${escapeHtml(copy.matchInvite)}</p>`
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
    button.addEventListener("click", () => chooseAnswer(Number(button.dataset.optionIndex)));
  });

  requestPersonalizedQuestion(currentQuestionId);
}

function chooseAnswer(optionIndex) {
  const baseQuestion = questionBank[currentQuestionId];
  const displayQuestion = getDisplayQuestion(currentQuestionId);
  const option = baseQuestion.options[optionIndex];
  const displayOption = displayQuestion.options[optionIndex] || option;
  answers.push({
    questionId: currentQuestionId,
    questionLabel: displayQuestion.label,
    questionTitle: displayQuestion.title,
    optionLetter: option.letter,
    optionTitle: displayOption.title,
    optionCopy: displayOption.copy,
    type: getPrimaryType(option),
    score: getOptionScore(option),
  });
  invalidateQuestionPersonalization();

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
  const ranked = priority
    .map((type) => ({ type, count: counts[type] || 0 }))
    .sort((a, b) => b.count - a.count || priority.indexOf(a.type) - priority.indexOf(b.type));
  const highestScore = ranked[0].count;
  const tiedLeaders = ranked.filter((item) => item.count === highestScore);
  return getRandomItem(tiedLeaders).type;
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
  finalDestinationVariant = chooseDestinationVariant(type);
  aiPersonalizedResult = null;
  latestFriendMatch = calculateFriendMatch();
  renderResult();
  requestPersonalizedResult();
}

const skyscannerDestinationSearch = {
  weekend: {
    iata: "FUK",
    hotelUrl: "https://www.skyscanner.com/hotels/japan/fukuoka-hotels/ci-27541740",
  },
  food: {
    iata: "BKK",
    hotelUrl: "https://www.skyscanner.com/hotels/thailand/bangkok-hotels/ci-27536671",
  },
  budget: {
    iata: "CNX",
    hotelUrl: "https://www.skyscanner.com/hotels/thailand/chiang-mai-hotels/ci-27539873",
  },
  luxury: {
    iata: "UKY",
    hotelUrl: "https://www.skyscanner.com/hotels/japan/kyoto-hotels/ci-27548351",
  },
  culture: {
    iata: "SEL",
    hotelUrl: "https://www.skyscanner.com/hotels/south-korea/seoul-hotels/ci-27538638",
  },
  nature: {
    iata: "OKA",
    hotelUrl: "https://www.skyscanner.com/hotels/japan/okinawa-hotels/ci-27540768",
  },
};

const skyscannerReferralBaseUrl = "https://www.skyscanner.net/g/referrals/v1";

function getSkyscannerAngleFromUrl(url) {
  if (url.includes("car-rental")) {
    return "car_hire";
  }

  if (url.includes("hotels")) {
    return "hotels";
  }

  if (url.includes("last-minute-deals")) {
    return "flight_deals";
  }

  return "flights";
}

function inferSkyscannerAngleFromServices(services, fallbackAngle) {
  const serviceText = services.join(" ").toLowerCase();

  if (/租车|car hire|car rental/.test(serviceText)) {
    return "car_hire";
  }

  if (/酒店|住宿|hotel|hotels|stay|stays|apartment/.test(serviceText)) {
    return "hotels";
  }

  if (/便宜|低价|捡漏|deal|deals|cheap|last-minute|flexible/.test(serviceText)) {
    return "flight_deals";
  }

  if (/机票|航班|flight|flights/.test(serviceText)) {
    return "flights";
  }

  return fallbackAngle;
}

function getSkyscannerSearchType(angle) {
  return angle === "hotels" ? "hotels" : "flights";
}

function getSkyscannerDestinationConfig(destination) {
  const heroType = getKnownDestinationHeroType(destination);
  return skyscannerDestinationSearch[heroType] || null;
}

function buildSkyscannerUrl(angle, destination) {
  const resolvedAngle = angle || getSkyscannerAngleFromUrl(finalPersona.skyscanner.url);
  const searchType = getSkyscannerSearchType(resolvedAngle);
  const destinationConfig = getSkyscannerDestinationConfig(destination);

  if (!destinationConfig) {
    return searchType === "hotels"
      ? "https://www.skyscanner.com/hotels"
      : "https://www.skyscanner.com/flights";
  }

  if (searchType === "hotels") {
    return destinationConfig.hotelUrl;
  }

  const url = new URL(`${skyscannerReferralBaseUrl}/flights/cheap-flights-to`);
  url.searchParams.set("destination", destinationConfig.iata);
  return url.toString();
}

function normalizeList(value, fallback) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const cleaned = value.map((item) => String(item).trim()).filter(Boolean).slice(0, 3);
  return cleaned.length ? cleaned : fallback;
}

function getLocalSkyscannerTitle(angle, destination) {
  const personaName = getPersonaDisplayName(finalPersona);
  const searchType = getSkyscannerSearchType(angle);
  const labels = {
    zh: {
      flights: `看看从你附近出发去${destination}的机票`,
      hotels: `看看${destination}的酒店`,
    },
    en: {
      flights: `see flights from near you to ${destination}`,
      hotels: `see hotels in ${destination}`,
    },
  };
  return `${personaName}: ${labels[currentLang][searchType]}`;
}

function getLocalSkyscannerCopy(angle, destination) {
  const searchType = getSkyscannerSearchType(angle);
  const copyByAngle = {
    zh: {
      flights: `目的地已经填好；打开后会按你的访问地区显示出发选项，日期可以再调整。`,
      hotels: `${destination}已经填好；打开后选择入住日期，就能查看当地酒店。`,
    },
    en: {
      flights: `The destination is filled in. Open it to see departure options for your region, then adjust the dates.`,
      hotels: `${destination} is filled in. Open it, choose your dates and browse local stays.`,
    },
  };
  return copyByAngle[currentLang][searchType];
}

function getLocalSkyscannerServices(angle) {
  const searchType = getSkyscannerSearchType(angle);
  const services = {
    zh: {
      flights: ["附近出发", "目的地已填", "日期可选"],
      hotels: ["目的地已填", "酒店", "日期可选"],
    },
    en: {
      flights: ["Nearby origin", "Destination set", "Flexible dates"],
      hotels: ["Destination set", "Hotels", "Choose dates"],
    },
  };
  return services[currentLang][searchType];
}

function getResultContent() {
  const fallbackTags = finalPersona.tags[currentLang];
  const fallbackServices = finalPersona.skyscanner.services[currentLang];
  const localVariant = finalDestinationVariant || {
    destination: finalPersona.destination,
    note: finalPersona.note,
  };
  const fallbackDestination = localize(localVariant.destination);
  const fallbackNote = localize(localVariant.note);
  const fallbackAngle = getSkyscannerAngleFromUrl(finalPersona.skyscanner.url);

  if (!aiPersonalizedResult) {
    return {
      name: getPersonaDisplayName(finalPersona),
      label: localize(finalPersona.label),
      destination: fallbackDestination,
      note: fallbackNote,
      tags: fallbackTags,
      skyscannerUrl: buildSkyscannerUrl(fallbackAngle, fallbackDestination),
      skyscannerTitle: getLocalSkyscannerTitle(fallbackAngle, fallbackDestination),
      skyscannerCopy: getLocalSkyscannerCopy(fallbackAngle, fallbackDestination),
      skyscannerServices: getLocalSkyscannerServices(fallbackAngle),
      shareCaption: "",
    };
  }

  const aiDestination = aiPersonalizedResult.destination || fallbackDestination;
  const aiServices = normalizeList(aiPersonalizedResult.skyscannerServices, fallbackServices);
  const aiAngle = inferSkyscannerAngleFromServices(
    aiServices,
    aiPersonalizedResult.skyscannerAngle || fallbackAngle,
  );

  return {
    name: aiPersonalizedResult.personaSubtype || getPersonaDisplayName(finalPersona),
    label: aiPersonalizedResult.vibeLine || localize(finalPersona.label),
    destination: aiDestination,
    note: aiPersonalizedResult.resultNote || fallbackNote,
    tags: normalizeList(aiPersonalizedResult.tags, fallbackTags),
    skyscannerUrl: buildSkyscannerUrl(aiAngle, aiDestination),
    skyscannerTitle: aiPersonalizedResult.skyscannerTitle || localize(finalPersona.skyscanner.title),
    skyscannerCopy: aiPersonalizedResult.skyscannerCopy || localize(finalPersona.skyscanner.copy),
    skyscannerServices: aiServices,
    shareCaption: aiPersonalizedResult.shareCaption || "",
  };
}

function renderResult() {
  const copy = uiCopy[currentLang];
  const result = getResultContent();
  latestFriendMatch = calculateFriendMatch();
  const resultLede = latestFriendMatch
    ? copy.matchResultLine(latestFriendMatch.score, latestFriendMatch.tone)
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
  resultActions.hidden = true;
  resultEls.image.removeAttribute("src");
  resultEls.image.src = defaultPersonaImage.src;
  resultEls.image.alt = localize(defaultPersonaImage.alt);
  resultEls.image.hidden = false;
  resultEls.portrait.classList.add("is-locked");
  resultEls.placeholder.hidden = true;
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
  finalDestinationVariant = null;
  aiPersonalizedResult = null;
  latestFriendMatch = null;
  aiRequestId += 1;
  invalidateQuestionPersonalization(true);
  copyStatus.textContent = "";
  renderQuestion();
  renderDefaultResult();
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

function buildAiQuestionPayload(questionId) {
  const question = questionBank[questionId];
  return {
    language: currentLang,
    step: Math.min(answers.length + 1, totalQuizSteps),
    totalSteps: totalQuizSteps,
    sharedMatchMode: Boolean(sharedMatchProfile),
    scores: getScoreSummary(),
    question: {
      id: questionId,
      label: localize(question.label),
      title: localize(question.title),
      options: question.options.map((option) => ({
        letter: option.letter,
        title: localize(option.title),
        copy: localize(option.copy),
        primaryType: getPrimaryType(option),
        scoreIntent: option.score,
      })),
    },
    answers: answers.map((answer, index) => ({
      step: index + 1,
      questionId: answer.questionId,
      questionLabel: localizedValue(answer.questionLabel),
      question: localizedValue(answer.questionTitle),
      selectedLetter: answer.optionLetter,
      selected: localizedValue(answer.optionTitle),
      selectedDetail: localizedValue(answer.optionCopy),
      primaryType: answer.type,
    })),
  };
}

function isValidAiQuestionResult(result, baseQuestion) {
  return (
    result &&
    typeof result.label === "string" &&
    typeof result.title === "string" &&
    Array.isArray(result.options) &&
    result.options.length === baseQuestion.options.length &&
    result.options.every(
      (option, index) =>
        option &&
        option.letter === baseQuestion.options[index].letter &&
        typeof option.title === "string" &&
        typeof option.copy === "string" &&
        option.title.trim() &&
        option.copy.trim(),
    )
  );
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

function shouldRequestAiPersonalization() {
  return enableAiPersonalization;
}

function shouldRequestPersonalizedResult() {
  return shouldRequestAiPersonalization();
}

async function requestPersonalizedQuestion(questionId = currentQuestionId) {
  if (!shouldRequestAiPersonalization() || finalPersona || answers.length === 0) {
    return;
  }

  const baseQuestion = questionBank[questionId];
  if (!baseQuestion) {
    return;
  }

  const questionKey = getQuestionPersonalizationKey(questionId);
  if (personalizedQuestions.has(questionKey) || aiQuestionPendingKeys.has(questionKey)) {
    return;
  }

  const requestId = aiQuestionRequestId + 1;
  aiQuestionRequestId = requestId;
  aiQuestionPendingKeys.add(questionKey);

  try {
    const response = await fetch("/api/personalize-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildAiQuestionPayload(questionId)),
    });

    if (!response.ok) {
      throw new Error(`AI endpoint returned ${response.status}`);
    }

    const data = await response.json();
    const personalized = normalizeAiQuestionResult(data.result, baseQuestion);
    if (!data.ok || !personalized) {
      throw new Error(data.error || "Invalid AI question");
    }

    if (
      requestId !== aiQuestionRequestId ||
      finalPersona ||
      currentQuestionId !== questionId ||
      questionKey !== getQuestionPersonalizationKey(questionId)
    ) {
      return;
    }

    personalizedQuestions.set(questionKey, personalized);
    renderQuestion();
  } catch {
    // AI question personalization is optional; keep the deterministic local question.
  } finally {
    aiQuestionPendingKeys.delete(questionKey);
  }
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

  const shareUrl = getMatchShareUrl();
  return `${copy.shareInvite}\n${shareUrl}`;
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

function getResultCardFilename() {
  return `travel-personality-${finalPersona.name.toLowerCase().replaceAll(" ", "-")}-${currentLang}.png`;
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }

      reject(new Error("Unable to create result card image."));
    }, "image/png");
  });
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.download = filename;
  link.href = url;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function createResultCardBlob() {
  const copy = uiCopy[currentLang];
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
  wrapCanvasText(ctx, copy.posterReaction, 150, 1184, 780, 46);

  ctx.fillStyle = "#05203c";
  ctx.font = "800 32px system-ui, sans-serif";
  wrapCanvasText(ctx, result.tags.map((tag) => `#${tag}`).join("  "), 150, 1270, 780, 42);

  ctx.fillStyle = "#2f435a";
  ctx.font = "700 28px system-ui, sans-serif";
  ctx.fillText(copy.posterBrand, 150, 1320);

  return canvasToBlob(canvas);
}

async function downloadResultCard() {
  const copy = uiCopy[currentLang];

  if (!finalPersona) {
    copyStatus.textContent = copy.downloadFirst;
    return;
  }

  copyStatus.textContent = copy.savePreparing;

  try {
    const blob = await createResultCardBlob();
    const filename = getResultCardFilename();

    if (window.File && navigator.share && navigator.canShare) {
      const file = new File([blob], filename, { type: "image/png" });
      const shareData = {
        files: [file],
        title: copy.posterKicker,
        text: copy.shareInvite,
      };

      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          copyStatus.textContent = copy.saveSheetOpened;
          return;
        } catch (error) {
          if (error?.name === "AbortError") {
            copyStatus.textContent = copy.saveCancelled;
            return;
          }
        }
      }
    }

    downloadBlob(blob, filename);
    copyStatus.textContent = copy.downloadDone;
  } catch {
    copyStatus.textContent = copy.saveFailed;
  }
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
    finalDestinationVariant = null;
    aiPersonalizedResult = null;
    latestFriendMatch = null;
    aiRequestId += 1;
    invalidateQuestionPersonalization(true);
    resultActions.hidden = true;
    renderQuestion();
    renderDefaultResult();
  }
});

restartButton.addEventListener("click", restartQuiz);
copyButton.addEventListener("click", copyShareText);
downloadButton.addEventListener("click", downloadResultCard);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLang = button.dataset.lang;
    copyStatus.textContent = "";
    invalidateQuestionPersonalization(true);
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
