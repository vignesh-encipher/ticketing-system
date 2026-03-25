import { checkStatus, getRandomUserId } from "./helper";
import { getStorage } from "@/util/storage";
import { portalUrl } from "@/util/config";
import { removeSpecialChars } from "@/util/formatting";

export async function requestPortal(url, options) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const actualUrl = `${portalUrl}${url}`;
  const actualOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
  };
  return fetch(actualUrl, actualOptions).then(checkStatus);
}
