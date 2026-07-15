const fs = require("node:fs");
const { test, expect } = require("@playwright/test");
const jsQR = require("jsqr");
const { PNG } = require("pngjs");

const personas = {
  weekend: "周末闪现人",
  food: "美食雷达",
  budget: "捡漏小算盘",
  luxury: "酒店躺平人",
  culture: "行程表掌控者",
  nature: "自由断网人",
};

const destinations = [
  { type: "weekend", index: 0, zh: "福冈", image: "fukuoka.jpg", iata: "FUK" },
  { type: "weekend", index: 1, zh: "台北", image: "taipei.jpg", iata: "TPE" },
  { type: "weekend", index: 2, zh: "新加坡", image: "singapore.jpg", iata: "SIN" },
  { type: "food", index: 0, zh: "曼谷", image: "bangkok.jpg", iata: "BKK" },
  { type: "food", index: 1, zh: "墨西哥城", image: "mexico-city.jpg", iata: "MEX" },
  { type: "food", index: 2, zh: "博洛尼亚", image: "bologna.jpg", iata: "BLQ" },
  { type: "budget", index: 0, zh: "清迈", image: "chiang-mai.jpg", iata: "CNX" },
  { type: "budget", index: 1, zh: "河内", image: "hanoi.jpg", iata: "HAN" },
  { type: "budget", index: 2, zh: "第比利斯", image: "tbilisi.jpg", iata: "TBS" },
  { type: "luxury", index: 0, zh: "京都", image: "kyoto.jpg", iata: "OSA" },
  { type: "luxury", index: 1, zh: "巴厘岛", image: "bali.jpg", iata: "DPS" },
  { type: "luxury", index: 2, zh: "马拉喀什", image: "marrakech.jpg", iata: "RAK" },
  { type: "culture", index: 0, zh: "首尔", image: "seoul.jpg", iata: "SEL" },
  { type: "culture", index: 1, zh: "巴黎", image: "paris.jpg", iata: "PAR" },
  { type: "culture", index: 2, zh: "伊斯坦布尔", image: "istanbul.jpg", iata: "IST" },
  { type: "nature", index: 0, zh: "冲绳", image: "okinawa.jpg", iata: "OKA" },
  { type: "nature", index: 1, zh: "皇后镇", image: "queenstown.jpg", iata: "ZQN" },
  { type: "nature", index: 2, zh: "雷克雅未克", image: "reykjavik.jpg", iata: "REK" },
];

function encodeMatchPayload(payload) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

async function waitForTestApi(page) {
  await page.waitForFunction(() => Boolean(window.__travelPersonalityTest));
}

test.describe("quiz results", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?test=1");
    await waitForTestApi(page);
  });

  for (const [type, displayName] of Object.entries(personas)) {
    test(`${displayName} can produce a result`, async ({ page }) => {
      const result = await page.evaluate((personaType) => window.__travelPersonalityTest.completeAs(personaType), type);

      expect(result.type).toBe(type);
      await expect(page.locator("#resultName")).toHaveText(displayName);
      await expect(page.locator("#resultActions")).toBeVisible();
      await expect(page.locator("#skyscannerServices a")).toHaveCount(3);
      await expect(page.locator("#matchReasons")).toBeVisible();
      await expect(page.locator("#matchReasonsList li")).toHaveCount(3);

      const repeatedResult = await page.evaluate((personaType) => window.__travelPersonalityTest.completeAs(personaType), type);
      expect(repeatedResult.destination).toBe(result.destination);
    });
  }

  test("all 18 destinations render their own image and travel links", async ({ page }) => {
    for (const destination of destinations) {
      const result = await page.evaluate(
        ({ type, index }) => window.__travelPersonalityTest.renderDestination(type, index),
        destination,
      );

      expect(result.destination).toBe(destination.zh);
      await expect(page.locator("#destinationName")).toHaveText(destination.zh);
      await expect(page.locator("#storyHeroImage")).toHaveAttribute("src", new RegExp(`${destination.image}$`));
      await expect(page.locator("#matchReasonsList li")).toHaveCount(3);
      await expect(page.locator("#matchReasonsList")).toContainText(destination.zh);

      const links = await page.locator("#skyscannerServices a").evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.href),
      );
      expect(links).toHaveLength(3);
      expect(links[0]).toContain(`destination=${destination.iata}`);
      expect(links[1]).toContain(`skyscanner_node_code=${destination.iata}`);
      expect(links[2]).toContain(`pickupPlace=${destination.iata}`);
      expect(links[2]).toContain(`dropoffPlace=${destination.iata}`);
      for (const link of links) {
        const url = new URL(link);
        expect(url.searchParams.get("market")).toBe("CN");
        expect(url.searchParams.get("locale")).toBe("zh-CN");
        expect(url.searchParams.get("currency")).toBe("CNY");
      }
    }
  });
});

