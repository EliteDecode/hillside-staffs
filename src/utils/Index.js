import * as yup from "yup";

export const url = "http://localhost:5000";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const validateSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is Required"),
  firstname: yup
    .string()
    .min(2)
    .max(15)
    .matches(/^[A-Za-z\s]+$/, "Firstname must only contain letters")
    .required("Please enter your Firstname"),
  lastname: yup
    .string()
    .min(2)
    .max(15)
    .matches(/^[A-Za-z\s]+$/, "Lastname must only contain letters")
    .required("Please enter your Lastname"),
  username: yup
    .string()
    .min(5)
    .max(15)
    .matches(
      /^[A-Za-z]+[0-9]*$/,
      "Username must only contain letters and at least one number"
    )
    .required("Please enter your Username"),

  password: yup
    .string()
    .min(8)
    .matches(passwordRules, {
      message:
        "Please create a stronger password(1 upper case letter, 1 lower case letter, 1 numeric digit)",
    })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please Confirm your Password"),
});

export const UpdateSchema = yup.object().shape({
  Phone: yup.number().min(9).required("Please enter your Phone Number"),
  Nin: yup.number().min(9).required("Please enter your NIN"),
  State: yup.string().min(2).max(15).required("Please enter your State"),
  Country: yup.string().min(2).max(15).required("Please enter your Country"),
  Address: yup.string().min(2).max(20).required("Please enter your Address"),
  Profile: yup.string().required("Please select a profile picture"),
  Gender: yup.string().required("Gender is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is Required"),

  password: yup
    .string()
    .min(7)
    .matches(passwordRules, {
      message:
        "Please create a stronger password(1 upper case letter, 1 lower case letter, 1 numeric digit)",
    })
    .required("Password is required"),
});
