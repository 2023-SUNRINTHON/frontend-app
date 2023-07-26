import { apiInstance } from "..";

export default async function accident() {
  const data = await apiInstance.get("/info/accident");
  return data.data;
}
