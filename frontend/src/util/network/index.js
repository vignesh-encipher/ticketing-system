import { checkStatus, getRandomUserId } from "./helper";
import { getStorage } from "@/util/storage";
import { portalUrl } from "@/util/config";
import { removeSpecialChars } from "@/util/formatting";

export async function requestPortal(url, options) {
  // const token = await getStorage(tokenKey);
  const actualUrl = `${portalUrl}${url}`;
  const actualOptions = {
    ...options,
    headers: {
      // Authorization: token,
      "Content-Type": "application/json",
    },
  };
  return fetch(actualUrl, actualOptions).then(checkStatus);
}
