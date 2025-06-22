export default async (event) => {
  console.log("準備發送 QuickReply");
  await event.reply({
    type: "text",
    text: "🙊 話太多會累，丟一張 gif 就夠撐場。",
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "postback",
            label: "關鍵字搜尋",
            data: "type=gif,mode=keyword",
            displayText: "我想用關鍵字搜尋",
          },
        },
        {
          type: "action",
          action: {
            type: "postback",
            label: "現在最熱門",
            data: "type=gif,mode=trending",
            displayText: "現在最熱門的 gif 是什麼？",
          },
        },
        // {
        //   type: "action",
        //   action: {
        //     type: "postback",
        //     data: "type=image," + event.message.text,
        //     label: "給我圖片",
        //     displayText: "我要圖片",
        //   },
        // },
      ],
    },
  });
};
