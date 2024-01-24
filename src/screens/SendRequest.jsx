// Dashboard.js

import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import UserCard from "../components/Dashboard/UserCard";
import Slider from "../components/Dashboard/Slider";
import DashboardNav from "../components/Dashboard/DashboardNav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RequestForm from "../components/Dashboard/RequestForm";

const SendRequest = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  return (
    <>
      <DashboardNav />
      <Box className="bg-[#f2f2f2]">
        <Box className="container">
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3}>
                <UserCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <RequestForm />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Slider />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SendRequest;
