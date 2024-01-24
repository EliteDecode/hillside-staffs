import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { reset, update } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const validationSchema = Yup.object().shape({
  phonenumber: Yup.string().required("Phone Number is required"),
  other: Yup.string().required("Other is required"),
  rolename: Yup.string().required("Role Name is required"),
  sex: Yup.string().required("Sex is required"),
  profilePicture: Yup.mixed().required("Profile Picture is required"),
});

const IDForm = () => {
  const [confirm, setConfirm] = useState(false);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    phonenumber: "",
    other: "",
    rolename: "",
    sex: "",
    profilePicture: null,
  };

  const submitIDCard = async (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("profilePicture", values.profilePicture);

    const updates = [
      { columnName: "phone", newValue: values.phonenumber },
      { columnName: "programs", newValue: values.other },
      { columnName: "sex", newValue: values.sex },
      { columnName: "rolename", newValue: values.rolename },
      { columnName: "IdCardStatus", newValue: 1 },
    ].filter((update) => update.newValue !== "");

    formData.append("updates", JSON.stringify(updates));

    const oesFormData = new FormData();
    const userData = user?.data;

    oesFormData.append("firstname", userData?.firstname);
    oesFormData.append("lastname", userData?.lastname);
    oesFormData.append("username", userData?.username);
    oesFormData.append("email", userData?.email);
    oesFormData.append("schoolacro", "HUST");
    oesFormData.append("description", "HUST schools");
    oesFormData.append("phoneNumber", values.phonenumber);
    oesFormData.append("sex", values.sex);
    oesFormData.append("rolename", values.rolename);
    oesFormData.append("other", values.other);
    oesFormData.append("schoolClass", "Level 1");
    oesFormData.append("password", userData?.unHashedPassword);
    oesFormData.append("passwordAgain", userData?.unHashedPassword);
    oesFormData.append("channel", "OES-HUST2024");
    oesFormData.append("schoolname", "HUST");

    try {
      const response = await axios.post(
        "https://online.hust.edu.ng/OESWebApp/addstafftolms.do",
        oesFormData
      );

      if (response) {
        dispatch(update(formData));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      submitIDCard(values);
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setLoading(false);
    }

    if (user && isSuccess) {
      toast.success("Congratulations your info has been updated", {
        onClose: () => {
          dispatch(reset());
          setLoading(false);
          navigate("/dashboard");
        },
      });
    }

    dispatch(reset());
  }, [isError, isSuccess, dispatch, message]);

  const IdCardDetails = [
    {
      title: "Firstname",
      value: user?.data?.firstname,
    },
    {
      title: "Lastname",
      value: user?.data?.lastname,
    },
    {
      title: "Username",
      value: user?.data?.username,
    },
    {
      title: "Email",
      value: user?.data?.email,
    },
    {
      title: "Sex",
      value: formik?.values?.sex,
    },
    {
      title: "Phone Number",
      value: formik?.values?.phonenumber,
    },
    {
      title: "Role",
      value: formik?.values?.rolename,
    },
    {
      title: "Program or Discipline",
      value: formik?.values?.other,
    },
  ];

  return (
    <>
      <Box className="mt-3 sm:mb-48 mb-48">
        <Card>
          <Card.Header> Staff Access ID Card Applications</Card.Header>
          <Card.Body>
            <Card.Title className="font-bold text-[#5e0001]">
              Fill out the form to request your staff access ID card.
            </Card.Title>
            {!confirm ? (
              <Card.Text className="text-[12px]">
                <form onSubmit={formik.handleSubmit} className=" mx-auto mt-8">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel htmlFor="rolename">Role Name</InputLabel>
                        <Select
                          label="Role Name"
                          name="rolename"
                          id="rolename"
                          value={formik.values.rolename}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}>
                          <MenuItem value="HR">HR</MenuItem>
                          <MenuItem value="Lecturer">Lecturer</MenuItem>
                        </Select>
                      </FormControl>
                      {formik.errors.rolename && formik.touched.rolename && (
                        <Typography
                          sx={{
                            fontSize: "11px",
                            color: "red",
                            textAlign: "left",
                          }}>
                          {formik.errors.rolename}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel htmlFor="sex">Sex</InputLabel>
                        <Select
                          label="Sex"
                          name="sex"
                          id="sex"
                          value={formik.values.sex}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                      {formik.errors.sex && formik.touched.sex && (
                        <Typography
                          sx={{
                            fontSize: "11px",
                            color: "red",
                            textAlign: "left",
                          }}>
                          {formik.errors.sex}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone Number"
                        name="phonenumber"
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={formik.values.phonenumber}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.phonenumber &&
                        formik.touched.phonenumber && (
                          <Typography
                            sx={{
                              fontSize: "11px",
                              color: "red",
                              textAlign: "left",
                            }}>
                            {formik.errors.phonenumber}
                          </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Programs"
                        name="other"
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={formik.values.other}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.other && formik.touched.other && (
                        <Typography
                          sx={{
                            fontSize: "11px",
                            color: "red",
                            textAlign: "left",
                          }}>
                          {formik.errors.other}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="profilePicture"
                        name="profilePicture"
                        type="file"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "profilePicture",
                            event.currentTarget.files[0]
                          );
                          // Display the chosen picture beneath the form
                          setProfile(
                            URL.createObjectURL(event.currentTarget.files[0])
                          );
                        }}
                      />
                      <label htmlFor="profilePicture">
                        <Button
                          variant="outlined"
                          color="primary"
                          component="span"
                          className="mt-2">
                          Upload Profile Picture
                        </Button>
                      </label>
                      {formik.errors.profilePicture &&
                        formik.touched.profilePicture && (
                          <Typography
                            sx={{
                              fontSize: "11px",
                              color: "red",
                              textAlign: "left",
                            }}>
                            {formik.errors.profilePicture}
                          </Typography>
                        )}
                    </Grid>

                    {/* Display the chosen picture */}

                    <Grid item xs={12}>
                      <img
                        id="imgPreview"
                        src={profile}
                        alt="Profile Preview"
                        hidden={formik.values.profilePicture ? false : true}
                        style={{ marginTop: "10px", maxHeight: "200px" }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      {formik.values.other &&
                        formik.values.phonenumber &&
                        formik.values.profilePicture &&
                        formik.values.rolename &&
                        formik.values.sex && (
                          <Button
                            onClick={() => setConfirm(!confirm)}
                            variant="contained"
                            color="primary"
                            className="mt-4"
                            size="small"
                            disableElevation
                            sx={{ fontSize: "12px" }}>
                            Next
                          </Button>
                        )}
                    </Grid>
                  </Grid>
                </form>
              </Card.Text>
            ) : (
              <Card.Text className="text-[12px]">
                <Typography sx={{ opacity: 0.7 }}>
                  {" "}
                  Please Confirm your Staff ID Card Information
                </Typography>
                <Grid container spacing={2} className="mt-2">
                  {IdCardDetails.map((item) => {
                    return (
                      <Grid item xs={12} md={6}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            background: "#f2f2f2",
                            padding: "8px 12px",
                            borderRadius: "5px",
                            margin: "0px 0px",
                            "@media (min-width: 0px) and (max-width: 575px)": {
                              fontSize: "15px",
                              padding: "13px 12px",
                            },
                          }}>
                          {item.title}: {item.value}
                        </Typography>
                      </Grid>
                    );
                  })}

                  <Grid item xs={12}>
                    <img
                      id="imgPreview"
                      src={profile}
                      alt="Profile Preview"
                      hidden={formik.values.profilePicture ? false : true}
                      style={{ marginTop: "10px", maxHeight: "200px" }}
                    />
                  </Grid>

                  <Grid item xs={12} className="space-x-4">
                    {loading ? (
                      <>
                        <Button
                          disabled
                          variant="contained"
                          color="warning"
                          className="mt-4"
                          size="small"
                          disableElevation
                          sx={{ fontSize: "12px" }}>
                          Prev
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled
                          color="primary"
                          className="mt-4"
                          size="small"
                          disableElevation
                          sx={{ fontSize: "12px" }}>
                          Please wait...
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => setConfirm(!confirm)}
                          variant="contained"
                          color="warning"
                          className="mt-4"
                          size="small"
                          disableElevation
                          sx={{ fontSize: "12px" }}>
                          Prev
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={formik.handleSubmit}
                          color="primary"
                          className="mt-4"
                          size="small"
                          disableElevation
                          sx={{ fontSize: "12px" }}>
                          Submit
                        </Button>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      </Box>
    </>
  );
};

export default IDForm;
