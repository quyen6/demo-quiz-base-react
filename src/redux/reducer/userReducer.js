import {
  FETCH_USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  UPDATE_INFORMATION,
} from "../action/userAction";
const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
    email: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token:
            action?.payload?.DT?.access_token || state.account.access_token,
          refresh_token:
            action?.payload?.DT?.refresh_token || state.account.refresh_tokens,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
          email: action?.payload?.DT?.email,
        },
        isAuthenticated: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        account: {
          access_token: "",
          refresh_token: "",
          username: "",
          image: "",
          role: "",
          email: "",
        },
        isAuthenticated: false,
      };

    case UPDATE_INFORMATION:
      return {
        ...state,
        account: {
          ...state.account, // giữ lại access_token, refresh_token,...
          ...action.payload, // ghi đè những trường mới như username, image,...
        },
      };
    default:
      return state;
  }
};

export default userReducer;
