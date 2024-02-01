// toastReducer.js

const initialState = {
  showToast: false,
  message: "",
};

export const toastReducer = (state = initialState, action) => {
  const { message, type } = action.payload || {};
  console.log(action);
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        ...state,
        showToast: true,
        message,
        type,
      };
    case "HIDE_TOAST":
      return {
        ...state,
        showToast: false,
        message: "",
      };
    default:
      return state;
  }
};
