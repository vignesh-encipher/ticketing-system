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
  { value: "Lead", label: "Lead" },
  { value: "Admin", label: "Admin" },
  { value: "Member", label: "Member" },
];

export const getPriorities = [
  { value: "Critical", label: "Critical" },
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

export const getStatuses = [
  { value: "Open", label: "Open" },
  { value: "In Progress", label: "In Progress" },
  { value: "On Hold", label: "On Hold" },
  { value: "Resolved", label: "Resolved" },
  { value: "Closed", label: "Closed" },
];

export const formatFileSize = (bytes: number, decimals: number = 2) => {
  if (!bytes || bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};