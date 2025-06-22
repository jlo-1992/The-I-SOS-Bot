import Parser from "rss-parser";
import newsCards from "../templates/newsCards.js";

const parser = new Parser();

export default async (event) => {
  try {
    const feed = await parser.parseURL("https://news.ltn.com.tw/rss/all.xml");

    const articles = feed.items.slice(0, 5).map((item) => ({
      title: item.title,
      link: item.link,
      description: item.contentSnippet || "點擊下方按鈕查看全文",
    }));

    const flexMessage = newsCards(articles);

    await event.reply(flexMessage);
  } catch (error) {
    console.error("RSS 抓取錯誤：", error.message);
    await event.reply("抱歉，目前無法取得新聞內容 😢");
  }
};
