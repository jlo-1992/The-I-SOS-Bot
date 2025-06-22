import { geocodeAddress } from "../utilis/geocode.js";
import { findNearestTown } from "../utilis/findNearestTown.js";
import axios from "axios";
import weatherCards from "../templates/weatherCards.js";

const API_KEY = process.env.OPEN_WEATHER_KEY;
const BASE_URL =
  "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091";

export default async function weather(event) {
  try {
    let lat, lng;

    if (event.message.type === "location") {
      lat = event.message.latitude;
      lng = event.message.longitude;
    } else if (event.message.type === "text") {
      const location = await geocodeAddress(event.message.text);
      lat = location.lat;
      lng = location.lng;
    }

    const town = findNearestTown(lat, lng);
    if (!town) {
      await event.reply("找不到對應的天氣地點，請試試其他名稱");
      return;
    }

    const locationName = `${town.city}${town.town}`;
    const url = `${BASE_URL}?Authorization=${API_KEY}&locationName=${encodeURIComponent(locationName)}`;
    const { data } = await axios.get(url);

    const locationData = data?.records?.locations?.[0]?.location?.[0];
    if (!locationData) {
      await event.reply(`查無 ${locationName} 的天氣資料。`);
      return;
    }

    const flex = weatherCards(locationData);
    await event.reply(flex);
  } catch (err) {
    console.error("weather.js 錯誤：", err.message);
    await event.reply("取得天氣資料時發生錯誤，請稍後再試。");
  }
}
