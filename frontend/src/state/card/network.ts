import { requestPortal } from "@/util/network";

export async function getUsers() {
  const options = {
    method: "GET",
  };

  const data = await requestPortal(
    `/users`,
    options
  );

  return data;
}
