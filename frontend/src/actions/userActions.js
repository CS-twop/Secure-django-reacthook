export const LOGIN_SUCCESS = "@user/login-success";
export const LOGOUT = "@user/logout";

export function loginSuccess(user) {
    return (dispatch) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    };
  }

  export function logout(user) {
    return (dispatch) => {
      dispatch({
        type: LOGOUT,
        payload: user,
      });
    };
  }