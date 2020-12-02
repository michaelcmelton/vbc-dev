import { useState } from "react";

const useForm = (initialValues, callback) => {
  const [values, setValues] = useState(initialValues);


  const handleSubmit = (event) => {
    event.preventDefault();
    callback(values);
  };

  const handleChange = (event) => {
      event.persist();
      setValues(values => ({...values, [event.target.name]: event.target.value }));
  };

  return {
      handleChange,
      handleSubmit,
      values,
  }
};

export default useForm;

