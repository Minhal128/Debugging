import { notification } from "antd";

/**
 * Display a notification
 * @param {string} type - Type of notification ('success', 'info', 'warning', 'error')
 * @param {string} message - Notification title
 * @param {string} description - Notification description (optional)
 * @param {string} placement - Placement of the notification ('topLeft', 'topRight', 'bottomLeft', 'bottomRight')
 */
export const showNotification = (
  type,
  message,
  description = "",
  placement = "topRight"
) => {
  notification[type]({
    message,
    description,
    placement,
  });
};
