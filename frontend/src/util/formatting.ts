import { getNotification } from "@/components/notification/page";

// only accepting letter, number and empty space
export const removeSpecialChars = (value: string) => {
  if (value && value.length > 0) return value.replace(/[^A-Za-z0-9_ ]/g, "");
  return "";
};

export const numbersCommaSeparators = (value: number) => {
  if (value) {
    return value.toLocaleString("en-US");
  } else {
    return value;
  }
};

export const exactData = (val: string | number | Date) => {
  const date = new Date(val);
  return date.toLocaleString();
};

export const getResponsePopup = (res: any, duration = 1) => {
  const notification = getNotification();
  if (!notification) return;

  const status = res?.data?.status ?? res?.status;
  const description = res?.data?.message ?? res?.message ?? "Unexpected error";
  const title = typeof status === "string" ? status : "Notification";

  switch (status) {
    case "USER_DEFINED_ERROR":
      return notification.warning({
        message: title.replaceAll("_", " "),
        description,
        duration,
      });
    case "SUCCESS":
      return notification.success({ message: title, description, duration });
    case "FAILED":
    case "EXCEPTION":
    case "CUSTOM_EXCEPTION":
      return notification.error({ message: title, description, duration });
    default:
      return notification.warning({ message: title, description, duration });
  }
};

export const getRoles = [
  { value: "LEAD", label: "Lead" },
  { value: "ADMIN", label: "Admin" },
  { value: "EDITOR", label: "Editor" },
];
