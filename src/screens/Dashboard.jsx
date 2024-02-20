// Dashboard.js

import React from "react";
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

const Dashboard = () => {
  return (
    <>
      <DashboardNav />
      <Box className="bg-[#f2f2f2]  ">
        <Box className="container">
          <Box>
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
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
