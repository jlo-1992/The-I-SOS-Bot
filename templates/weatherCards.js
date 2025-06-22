export default function weatherCards(weatherData) {
  const location = weatherData.locationName;
  const elements = weatherData.weatherElement;

  // 找出需要的天氣資料（例如：今天天氣狀況、溫度等）
  const wx = elements.find((el) => el.elementName === "Wx").time[0]
    .elementValue[0].value;
  const minT = elements.find((el) => el.elementName === "MinT").time[0]
    .elementValue[0].value;
  const maxT = elements.find((el) => el.elementName === "MaxT").time[0]
    .elementValue[0].value;
  const pop = elements.find((el) => el.elementName === "PoP12h").time[0]
    .elementValue[0].value;
  const ci = elements.find((el) => el.elementName === "CI").time[0]
    .elementValue[0].value;

  return {
    type: "flex",
    altText: `${location}今天天氣概況`,
    contents: {
      type: "bubble",
      size: "mega",
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: `${location}今天天氣`,
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: `🌤 狀況：${wx}`,
            wrap: true,
          },
          {
            type: "text",
            text: `🌡 溫度：${minT}°C ~ ${maxT}°C`,
          },
          {
            type: "text",
            text: `☔ 降雨機率：${pop}%`,
          },
          {
            type: "text",
            text: `😌 體感：${ci}`,
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "link",
            height: "sm",
            action: {
              type: "uri",
              label: "了解更詳細的氣候訊息",
              uri: `https://www.cwb.gov.tw/V8/C/W/Town/Town.html?TID=${weatherData.geocode}`,
              // 若無 geocode，fallback to 縣市查詢：
              // uri: `https://www.cwb.gov.tw/V8/C/W/County/index.html`
            },
          },
        ],
        flex: 0,
      },
    },
  };
}
