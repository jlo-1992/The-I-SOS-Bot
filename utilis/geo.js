import axios from "axios";

export default async function getLatLngFromAddress(address) {
  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );

    if (
      res.data.status === "OK" &&
      res.data.results &&
      res.data.results.length > 0
    ) {
      const location = res.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      console.warn("找不到地址:", address, res.data.status);
      return null;
    }
  } catch (error) {
    console.error("地名轉換失敗", error);
    return null;
  }
}
