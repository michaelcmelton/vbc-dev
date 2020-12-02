import React, {useEffect} from "react";
import Input from "../common/Input";

import { useUserDispatch } from "../contexts/user";
import { loadUser } from "../contexts/user/userActions";

const Home = () => {
  const dispatch = useUserDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      fetch("/api/user/token", options)
        .then((data) => data.json())
        .then((response) => {
          if (!response.message) {
            let payload = {
              token: localStorage.getItem("token"),
              user: response,
            };
            loadUser(dispatch, payload);
          } else {
            dispatch({ type: "LOGIN_ERROR", error: response.message });
          }
        });
    }
  });
  return <div>
      <h1>Home</h1>
      <Input type="email" required={true} name="email" label="Email" placeholder="email123@gmail.com" value=""/>
  </div>;
};

export default Home;
