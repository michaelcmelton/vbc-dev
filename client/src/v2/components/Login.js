import React from "react";

import { loginUser, useUserDispatch, useUserState } from "../contexts/user";
import useForm from "../hooks/useForm";

const Login = () => {
  const { isAuthenticated } = useUserState();  
  const dispatch = useUserDispatch();

  const login = async (values) => {
    try {
      let response = await loginUser(dispatch, values);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    login
  );
  return isAuthenticated ? <h4>Signed IN!</h4> : (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={values.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          value={values.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
