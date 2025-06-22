export default async (event) => {
  try {
    console.log("準備發送 QuickReply");

    const message = {
      type: "text",
      text: "😵‍💫 社交已經夠累了，還要想吃什麼？我幫你減少一點選擇壓力。請選擇你今天有興趣的食物種類 🍽",
      quickReply: {
        items: [
          {
            type: "action",
            action: {
              type: "postback",
              label: "隨機",
              data: "foodtype=餐廳",
              displayText: "看見什麼吃什麼~",
            },
          },
          {
            type: "action",
            action: {
              type: "postback",
              label: "素食",
              data: "foodtype=素食",
              displayText: "vegans, shup the x up",
            },
          },
          {
            type: "action",
            action: {
              type: "postback",
              label: "台式",
              data: "foodtype=台式料理",
              displayText: "台灣人還得吃台式啊",
            },
          },
          {
            type: "action",
            action: {
              type: "postback",
              label: "義式",
              data: "foodtype=義式料理",
              displayText: "維大力？義大利！",
            },
          },
          {
            type: "action",
            action: {
              type: "postback",
              label: "韓式",
              data: "foodtype=韓式料理",
              displayText: "韓劇主角們吃的全都給我來一點",
            },
          },
          {
            type: "action",
            action: {
              type: "postback",
              label: "火鍋",
              data: "foodtype=火鍋",
              displayText: "冬天不吃鍋要幹嘛",
            },
          },
          {
            type: "action",
            action: {
              type: "postback",
              label: "美式",
              data: "foodtype=美式餐廳",
              displayText: "減肥是明天的事，來點美式吧",
            },
          },
          {
            type: "action",
            action: {
              type: "postback",
              label: "日式",
              data: "foodtype=日式料理",
              displayText: "去不了日本，吃點日式總可以了吧",
            },
          },
        ],
      },
    };
    // 使用 Promise 方式處理回應
    return new Promise((resolve, reject) => {
      event
        .reply(message)
        .then((result) => {
          console.log("QuickReply 發送成功，回應:", result);
          resolve(result);
        })
        .catch((error) => {
          console.error("QuickReply 發送失敗:", error);
          reject(error);
        });
    });
  } catch (error) {
    console.error("QuickReply 錯誤:", error);
    throw error;
  }
};
