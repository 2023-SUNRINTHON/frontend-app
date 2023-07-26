import { apiInstance } from "..";

export default async function geocode(x: number, y: number) {
  const data = await apiInstance.get(`/info/geocode?lat=${x}&lng=${y}`);
  return data.data;
}
