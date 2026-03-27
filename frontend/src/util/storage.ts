export const getStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting '${key}' from session storage`);
    console.error(error);
    return null;
  }
};

export const setStorage = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting '${key}' in session storage`);
    console.error(error);
  }
};

export const removeStorage = (key: string) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing '${key}' from session storage`);
    console.error(error);
  }
};
