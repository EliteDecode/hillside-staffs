// Dashboard.js

import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import DashboardNav from "../components/Dashboard/DashboardNav";
import UserCard from "../components/Dashboard/UserCard";
import { Carousel } from "antd";
import MainScreen from "../components/Dashboard/MainScreen";
import Slider from "../components/Dashboard/Slider";
import { useDispatch, useSelector } from "react-redux";
import { reset, singleStaff } from "../features/auth/authSlice";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(singleStaff(user?.data?.id));
  }, []);

  return (
    <>
      <DashboardNav />
      <Box className="bg-[#f2f2f2]  ">
        <Box className="container">
          <Box>
            {isLoading ? (
              <Box className="bg-white h-screen items-center justify-center">
                <ClipLoader
                  color="#5e0001"
                  loading={isLoading}
                  cssOverride={{
                    display: "block",
                    margin: "30px auto",
                    borderColor: "red",
                  }}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Box>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3}>
                  <UserCard />
                </Grid>
                <Grid item xs={12} sm={12} md={7}>
                  <MainScreen />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <Slider />
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
