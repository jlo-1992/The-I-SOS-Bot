import axios from "axios";
import fs from "fs";

export default async (event) => {
  const data = event.postback.data || "";
  const isTrending = data.includes("mode=trending");

  // 預設搜尋關鍵字
  const keywordMatch = data.match(/keyword=([^,&]+)/);
  const keyword = keywordMatch ? decodeURIComponent(keywordMatch[1]) : "狗";

  let gifs = null;
  const messages = [];

  try {
    if (isTrending) {
      // === 熱門 trending 模式 ===
      const res = await axios.get("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: process.env.GIPHY_API_KEY,
          limit: 5,
          rating: "g",
        },
      });
      gifs = res.data?.data;
    } else {
      // === 搜尋關鍵字模式 ===
      const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: process.env.GIPHY_API_KEY,
          q: keyword,
          limit: 100,
          offset: 0,
          rating: "g",
          lang: "zh-TW",
        },
      });

      const random = Math.floor(Math.random() * (res.data.data.length - 3));
      gifs = res.data.data.slice(random, random + 3);
    }

    if (gifs && gifs.length > 0) {
      gifs.forEach((item) => {
        const mp4 = item?.images?.original?.mp4;
        if (mp4) {
          messages.push({
            type: "video",
            originalContentUrl: mp4,
            previewImageUrl: mp4,
          });
        }
      });

      return await event.reply(messages);
    } else {
      return await event.reply({
        type: "text",
        text: isTrending
          ? "目前找不到熱門的 GIF 😢"
          : `找不到和「${keyword}」相關的 GIF 😢`,
      });
    }
  } catch (error) {
    console.error("GIPHY API 錯誤:", error.message);
    await event.reply("取得 GIF 時發生錯誤，請稍後再試");

    if (process.env.DEV === "true") {
      fs.writeFileSync(
        "./dump/giphy_error.json",
        JSON.stringify({ error: error.message, data }, null, 2)
      );
    }
  }
};
