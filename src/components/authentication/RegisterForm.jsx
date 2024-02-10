import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { validateSchema } from "../../utils/Index";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
const RegisterForm = ({ redirectFrom }) => {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values, actions) => {
      dispatch(register(values));
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

    if (isSuccess || user) {
      toast.info(message.message, {
        onClose: () => {
          setSubmitting(false);
        },
      });
    }

    dispatch(reset());
  }, [isError, isSuccess, dispatch, message]);

  return (
    <Box style={{ fontFamily: "Khula" }} className="sm:mt-5 mt-5">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Box component="div" className="">
              <Typography variant="h5" sx={{ fontFamily: "Khula" }}>
                Fill In Your <br />{" "}
                <Typography
                  variant="span"
                  sx={{
                    fontSize: "45px",
                    fontWeight: "bolder",
                    color: "#0b093b",
                    marginTop: -15,

                    "@media (min-width: 0px) and (max-width: 575px)": {
                      fontSize: "36px",
                    },
                  }}>
                  Personal Details
                </Typography>
              </Typography>
              <Typography component="h4" sx={{ fontSize: "12px" }}>
                Get started with
                <Typography
                  component="span"
                  sx={{ fontWeight: "bold", fontSize: "12px" }}>
                  {" "}
                  HUST Info-Desk
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
                  <Grid item xs={12} sm={12} md={6}>
                    <div>
                      <TextField
                        label="First Name"
                        id="firstname"
                        size="small"
                        inputProps={{ style: { fontSize: 16 } }}
                        onChange={handleChange}
                        value={values.firstname}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.firstname && touched.firstname && (
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "red",
                          textAlign: "left",
                        }}>
                        {errors.firstname}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div>
                      <TextField
                        label="Last Name or Surname"
                        id="lastname"
                        size="small"
                        inputProps={{ style: { fontSize: 16 } }}
                        onChange={handleChange}
                        value={values.lastname}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.lastname && touched.lastname && (
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "red",
                          textAlign: "left",
                        }}>
                        {errors.lastname}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div>
                      <TextField
                        label="Username"
                        id="username"
                        size="small"
                        inputProps={{ style: { fontSize: 16 } }}
                        onChange={handleChange}
                        value={values.username}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.username && touched.username && (
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "red",
                          textAlign: "left",
                        }}>
                        {errors.username}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div>
                      <TextField
                        label="Email Address"
                        id="email"
                        size="small"
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

                  <Grid item xs={12} sm={12} md={6}>
                    <div>
                      <TextField
                        label="Password"
                        id="password"
                        type="password"
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
                  <Grid item xs={12} sm={12} md={6}>
                    <div>
                      <TextField
                        label="Retype Password"
                        id="confirmPassword"
                        type="password"
                        size="small"
                        inputProps={{ style: { fontSize: 16 } }}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "red",
                          textAlign: "left",
                        }}>
                        {errors.confirmPassword}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                {isSubmitting ? (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#1e40af",
                      textTransform: "none",
                      fontWeight: "bold",
                      marginTop: "3%",
                      width: "100%",
                    }}
                    className="bg-blue-700"
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
                    className="bg-blue-700"
                    size="medium"
                    type="submit">
                    Sign Up Now
                  </Button>
                )}
              </Box>
              <Typography
                component="paragraph"
                sx={{ fontSize: "12px", fontWeight: "bold" }}>
                Already have an account?
                <Link to="/login">
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "#3b82f6",
                    }}>
                    {" "}
                    Login
                  </Typography>
                </Link>
              </Typography>
              <br />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterForm;
