import { useState } from "react";
import { useLocation } from "react-router-dom";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  formSubmitted: false,
  success: false
};

export const useFormControls = () => {
  const {pathname} = useLocation();
  const isLogin = pathname === '/login'

  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);
  
  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("name" in fieldValues && !isLogin)
      temp.name = fieldValues.name ? "" : "This field is required.";

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length !== 0 ? "" : "This field is required.";

    setErrors({
      ...temp
    });
  };

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    validate({ [name]: value });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      (isLogin ? true : fieldValues.name) &&
      fieldValues.email &&
      fieldValues.password &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  return {
    values,
    errors,
    handleInputValue,
    formIsValid
  };
};
