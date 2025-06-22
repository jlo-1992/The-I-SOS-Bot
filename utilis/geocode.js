// geocode.js
import axios from "axios";

export async function geocodeAddress(address) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  const res = await axios.get(url);
  if (res.data.status !== "OK") throw new Error("找不到地址");

  const location = res.data.results[0].geometry.location;
  return { lat: location.lat, lng: location.lng };
}
