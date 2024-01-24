import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const UserCard = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const img = `  https://backend.hust.edu.ng/hust/api/v1/uploads/staffProfile/${user?.data?.profilePicture}`;

  return (
    <Box style={{ position: "sticky", top: "60px" }}>
      <Box className="bg-white p-4 sm:h-[80vh] h-min rounded-md border-gray-50">
        <Box className="flex flex-col items-center justify-center">
          <Avatar alt="Remy Sharp" src={img} sx={{ width: 80, height: 80 }} />
          <Typography
            variant="h4"
            sx={{ fontSize: "12px", opacity: 0.8, marginTop: 1 }}>
            {user?.data?.email}
          </Typography>
        </Box>
        <Box className="mt-2">
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                background: "#f2f2f2",
                padding: "8px 12px",
                borderRadius: "5px",
                margin: "10px 0px",
                "@media (min-width: 0px) and (max-width: 575px)": {
                  fontSize: "15px",
                  padding: "13px 12px",
                },
              }}>
              Firstname: {user?.data?.firstname}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                background: "#f2f2f2",
                padding: "8px 12px",
                borderRadius: "5px",
                margin: "10px 0px",
                "@media (min-width: 0px) and (max-width: 575px)": {
                  fontSize: "15px",
                  padding: "13px 12px",
                },
              }}>
              Lastname: {user?.data?.lastname}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                background: "#f2f2f2",
                padding: "8px 12px",
                borderRadius: "5px",
                margin: "10px 0px",
                "@media (min-width: 0px) and (max-width: 575px)": {
                  fontSize: "15px",
                  padding: "13px 12px",
                },
              }}>
              Username: {user?.data?.username}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                background: "#f2f2f2",
                padding: "8px 12px",
                borderRadius: "5px",
                margin: "10px 0px",
                "@media (min-width: 0px) and (max-width: 575px)": {
                  fontSize: "15px",
                  padding: "13px 12px",
                },
              }}>
              Sex: {user?.data?.sex || "Not set"}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                background: "#f2f2f2",
                padding: "8px 12px",
                borderRadius: "5px",
                margin: "10px 0px",
                "@media (min-width: 0px) and (max-width: 575px)": {
                  fontSize: "15px",
                  padding: "13px 12px",
                },
              }}>
              Phone: {user?.data?.phone || "Not set"}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                background: "#f2f2f2",
                padding: "8px 12px",
                borderRadius: "5px",
                margin: "10px 0px",
                "@media (min-width: 0px) and (max-width: 575px)": {
                  fontSize: "15px",
                  padding: "13px 12px",
                },
              }}>
              Program: {user?.data?.programs || "Not set"}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                background: "#f2f2f2",
                padding: "8px 12px",
                borderRadius: "5px",
                margin: "10px 0px",
                "@media (min-width: 0px) and (max-width: 575px)": {
                  fontSize: "15px",
                  padding: "13px 12px",
                },
              }}>
              Role: {user?.data?.rolename || "Not set"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;
