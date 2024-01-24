import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, verify } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
const VerifyRegisteredUser = () => {
  const { userId, uniqueString, uniqueId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const data = {
    id: userId,
    string: uniqueString,
  };

  useEffect(() => {
    dispatch(verify(data));
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        onClose: () => {
          dispatch(reset());
          navigate("/register");
        },
      });
    }

    if (user) {
      toast.success("Congratulations you have successfully registered", {
        onClose: () => {
          dispatch(reset());
          navigate("/login");
        },
      });
    }
  }, [isError, isSuccess, user, message]);
  return (
    <Box className="bg-gray-900 h-screen flex flex-col items-center justify-center text-center">
      <Box className="mt-4">
        <ClipLoader
          color="green"
          loading="loading"
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <Typography variant="h6" sx={{ color: "white" }}>
          Verifying...
        </Typography>
      </Box>
    </Box>
  );
};

export default VerifyRegisteredUser;