test("switches between Chinese and English", async ({ page }) => {
  await page.goto("/?test=1");
  await waitForTestApi(page);

  for (const selector of ["#serviceFlights", "#serviceHotels", "#serviceCars"]) {
    const url = new URL(await page.locator(selector).getAttribute("href"));
    expect(url.searchParams.get("market")).toBe("CN");
    expect(url.searchParams.get("locale")).toBe("zh-CN");
    expect(url.searchParams.get("currency")).toBe("CNY");
  }

  await page.locator('[data-lang="en"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#appTitle")).toContainText("Find your travel type");
  await expect(page.locator("#serviceCars")).toHaveText("Car hire");
  await expect(page).toHaveTitle("Travel Personality | Find Your Travel Type and Next Destination");
  await expect(page.locator("#serviceFlights")).toHaveAttribute("href", "https://www.skyscanner.com/flights");
  await expect(page.locator("#serviceHotels")).toHaveAttribute("href", "https://www.skyscanner.com/hotels");
  await expect(page.locator("#serviceCars")).toHaveAttribute("href", "https://www.skyscanner.com/car-rental");

  await page.evaluate(() => window.__travelPersonalityTest.renderDestination("weekend", 0));
  const englishResultLinks = await page.locator("#skyscannerServices a").evaluateAll((anchors) =>
    anchors.map((anchor) => anchor.href),
  );
  for (const link of englishResultLinks) {
    const url = new URL(link);
    expect(url.searchParams.has("market")).toBe(false);
    expect(url.searchParams.has("locale")).toBe(false);
    expect(url.searchParams.has("currency")).toBe(false);
  }

  await page.locator('[data-lang="zh"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.locator("#serviceCars")).toHaveText("租车");
  await expect(page).toHaveTitle("旅行人格测试｜测出你的旅行方式与下一站");
  const chineseResultLinks = await page.locator("#skyscannerServices a").evaluateAll((anchors) =>
    anchors.map((anchor) => anchor.href),
  );
  for (const link of chineseResultLinks) {
    const url = new URL(link);
    expect(url.searchParams.get("market")).toBe("CN");
    expect(url.searchParams.get("locale")).toBe("zh-CN");
    expect(url.searchParams.get("currency")).toBe("CNY");
  }
});

for (const matchVersion of [1, 2]) {
  test(`accepts v${matchVersion} friend match links`, async ({ page }) => {
    const payload = matchVersion === 1
      ? {
          v: 1,
          type: "weekend",
          scores: { weekend: 12, food: 2, budget: 1, luxury: 0, culture: 0, nature: 1 },
          answerTypes: Array(7).fill("weekend"),
        }
      : {
          v: 2,
          t: 0,
          s: [12, 2, 1, 0, 0, 1],
          a: Array(7).fill(0),
        };

    await page.goto(`/?test=1&match=${encodeMatchPayload(payload)}`);
    await waitForTestApi(page);
    await expect(page.locator(".match-invite")).toBeVisible();

    const profile = await page.evaluate(() => window.__travelPersonalityTest.getSharedMatchProfile());
    expect(profile.v).toBe(matchVersion);
    expect(profile.type).toBe("weekend");

    await page.evaluate(() => window.__travelPersonalityTest.completeAs("weekend"));
    await expect(page.locator("#scoreValue")).toHaveText(/%$/);
    await expect(page.locator("#scoreLabel")).toHaveText("搭子 match");
  });
}

test("poster QR code decodes to a v2 friend match link", async ({ page }) => {
  await page.goto("/?test=1");
  await waitForTestApi(page);
  await page.evaluate(() => window.__travelPersonalityTest.completeAs("nature"));

  const downloadPromise = page.waitForEvent("download");
  await page.locator("#downloadButton").click();
  const download = await downloadPromise;
  const downloadPath = await download.path();
  const png = PNG.sync.read(fs.readFileSync(downloadPath));
  const pixels = new Uint8ClampedArray(png.data.buffer, png.data.byteOffset, png.data.byteLength);
  const decoded = jsQR(pixels, png.width, png.height, { inversionAttempts: "dontInvert" });

  expect(decoded, "The generated poster should contain a decodable QR code").not.toBeNull();
  const qrUrl = new URL(decoded.data);
  expect(qrUrl.origin).toBe("http://127.0.0.1:4173");
  const encodedProfile = qrUrl.searchParams.get("match");
  expect(encodedProfile).toBeTruthy();
  const profile = JSON.parse(Buffer.from(encodedProfile, "base64url").toString("utf8"));
  expect(profile.v).toBe(2);
  expect(profile.t).toBe(5);
});
