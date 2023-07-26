import { apiInstance } from "..";

export default async function warn() {
  const data = await apiInstance.get("/info/warn");
  return data.data;
}
