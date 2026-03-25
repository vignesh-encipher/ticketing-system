import { removeSpecialChars } from "../formatting";
import { message } from "antd";
import { setStorage, getStorage, removeStorage } from "@/util/storage";
import { tokenKey, udidKey } from "@/util/config";

const defaultHeaders = {
  "Content-Type": "application/json",
  "User-Agent": removeSpecialChars(navigator.userAgent),
};

export const setHeaders = async () => {
  return { ...defaultHeaders };
};

export async function checkStatus(response) {
  const data = await response.json();
  if (data.logout) {
    message.error(data.error_message);
    // await removeStorage(tokenKey);
    window.open("/", "_self");
    return;
  }
  if (response.status !== 200) {
    const error = {
      ...data,
    };
    throw error;
  }
  return data;
}