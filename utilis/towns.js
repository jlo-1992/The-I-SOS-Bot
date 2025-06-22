import { readFileSync } from "fs";
// 讀取 JSON 檔
const townsRaw = JSON.parse(readFileSync("./data/towns.json", "utf8"));
// JSON檔來源：https://github.com/xue-yuan/tw-area-json/blob/main/position.json

// 將 "臺北市中正區" 拆成 city + town，並保留經緯度
export const towns = townsRaw
  .map((entry) => {
    const fullName = entry.name;
    const match = fullName.match(/^(\S+[市縣])(\S+[區鄉鎮市])$/);

    if (!match) {
      console.warn(`格式無法解析: ${fullName}`);
      return null;
    }

    return {
      city: match[1], // e.g. "臺北市"
      town: match[2], // e.g. "中正區"
      lat: entry.location.lat,
      lon: entry.location.lng,
    };
  })
  .filter(Boolean); // 移除 null

//   {
//   "name": "宜蘭縣釣魚臺",
//   "location": {
//     "lat": 24.7294746,
//     "lng": 121.7644558
//   }
// },
//   {
//   "name": "高雄市東沙群島",
//   "location": {
//     "lat": 23.9036873,
//     "lng": 121.0793705
//   }
// },
// {
//   "name": "高雄市南沙群島",
//   "location": {
//     "lat": 10.723282,
//     "lng": 115.8264655
//   }
// },
