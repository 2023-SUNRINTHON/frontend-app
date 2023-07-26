import { apiInstance } from "..";

export default async function detail() {
  const data = await apiInstance.get(`/info/detail`);
  return data.data;
}
