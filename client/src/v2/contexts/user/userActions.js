export const loginUser = async (dispatch, payload) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch("/api/user/login", requestOptions);
    let data = await response.json();
    if(data.user) {
      dispatch({type: "LOGIN_SUCCESS", payload: data});
      localStorage.setItem('token', data.token);
      return data;
    } else {
      dispatch({ type: "LOGIN_ERROR", error: data.message });
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error });
  }
};

export const loadUser = (dispatch, payload) => {
  dispatch({type: "LOGIN_SUCCESS", payload});
}

export const logout = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem('token');
};
