import { Box, Button, Typography } from "@mui/material";
import { Carousel } from "antd";
import React from "react";

const Slider = () => {
  return (
    <Box style={{ position: "sticky", top: "60px" }}>
      <div>
        <Carousel autoplay autoplaySpeed={3000}>
          <img
            src={require("../../assets/img/login.jpg")}
            className="rounded-md"
          />
          <img
            src={require("../../assets/img/login1.jpg")}
            className="rounded-md"
          />
          <img
            src={require("../../assets/img/staff.jpg")}
            className="rounded-md"
          />
          <img
            src={require("../../assets/img/request.jpg")}
            className="rounded-md"
          />
        </Carousel>
        <Box className="bg-white relative h-[17vh] p-2 mt-3 rounded-md border-gray-50">
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "bold",
              fontFamily: "cursive",
            }}>
            Visit main website
          </Typography>
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: "",
            }}>
            Offcial webiste of hillside university of science and technology
          </Typography>
          <Box
            style={{
              position: "absolute",
              bottom: "10px",
              right: "4px",
            }}>
            <Button
              variant="contained"
              size="small"
              disableElevation
              sx={{
                background: "#5e0001",
                fontSize: "10px",
                fontWeight: "bold",
                "&:hover": {
                  background: "#5e10001 !important",
                },
              }}
              className="text-[13px]">
              Hust.edu.ng
            </Button>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Slider;
