// Toast.js

import { message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../actions/toastAction";

const Toast = () => {
  const {
    showToast,
    message: messageText,
    type = "success",
  } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showToast) {
      // Display Ant Design message
      message[type]({
        className: "toast-container",
        content: messageText,
        duration: 2, // Display for 2 seconds
        onClose: () => {
          // Dispatch hideToast after message is closed
          dispatch(hideToast());
        },
      });
    }
  }, [dispatch, showToast, messageText]);

  return null; // Toast component doesn't render any UI, it uses Ant Design message
};

export default Toast;
