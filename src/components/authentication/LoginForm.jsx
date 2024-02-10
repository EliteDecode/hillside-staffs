import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema, validateSchema } from "../../utils/Index";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";

const LoginForm = ({ redirectFrom }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, actions) => {
      dispatch(login(values));
      console.log(values);
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        onClose: () => {
          setSubmitting(false);
        },
      });
    }

    if (user && message == "Loggedin successfully") {
      dispatch(reset());
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, dispatch, message]);

  const handleSignUpRoute = () => {
    navigate("/register");
  };
  return (
    <Box style={{ fontFamily: "Khula" }} className="sm:mt-2 mt-0">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Box component="div" className="">
              <Typography
                variant="h5"
                sx={{ lineHeight: "2.4rem", fontFamily: "Khula" }}>
                Log In With Your <br />{" "}
                <Typography
                  variant="span"
                  sx={{
                    fontSize: "45px",
                    fontWeight: "bolder",
                    color: "#0b093b",
                  }}>
                  Account Details
                </Typography>
              </Typography>

              <Box
                onSubmit={handleSubmit}
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "100%" },
                  padding: 0,
                  margin: "5% 0%",
                }}
                noValidate
                autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <div>
                      <TextField
                        label="Email Address"
                        id="email"
                        size="small"
                        autoComplete="false"
                        inputProps={{ style: { fontSize: 16 } }}
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "red",
                          textAlign: "left",
                        }}>
                        {errors.email}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <div>
                      <TextField
                        label="Password"
                        id="password"
                        type="password"
                        autoComplete={false}
                        size="small"
                        inputProps={{ style: { fontSize: 16 } }}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.password && touched.password && (
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "red",
                          textAlign: "left",
                        }}>
                        {errors.password}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                {isSubmitting ? (
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      bgcolor: "#5e0001",
                      textTransform: "none",
                      fontWeight: "bold",
                      marginTop: "3%",
                      width: "100%",
                    }}
                    className="bg-[#5e0001]"
                    size="medium"
                    type="submit">
                    Please wait...
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      bgcolor: "#5e0001",
                      textTransform: "none",
                      fontWeight: "bold",
                      marginTop: "3%",
                      width: "100%",
                    }}
                    className="bg-[#5e0001]"
                    size="medium"
                    type="submit">
                    Login
                  </Button>
                )}
              </Box>
              <Typography
                component="paragraph"
                sx={{ fontSize: "12px", fontWeight: "bold" }}>
                Don't have an account?
                <Typography
                  onClick={handleSignUpRoute}
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "#3b82f6",
                    cursor: "pointer",
                  }}>
                  {" "}
                  <Link to="/register" className="text-blue-600">
                    Sign Up
                  </Link>
                </Typography>
              </Typography>
              <br />
              <Typography
                component="paragraph"
                sx={{ fontSize: "12px", fontWeight: "bold" }}>
                Forgot Password?
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "#3b82f6",
                  }}>
                  {" "}
                  <Link to="/register" className="text-blue-600">
                    Recover Password
                  </Link>
                </Typography>
              </Typography>
              <br />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginForm;
