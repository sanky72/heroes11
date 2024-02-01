import { HIDE_TOAST, SHOW_TOAST } from "../constants/toastConstants";

// toastActions.js

export const showToast = (message, type) => ({
  type: SHOW_TOAST,
  payload: { message, type },
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});
