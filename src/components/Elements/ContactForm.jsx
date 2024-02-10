import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import axios from "axios";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      title: "",
      message: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      title: Yup.string().required("Title is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      axios
        .post("https://backend.hust.edu.ng/hust/api/v1/message", values)
        .then((response) => {
          toast.success("Request sent successfully");
          setLoading(false);
          resetForm();
        })
        .catch((error) => {
          toast.error(error);
          setLoading(false);
        });
    },
  });

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <TextField
            fullWidth
            size="medium"
            id="fullName"
            name="fullName"
            label="Full Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </div>

        <div className="mb-4">
          <TextField
            fullWidth
            size="medium"
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>

        <div className="mb-4">
          <TextField
            fullWidth
            size="medium"
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </div>

        <div className="mb-4">
          <TextField
            fullWidth
            size="medium"
            id="message"
            name="message"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
        </div>

        <div className="">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            disabled={loading}
            disableElevation
            sx={{ background: "#5e0001", fontSize: "12px" }}>
            {loading ? "Please wait..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
