// findNearestTown.js
import { towns } from "./towns.js";

export function findNearestTown(lat, lng) {
  let minDist = Infinity;
  let nearest = null;

  console.log("towns sample:", towns[0]);
  towns.forEach((town) => {
    const d = Math.pow(town.lat - lat, 2) + Math.pow(town.lon - lng, 2); // 簡化版距離比較
    if (d < minDist) {
      minDist = d;
      nearest = town;
    }
  });

  return nearest; // { city: "新北市", town: "三重區", lat: ..., lon: ... }
}
