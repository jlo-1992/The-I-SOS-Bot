import foodCards from "../templates/foodCards.js";
import { searchNearbyRestaurants } from "../utilis/googlePlaceApi.js";
import utilisGeo from "../utilis/geo.js";

export default async (event, foodType) => {
  let lat,
    lng,
    locationName = "";

  if (event.message.type === "location") {
    lat = event.message.latitude;
    lng = event.message.longitude;
    locationName = event.message.address;
  } else if (event.message.type === "text") {
    locationName = event.message.text.trim();

    // 使用地名轉換成經緯度（需先完成 geocoding function）
    const coords = await utilisGeo(locationName); // ⬅️ 你需要實作這個 function
    if (!coords) {
      await event.reply({
        text: `抱歉，在附近找不到${foodType}的餐廳，😢\n請重新選擇其他食物種類～`,
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
      });
      return;
    }
    lat = coords.lat;
    lng = coords.lng;
  }

  try {
    const places = await searchNearbyRestaurants(lat, lng, foodType);
    console.log("Google Places 查詢結果:", places);
    console.log("API Key: ", process.env.GOOGLE_API_KEY);
    if (!places || places.length === 0) {
      await event.reply({
        text: `抱歉，在附近找不到${foodType}的餐廳，😢\n請重新選擇其他食物種類～`,
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
      });
      return;
    }

    const restaurantList = places.map((place) => ({
      name: place.name,
      address: place.vicinity,
      image: place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.GOOGLE_API_KEY}`
        : "https://via.placeholder.com/400x300?text=No+Image",
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.vicinity)}`,
    }));

    await event.reply(foodCards(restaurantList));
  } catch (err) {
    console.error(err);
    await event.reply("無法取得餐廳資訊，請稍後再試🍽️");
  }
};
