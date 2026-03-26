"use client";

import { App } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { MessageInstance } from "antd/es/message/interface";

let globalNotification: NotificationInstance;
let globalMessage: MessageInstance;

export const getNotification = () => globalNotification;
export const getMessage = () => globalMessage;

const AntdNotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { notification, message } = App.useApp();
  globalNotification = notification;
  globalMessage = message;
  return <>{children}</>;
};

export default AntdNotificationProvider;
