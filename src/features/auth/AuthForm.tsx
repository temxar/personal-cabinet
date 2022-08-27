import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";
import { Button, TextField, Typography } from "@material-ui/core";

import { AppDispatch } from "../../redux/store";
import { clearState, signupUser, loginUser, user } from "../../redux/userSlice";
import { useFormControls } from "./AuthFormControls";
import Loading from "../../components/Loading";

import useStyles from "./AuthFormStyling";

const inputFieldValues = [
  {
    name: "name",
    label: "Name",
    id: "name",
  },
  {
    name: "email",
    label: "Email",
    id: "email",
  },
  {
    name: "password",
    label: "Password",
    id: "password",
  },
];

export const AuthForm = () => {
  const classes = useStyles();
  const { values, handleInputValue, formIsValid, errors } = useFormControls();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(user);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const isValid =
      Object.values(errors).every((x) => x === "") && formIsValid();

    if (isValid) {
      isLogin ? dispatch(loginUser(values)) : dispatch(signupUser(values));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate("/");
    }
  }, [isError, isSuccess]);

  return (
    <div className={classes.root}>
      <Typography style={{ textAlign: "center" }} variant="h4">
        {isLogin ? "Login" : "Signup"}
      </Typography>
      <form
        className={classes.content}
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        {inputFieldValues.map((inputFieldValue, index) => {
          return isLogin && inputFieldValue.name === "name" ? (
            ""
          ) : (
            <TextField
              key={index}
              onChange={handleInputValue}
              onBlur={handleInputValue}
              name={inputFieldValue.name}
              label={inputFieldValue.label}
              fullWidth
              autoComplete="none"
              {...(errors[inputFieldValue.name] && {
                error: true,
                helperText: errors[inputFieldValue.name],
              })}
            />
          );
        })}
        <div className={classes.buttonContainer}>
          {isFetching ? <Loading /> : null}
          <Button
            className={classes.button}
            variant="contained"
            type="submit"
            color="secondary"
            disabled={!formIsValid()}
          >
            Send Message
          </Button>
        </div>
      </form>

      <Typography style={{ textAlign: "center" }} variant="h6">
        Or{" "}
        <Link to={isLogin ? "/signup" : "/login"}>
          {" "}
          {isLogin ? "Signup" : "Sign in"}
        </Link>
      </Typography>
    </div>
  );
};
