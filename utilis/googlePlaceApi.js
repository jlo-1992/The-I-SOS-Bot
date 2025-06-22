import axios from "axios";

export const searchNearbyRestaurants = async (lat, lng, keyword) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const radius = 1500; // 公尺範圍內
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&keyword=${encodeURIComponent(keyword)}&key=${apiKey}`;

  try {
    const res = await axios.get(url);
    console.log("Google Places API 回傳:", res.data);
    return res.data.results.slice(0, 5);
  } catch (error) {
    console.error("Google Places API 錯誤:", error);
    throw error;
  }
};
