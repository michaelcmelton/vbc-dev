import React from "react";
import useForm from "../hooks/useForm";
import Input from "../common/Input";
import { withRouter } from "react-router-dom";

import { useUserDispatch, loginUser } from "../contexts/user";
import Button from "../common/Button";

const LoginForm = (props) => {
  const dispatch = useUserDispatch();

  const login = () => {
    loginUser(dispatch, values);
  };

  const cancelLogin = () => {
    props.history.goBack();
  };

  const { handleChange, handleSubmit, values } = useForm(
    { email: "", password: "" },
    login
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        required={true}
        value={values.email}
        changeHandler={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        required={true}
        value={values.password}
        changeHandler={handleChange}
      />
      <Button type="submit">Submit</Button>
      <Button type="button" clickHandler={cancelLogin}>
        Cancel
      </Button>
    </form>
  );
};

export default withRouter(LoginForm);
