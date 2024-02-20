import React, { useEffect, useRef, useState } from "react";
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
import imglyRemoveBackground from "@imgly/background-removal";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { removeBg, reset, update } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import domtoimage from "dom-to-image";
import SignaturePad from "react-signature-canvas";
const validationSchema = Yup.object().shape({
  phonenumber: Yup.string().required("Phone Number is required"),
  rolename: Yup.string().required("Role Name is required"),
  bloodGroup: Yup.string().required("Blood group is required"),
  sex: Yup.string().required("Sex is required"),
  year: Yup.string().required("Year is required"),
  position: Yup.string().required("Current position is required"),
  profilePicture: Yup.mixed().required("Profile Picture is required"),
});

const IDForm = () => {
  const [confirm, setConfirm] = useState(false);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const sigPad = useRef();

  const clear = () => {
    sigPad.current.clear();
  };

  const trim = () => {
    const trimmedData = sigPad.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setTrimmedDataURL(trimmedData);
    sendToAPI(trimmedData); // Sending trimmedDataURL to API
  };

  const qrCode = `https://online.hust.edu.ng/OESWebApp/images/code/${user?.data?.qrcode}`;
  const img = `https://backend.hust.edu.ng/hust/api/v1/uploads/staffProfile/${user?.data?.profilePicture}`;

  console.log(img);

  const [loader, setLoader] = useState(false);

  const pdfRef = useRef();

  const downloadPDF = () => {
    const node = pdfRef.current;

    var options = {
      quality: 0.99,
      width: 700,
      height: 700,
    };

    domtoimage.toPng(node, options).then(function (imgData) {
      const pdf = new JsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Create a temporary image element to get its dimensions
      const tempImg = new Image();
      tempImg.src = imgData;
      tempImg.onload = function () {
        const imgWidth = tempImg.width;
        const imgHeight = tempImg.height;

        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const newImgWidth = imgWidth * ratio;
        const newImgHeight = imgHeight * ratio;
        const imgX = (pdfWidth - newImgWidth) / 2;
        const imgY = (pdfHeight - newImgHeight) / 2;

        pdf.addImage(imgData, "JPEG", imgX, imgY, newImgWidth, newImgHeight);
        pdf.save("id.pdf");
      };
    });
  };

  const handlePreview = async () => {
    setConfirm(!confirm);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    phonenumber: "",
    other: "",
    rolename: "",
    sex: "",
    year: "",
    position: "",
    bloodGroup: "",
    profilePicture: null,
  };

  const submitIDCard = async (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("profilePicture", values.profilePicture);

    const updates = [
      { columnName: "phone", newValue: values.phonenumber },
      { columnName: "programs", newValue: "BSC" },
      { columnName: "bloodGroup", newValue: values.bloodGroup },
      { columnName: "currentPosition", newValue: values.position },
      { columnName: "sex", newValue: values.sex },
      { columnName: "year", newValue: values.year },
      { columnName: "rolename", newValue: values.rolename },
      { columnName: "IdCardStatus", newValue: 1 },
      { columnName: "staffId", newValue: "Not Set" },
      { columnName: "signature", newValue: JSON.stringify(trimmedDataURL) },
    ].filter((update) => update.newValue !== "");

    formData.append("updates", JSON.stringify(updates));

    try {
      dispatch(update(formData));
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

  const sendToAPI = (trimmedDataURL) => {
    // Replace this with your API call to send the trimmedDataURL to the server
    console.log("Sending to API:", trimmedDataURL);
  };

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
      title: "Blood Group",
      value: formik.values.bloodGroup,
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
      title: "Current Position",
      value: formik.values.position,
    },
  ];

  console.log(formik.values);

  return (
    <>
      <Box className="mt-3 sm:mb-48 mb-48">
        {user?.data?.Approved == 0 ? (
          <Card>
            <Card.Header> Staff Access ID Card Applications</Card.Header>
            <Card.Body>
              <Card.Title className="font-bold text-[#5e0001]">
                Fill out the form to request your staff access ID card.
              </Card.Title>
              {!confirm ? (
                <Card.Text className="text-[12px]">
                  <form
                    onSubmit={formik.handleSubmit}
                    className=" mx-auto mt-8">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="medium" variant="outlined">
                          <InputLabel htmlFor="rolename">Role</InputLabel>
                          <Select
                            label="Role"
                            name="rolename"
                            id="rolename"
                            value={formik.values.rolename}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}>
                            <MenuItem value="University-Administrator">
                              Presidency
                            </MenuItem>
                            <MenuItem value="Administrator">Registry</MenuItem>
                            <MenuItem value="University-Librarian">
                              Library & Research
                            </MenuItem>
                            <MenuItem value="HR">Human Resource(HR)</MenuItem>
                            <MenuItem value="University-Finance">
                              Bursary
                            </MenuItem>
                            <MenuItem value="University-Medicals">
                              Medical Services
                            </MenuItem>
                            <MenuItem value="University-Student-Development">
                              Student Development
                            </MenuItem>
                            <MenuItem value="University-Security">
                              Security
                            </MenuItem>
                            <MenuItem value="Non-Academic">
                              Others (Non-Academic)
                            </MenuItem>
                            <MenuItem value="Lecturer">Academic Staff</MenuItem>
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
                        <TextField
                          label="Current Position"
                          name="position"
                          fullWidth
                          size="medium"
                          placeholder="e.g. Lecturer 1"
                          variant="outlined"
                          value={formik.values.position}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.position && formik.touched.position && (
                          <Typography
                            sx={{
                              fontSize: "11px",
                              color: "red",
                              textAlign: "left",
                            }}>
                            {formik.errors.position}
                          </Typography>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="medium" variant="outlined">
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
                        <FormControl fullWidth size="medium" variant="outlined">
                          <InputLabel htmlFor="bloodGroup">
                            Blood Group
                          </InputLabel>
                          <Select
                            label="Blood Group"
                            name="bloodGroup"
                            id="bloodGroup"
                            value={formik.values.bloodGroup}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}>
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                          </Select>
                        </FormControl>
                        {formik.errors.bloodGroup &&
                          formik.touched.bloodGroup && (
                            <Typography
                              sx={{
                                fontSize: "11px",
                                color: "red",
                                textAlign: "left",
                              }}>
                              {formik.errors.bloodGroup}
                            </Typography>
                          )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Phone Number"
                          name="phonenumber"
                          fullWidth
                          size="medium"
                          focused
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
                          label="Year of Resumption"
                          name="year"
                          fullWidth
                          size="medium"
                          focused
                          type="date"
                          variant="outlined"
                          value={formik.values.year}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.year && formik.touched.year && (
                          <Typography
                            sx={{
                              fontSize: "11px",
                              color: "red",
                              textAlign: "left",
                            }}>
                            {formik.errors.year}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <div className="w-full">
                          <Typography>
                            <span className="text-red-500">(*)</span> Please
                            draw your signature on the provided gray space below
                          </Typography>
                          {!trimmedDataURL ? (
                            <div className="w-[100%] h-[40vh] m-auto bg-gray-100">
                              <SignaturePad
                                canvasProps={{
                                  style: {
                                    width: "100%",
                                    height: " 100%",
                                  },
                                }}
                                ref={sigPad}
                              />
                            </div>
                          ) : (
                            <img
                              className="w-[20%]"
                              src={trimmedDataURL}
                              alt="Trimmed Signature"
                            />
                          )}
                          <div className=" space-x-2">
                            {trimmedDataURL ? (
                              <Button
                                variant="contained"
                                color="info"
                                onClick={() => setTrimmedDataURL(null)}
                                component="span"
                                className="mt-2 w-[25%]">
                                Edit
                              </Button>
                            ) : (
                              <>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={clear}
                                  component="span"
                                  className="mt-2 w-[25%]">
                                  Clear
                                </Button>
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={trim}
                                  component="span"
                                  className="mt-2 w-[25%]">
                                  Save
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
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
                            className="mt-2 w-full">
                            Upload Profile Picture
                          </Button>
                        </label>
                        {profile && (
                          <img
                            src={profile}
                            alt=""
                            className="h-[120px] w-[110px] mt-1"
                          />
                        )}

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

                      {formik.values.phonenumber &&
                        formik.values.profilePicture &&
                        trimmedDataURL &&
                        formik.values.rolename &&
                        formik.values.sex &&
                        formik.values.year && (
                          <>
                            <Grid item xs={12} md={12}>
                              <Button
                                onClick={handlePreview}
                                variant="contained"
                                color="success"
                                className="mt-4 w-full"
                                size="large"
                                sx={{ fontSize: "12px" }}>
                                Next
                              </Button>
                            </Grid>
                          </>
                        )}
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
                              "@media (min-width: 0px) and (max-width: 575px)":
                                {
                                  fontSize: "15px",
                                  padding: "13px 12px",
                                },
                            }}>
                            {item.title}: {item.value}
                          </Typography>
                        </Grid>
                      );
                    })}

                    <Grid item xs={12} className="space-x-4">
                      {loading ? (
                        <>
                          <Button
                            disabled
                            variant="contained"
                            color="warning"
                            className="mt-4"
                            size="medium"
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
                            size="medium"
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
                            size="medium"
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
                            size="medium"
                            disableElevation
                            sx={{ fontSize: "12px" }}>
                            Submit
                          </Button>
                        </>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      className="flex items-center justify-center bg-white">
                      <div ref={pdfRef}>
                        <div className="flex items-center  sm:space-x-2 space-x-0 justify-center">
                          <div className="flex items-center justify-center relative">
                            <div className="h-[450px] w-[270px] border">
                              {/* Header */}
                              <div className="absolute h-[450px] w-[270px] top-[100px]">
                                <img
                                  src={require("../../assets/img/faintLogo.png")}
                                  alt=""
                                />
                              </div>
                              <div className="pt-[12px] pb-[5px] px-[15px] bg-[#5e0001] flex items-center space-x-4">
                                <div className="bg-white w-[20%] p-1 ">
                                  <img
                                    src={require("../../assets/img/logo.png")}
                                  />
                                </div>
                                <div className=" w-[80%] ">
                                  <h3 className="text-[13px] text-white font-semibold ">
                                    HILLSIDE UNIVERSITY <br /> OF SCIENCE &
                                    TECHNOLOGY <br />
                                    <span className="font-normal text-[10px]">
                                      Oke-Mesi, Ekiti, Nigeria.
                                    </span>
                                  </h3>
                                </div>
                              </div>
                              {/* End of Header */}

                              <div className="flex  items-center justify-between">
                                <div className="p-3 bg-white">
                                  <div
                                    style={{
                                      backgroundColor: "#5e0001", // Background color that you want to remove
                                      mixBlendMode: "multiply", // Multiply blend mode to remove background
                                      border: "2px solid #5e0001", // Border color
                                      display: "inline-block", // Ensures the background color is applied properly
                                    }}>
                                    <img
                                      src={profile}
                                      className="h-[120px] w-[110px]"
                                      alt="Profile Picture"
                                      style={{
                                        display: "block", // Ensures the image fills the container properly
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="mt-5">
                                  <div className="">
                                    <h3 className="text-[13px] text-white bg-[#5e0002c1] border px-[20px] pt-2 pb-1 font-[600]  ">
                                      STAFF
                                    </h3>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="p-3 -mt-12 ">
                                  <div className="flex items-center space-x-4">
                                    <div>
                                      <h5 className=" text-[12px] text-[#5e0001]">
                                        SURNAME
                                      </h5>
                                      <h6 className="-mt-2 font-semibold text-[14px]">
                                        {user?.data?.lastname}{" "}
                                      </h6>
                                    </div>
                                    <div className="">
                                      <h5 className=" text-[12px] text-[#5e0001]">
                                        OTHER NAMES
                                      </h5>
                                      <h6 className="-mt-2 font-semibold text-[14px]">
                                        {user?.data?.firstname}{" "}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="mt-1">
                                    <h5 className=" text-[12px] text-[#5e0001]">
                                      ID NUMBER
                                    </h5>
                                    <h6 className="-mt-2 font-semibold text-[14px]">
                                      HUST-xxxx/xxxx
                                    </h6>
                                  </div>
                                  <div className="mt-1">
                                    <h5 className=" text-[12px] text-[#5e0001]">
                                      ISSUED DATE
                                    </h5>
                                    <h6 className="-mt-2 font-semibold text-[14px]">
                                      xx/xx/xxxx
                                    </h6>
                                  </div>
                                  <div className="mt-1">
                                    <h5 className=" text-[12px] text-[#5e0001]">
                                      Blood Group
                                    </h5>
                                    <h6 className="-mt-2 font-semibold text-[14px]">
                                      {formik.values.bloodGroup}
                                    </h6>
                                  </div>
                                  <div className="mt-1 absolute -bottom-2">
                                    <img
                                      src={trimmedDataURL}
                                      alt=""
                                      className="w-[18%]"
                                    />
                                    <h5 className=" text-[12px] text-[#5e0001]">
                                      Staff Signature
                                    </h5>
                                  </div>
                                </div>
                                <div className="relative bg-[#5e0002c1]    h-[215px] w-[40px]">
                                  <span className="rotate font-bold text-white">
                                    {formik.values.position}
                                  </span>
                                  <img
                                    src={require("../../assets/img/leaf.png")}
                                    alt=""
                                    className="absolute bottom-0 right-10 "
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Back of card */}

                          <div className="flex items-center justify-center mt-2 relative">
                            <div className="h-[450px] w-[270px] border p-3">
                              {/* Header */}
                              <div className="absolute h-[450px] w-[270px] top-[100px]">
                                <img
                                  src={require("../../assets/img/faintLogo.png")}
                                  alt=""
                                />
                              </div>

                              <div>
                                <h3 className="text-[12px] font-semibold">
                                  This card is the property of
                                </h3>
                                <h3 className="text-[17px] text-[#5e0001] font-bold ">
                                  HILLSIDE UNIVERSITY <br /> OF SCIENCE &
                                  TECHNOLOGY <br />
                                  <span className="font-semibold text-gray-900 text-[15px]">
                                    Oke-Mesi, Ekiti, Nigeria.
                                  </span>
                                </h3>
                                <h3 className="text-[12px] font-semibold">
                                  If found, please return to the above
                                  institution.
                                </h3>
                                <h3 className="text-[12px] font-semibold">
                                  Visit us at www.hust.edu.ng or call
                                  (+)234-814-064-1124
                                </h3>
                              </div>
                              <div className="mt-3">
                                <h3 className="text-[15px] font-semibold">
                                  Disruptive Innovation Capacity Building in:
                                </h3>

                                <p className="font-semibold text-[13px] ">
                                  <span className="font-black text-black">
                                    S
                                  </span>
                                  ciences/Security
                                </p>
                                <p className="font-semibold text-[13px] -mt-4">
                                  <span className="text-[#b75927] font-black">
                                    T
                                  </span>
                                  echnology/Engineering
                                </p>
                                <p className="font-semibold text-[13px] -mt-4">
                                  <span className="font-black text-[#4172b4]">
                                    E
                                  </span>
                                  ducation/Environment
                                </p>
                                <p className="font-semibold text-[13px] -mt-4">
                                  <span className="font-black text-[#577e39]">
                                    A
                                  </span>
                                  gribusiness/Vocational
                                </p>
                                <p className="font-semibold text-[13px] -mt-4">
                                  <span className="font-black text-[#91a7d6]">
                                    M
                                  </span>
                                  edicine/Management
                                </p>
                              </div>

                              <div className="flex justify-between items-center w-[100%] -mt-3">
                                <div></div>
                                <div className="border p-2 bg-[#5e0001] w-[38%] rounded-md">
                                  <img
                                    src={require("../../assets/img/qrcode.png")}
                                    alt=""
                                    className="w-[100%]"
                                  />
                                </div>
                              </div>

                              <div className="mt-2 absolute bottom-1">
                                <h6 className="underline font-semibold text-[14px]">
                                  Hgbuo
                                </h6>
                                <h5 className="-mt-2 text-[12px] text-[#5e0001]">
                                  President/Vice Chancellor
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <Grid container>
                <Grid item sm={12} md={12} className=""></Grid>
                <Grid item sm={12} md={12} className="bg-white">
                  <div
                    id="idpdf"
                    ref={pdfRef}
                    className="bg-white flex items-center justify-center mb-4">
                    <div className=" space-x-4">
                      <Grid container spacing={2}>
                        <Grid item sm={12} md={6} className="bg-white">
                          <div className="idcard border">
                            <div className="faintLogo">
                              <img
                                src={require("../../assets/img/faintLogo.png")}
                                alt=""
                              />
                            </div>
                            <div className="front">
                              <div className="header">
                                <div className="logo">
                                  <img
                                    src={require("../../assets/img/logo.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="text">
                                  <h1>
                                    HILLSIDE UNIVERSITY OF SCIENCE & TECHNOLOGY
                                  </h1>
                                  <h6>Oke-Mesi, Ekiti, Nigeria.</h6>
                                </div>
                              </div>
                              <div className="middle">
                                <div className="img">
                                  <img src={img} alt="" />
                                </div>
                                <div className="staff">
                                  <p>STAFF</p>
                                </div>
                              </div>
                              <div className="details">
                                <div className="right-details -mt-5">
                                  <div className="names surname ">
                                    <h5>SURNAME</h5>
                                    <h6>{user?.data?.lastname}</h6>
                                  </div>
                                  <div className="names">
                                    <h5>OTHER NAMES</h5>
                                    <h6>{user?.data?.firstname}</h6>
                                  </div>

                                  <div className="namess">
                                    <h5>ID NUMBER</h5>
                                    <h6>{user?.data?.staffId}</h6>
                                  </div>
                                  <div className="namess">
                                    <h5>ISSUED DATE</h5>
                                    <h6> {user?.data?.createdAt}</h6>
                                  </div>
                                  <div className="namess">
                                    <h5>BLOOD GROUP</h5>
                                    <h6> {user?.data?.bloodGroup}</h6>
                                  </div>
                                  <div className="sign">
                                    <img
                                      src={JSON.parse(user?.data?.signature)}
                                      alt=""
                                      className="w-[25%]"
                                    />
                                    <h5>Staff Signature</h5>
                                  </div>
                                </div>
                                <div className="left-details">
                                  <span className="rotate">
                                    {user?.data?.currentPosition.toUpperCase()}
                                  </span>
                                  <img
                                    src={require("../../assets/img/leaf.png")}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        {/* Back of card */}
                        <Grid item sm={12} md={6} className="bg-white">
                          <div className="flex items-center justify-center relative">
                            <div className="h-[470px] w-[280px] border p-3">
                              {/* Header */}
                              <div className="absolute h-[450px] w-[270px] top-[100px]">
                                <img
                                  src={require("../../assets/img/faintLogo.png")}
                                  alt=""
                                />
                              </div>

                              <div>
                                <h3 className="text-[12px] font-semibold">
                                  This card is the property of
                                </h3>
                                <h3 className="text-[15px] text-[#5e0001] font-bold ">
                                  HILLSIDE UNIVERSITY <br /> OF SCIENCE &
                                  TECHNOLOGY <br />
                                  <span className="font-semibold text-gray-900 text-[15px]">
                                    Oke-Mesi, Ekiti, Nigeria.
                                  </span>
                                </h3>
                                <h3 className="text-[12px]  font-semibold">
                                  If found, please return to the above
                                  institution.
                                </h3>
                                <h3 className="text-[12px] font-semibold ">
                                  Visit us at www.hust.edu.ng
                                </h3>
                              </div>
                              <div className="">
                                <h3 className="text-[12px] font-bold mt-4">
                                  Disruptive Innovation Capacity Building in:
                                </h3>

                                <p className="font-semibold text-[13px] ">
                                  <span className="font-black text-black">
                                    S
                                  </span>
                                  ciences/Security
                                </p>
                                <p className="font-semibold text-[13px] -mt-4">
                                  <span className="text-[#b75927] font-black">
                                    T
                                  </span>
                                  echnology/Engineering
                                </p>
                                <p className="font-semibold text-[13px] -mt-4">
                                  <span className="font-black text-[#4172b4]">
                                    E
                                  </span>
                                  ducation/Environment
                                </p>
                                <p className="font-semibold text-[13px] -mt-4">
                                  <span className="font-black text-[#577e39]">
                                    A
                                  </span>
                                  gribusiness/Vocational
                                </p>
                                <p className="font-semibold text-[13px] -mt-4">
                                  <span className="font-black text-[#91a7d6]">
                                    M
                                  </span>
                                  edicine/Management
                                </p>
                              </div>

                              <div className="flex justify-between items-center w-[100%] mt-2">
                                <div></div>
                                <div className="border p-2 bg-[#5e0001] w-[45%] rounded-md">
                                  <img
                                    src={qrCode}
                                    alt=""
                                    className="w-[100%]"
                                  />
                                </div>
                              </div>

                              <div className="sign2">
                                <h6>.......................</h6>
                                <h5>President/Vice-Chancellor</h5>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Card.Body>
            <Card.Footer>
              <button
                className="py-2 px-6 bg-[#5e0001] text-white rounded-md"
                onClick={downloadPDF}>
                {loader ? "Please wait" : "Download ID Card"}
              </button>
            </Card.Footer>
          </Card>
        )}
      </Box>
    </>
  );
};

export default IDForm;
