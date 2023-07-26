import { apiInstance } from "..";

export default async function weather(lat: number, lon: number) {
  const data = await apiInstance.get(
    "/info/weather?lat=" + lat + "&lng=" + lon
  );
  return data.data;
}
