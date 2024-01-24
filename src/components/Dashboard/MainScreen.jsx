import { Box, Button } from "@mui/material";
import React from "react";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainScreen = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  return (
    <Box className="space-y-4 mt-3">
      <Card>
        <Card.Header>Applications</Card.Header>
        <Card.Body>
          <Card.Title className="font-bold text-[#5e0001]">
            Staff Access ID Card
          </Card.Title>
          <Card.Text className="text-[12px]">
            Elevate your workplace security and streamline access management
            with the sophisticated Staff ID Card. Enjoy exclusive privileges,
            seamless entry to designated areas, and enhanced convenience for
            your daily tasks.
          </Card.Text>
          {user?.data?.IdCardStatus == 1 ? (
            <Button
              variant="contained"
              disableElevation
              disabled
              sx={{
                background: "#5e0001",
                fontSize: "10px",
              }}>
              Successfully Applied
            </Button>
          ) : (
            <Link to="id_application">
              <Button
                variant="contained"
                disableElevation
                sx={{ background: "#5e0001", fontSize: "10px" }}>
                Apply Here
              </Button>
            </Link>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Request</Card.Header>
        <Card.Body>
          <Card.Title className="font-bold text-brand-primary">
            Make a Request
          </Card.Title>
          <Card.Text className="text-sm">
            Are you facing challenges or need assistance with something? We're
            here to help! Please submit a request by clicking the button below,
            and we will get back to you as soon as possible.
          </Card.Text>
          <Link to="request">
            <Button
              variant="contained"
              disableElevation
              sx={{ background: "#000", fontSize: "10px" }}>
              Click Here
            </Button>
          </Link>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Subscribe to Staff Newsletter</Card.Header>
        <Card.Body>
          <Card.Title className="font-bold text-brand-primary">
            Stay Informed with Staff News
          </Card.Title>
          <Card.Text className="text-sm">
            Want to stay updated on the latest news, announcements, and events
            related to our staff? Subscribe to our newsletter and receive
            regular updates delivered right to your inbox.
          </Card.Text>
          {user ? (
            <Button
              disabled
              variant="contained"
              disableElevation
              sx={{ background: "#1d6400", fontSize: "10px" }}>
              Subscription Active
            </Button>
          ) : (
            <Link to="/newsletter_subscription">
              <Button
                variant="contained"
                disableElevation
                sx={{ background: "#1d6400", fontSize: "10px" }}>
                Subscribe Now
              </Button>
            </Link>
          )}
        </Card.Body>
      </Card>
    </Box>
  );
};

export default MainScreen;
