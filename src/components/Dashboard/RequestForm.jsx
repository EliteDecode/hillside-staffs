import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card } from "react-bootstrap";
import { Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const RequestForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const fullName = `${user?.data?.firstname}  ${user?.data?.lastname}`;
      const email = user?.data?.email;
      const title = values.title;
      const message = values.message;

      axios
        .post("https://backend.hust.edu.ng/hust/api/v1/message", {
          fullName,
          email,
          title,
          message,
        })
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
    <Box className="mt-3 sm:mb-48 mb-48">
      <Card>
        <Card.Header>Request</Card.Header>
        <Card.Body>
          <Card.Title className="font-bold text-brand-primary">
            Make a Request
          </Card.Title>
          <Card.Text className="text-sm">
            <div className="">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    id="title"
                    size="small"
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
                    size="small"
                    id="message"
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    error={
                      formik.touched.message && Boolean(formik.errors.message)
                    }
                    helperText={formik.touched.message && formik.errors.message}
                  />
                </div>

                <div className="">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={loading}
                    disableElevation
                    sx={{ background: "#5e0001", fontSize: "12px" }}>
                    {loading ? "Please wait..." : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Box>
  );
};

export default RequestForm;
