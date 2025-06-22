import "dotenv/config";
import linebot from "linebot";
import commandPopularGif from "./commands/popularGif.js";
// import commandUnsplash from "./commands/unsplash.js";
import commandNews from "./commands/news.js";
import commandWeather from "./commands/weather.js";
import commandFood from "./commands/food.js";
import qrFood from "./commands/foodQuickreply.js";
import qrGif from "./commands/gifreply.js";

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const userStates = new Map();

bot.on("error", (err) => {
  console.error("LINE Bot 錯誤:", err);
});

bot.on("message", async (event) => {
  const userId = event.source.userId;
  const msgType = event.message.type;
  const msg = event.message.text ? event.message.text.trim() : "";

  // === 新聞：本週焦點新聞（carousel message） ===
  if (msg.includes("新聞") || msg.includes("時事")) {
    commandNews(event);
    return;
  }

  // === 天氣：一週天氣（圖片訊息） ===
  if (msgType === "text" && msg.includes("天氣")) {
    userStates.set(userId, "awaiting-weather-location");
    await event.reply(
      "🌦️ 不知道怎麼開話題？有時候「今天天氣不錯」就夠用了，我先查查你那邊的天氣吧～ 傳地區或位置給我就行！"
    );
    return;
  }

  // === 食物推薦功能 ===
  if (
    msg.includes("餐廳") ||
    msg.includes("食物") ||
    msg.includes("下一餐") ||
    msg.includes("吃什麼")
  ) {
    console.log("觸發食物選單");
    try {
      const result = await qrFood(event);
      console.log("QuickReply 結果:", result); // 檢查回應內容
      userStates.set(userId, "awaiting-food-type");
      console.log("使用者狀態:", userStates.get(userId));
      return;
    } catch (error) {
      console.error("食物選單錯誤:", error.response || error);
      await event.reply("抱歉，發生錯誤，請稍後再試");
    }
  }

  // === 好笑 gif 推薦功能 ===
  if (msg.toLowerCase().includes("gif")) {
    console.log("使用者訊息:", msg);
    await qrGif(event);
    return;
  }

  // ✅ 等待 GIF 關鍵字輸入
  if (userStates.get(userId) === "awaiting-gif-keyword" && msgType === "text") {
    userStates.delete(userId); // 清除狀態

    // 模擬 postback 結構，讓 commandGif.js 可共用處理邏輯
    event.postback = {
      data: `type=gif,mode=keyword,keyword=${encodeURIComponent(msg)}`,
    };
    await commandPopularGif(event);
    return;
  }

  // === 等待天氣地點 ===
  if (userStates.get(userId) === "awaiting-weather-location") {
    userStates.delete(userId); // 查詢完清除狀態
    await commandWeather(event); // 執行天氣查詢功能
  }

  //  === 等待食物種類後，取得地點 ===
  if (userStates.get(userId) === "awaiting-food-type") {
    userStates.set(userId, `awaiting-food-location:${msg}`); // 保存食物種類
    await event.reply(
      "🍔 不用客氣，你只要說在哪裡或傳個位置就好，讓我幫你決定下一餐。"
    );
    return;
  }

  // 接收位置或地區，查詢餐廳
  if (
    userStates.get(userId)?.startsWith("awaiting-food-location") &&
    (event.message.type === "text" || event.message.type === "location")
  ) {
    const selectedType = userStates.get(userId).split(":")[1];
    userStates.delete(userId);
    await commandFood(event, selectedType);
    return;
  }
});

// 📌 對 postback 回傳進行監聽
bot.on("postback", async (event) => {
  const userId = event.source.userId;
  const data = event.postback.data;
  console.log(data);

  if (data.startsWith("foodtype=")) {
    const foodType = data.split("=")[1];
    userStates.set(userId, `awaiting-food-location:${foodType}`);
    await event.reply(
      "🍔 不用客氣，你只要說在哪裡或傳個位置就好，讓我幫你決定下一餐。"
    );
    return;
  }
  // ✳️ 使用者選了「關鍵字搜尋 GIF」
  if (data === "type=gif,mode=keyword") {
    userStates.set(userId, "awaiting-gif-keyword");
    await event.reply("🔍 有情緒沒語言？輸入關鍵字，我來幫你翻譯成 gif ");
    return;
  }

  // ✳️ 使用者選了「熱門 trending」
  if (data === "type=gif,mode=trending") {
    await commandPopularGif(event); // 直接執行 trending
    return;
  }
});

bot.listen("/", process.env.PORT || 3000, () => {
  console.log("linebot is running");
});
