import axios from "axios";
import fs from "fs";

export default async (event) => {
  const keyword = event.postback.data.replace("type=gif,", "") || "狗";
  let gifs = null;
  const messages = [];
  const random = Math.round(Math.random() * (50 - 1) + 1);

  try {
    // 呼叫 GIPHY API
    const gif = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        q: keyword,
        limit: 100,
        offset: 0,
        rating: "g",
        lang: "zh-TW",
      },
    });
    gifs = gif.data?.data;

    gifs.slice(random, random + 3).forEach(async function (item) {
      const url = item?.images?.original?.url;
      if (url) {
        messages.push({
          type: "image",
          originalContentUrl: url,
          previewImageUrl: url,
        });
      }
    });

    if (gifs.length > 0) {
      event.reply(messages);
    }

    if (gifs.length === 0 || !gifs) {
      return await event.reply({
        type: "text",
        text: `找不到和「${keyword}」相關的 GIF 😢`,
      });
    }
  } catch (error) {
    console.error(error);
    await event.reply("發生錯誤");
    if (process.env.DEV === "true") {
      fs.writeFileSync(
        "../dump/giphy.json",
        JSON.stringify({ gifUrl, error: error.message }, null, 2)
      );
    }
  }
};
